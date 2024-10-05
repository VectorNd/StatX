#!/bin/bash

# Wait until mongos can return a connection
until /usr/bin/mongosh --host router1 --quiet --eval 'db.getMongo()'; do
    sleep 20
done

# Split set of shard URLs text by ';' separator
IFS=';' read -r -a array <<< "$SHARD_LIST"

# Add each shard definition to the cluster
for shard in "${array[@]}"; do
    /usr/bin/mongosh --host router1 --port 27017 <<EOF
        sh.addShard("${shard}");
EOF
done

# 1) Create a user for accessing to claster
# 2) Create a sharded collection
# 3) Config sharded collection
# https://docs.mongodb.com/manual/tutorial/sharding-segmenting-data-by-location/
/usr/bin/mongosh --host router1 --port 27017 <<EOF
use $MONGO_DB_NAME;

db.createUser({user: '$MONGO_USER', pwd: '$MONGO_PASSWORD', roles: [{role: 'clusterAdmin', db: 'admin'}, "readWrite"]});

// Enable sharding for the database
sh.enableSharding("$MONGO_DB_NAME");

// Create User Collection and configure sharding

db.createCollection("User");
db.adminCommand({ shardCollection: "$MONGO_DB_NAME.User", key: { email: 1 } });  // Sharding by email or any other suitable key

// Create Company Collection and configure sharding
db.createCollection("Company");
db.adminCommand({ shardCollection: "$MONGO_DB_NAME.Company", key: { name: 1 } });  // Sharding by company name or any other suitable key

// Optional: Disable balancing initially (enable later if needed)
sh.disableBalancing("$MONGO_DB_NAME.User");
sh.disableBalancing("$MONGO_DB_NAME.Company");

// Example of adding tags and zones (if needed)
$SHARD_TAGS.forEach(([shardName, tag]) => sh.addShardTag(shardName, tag));
$SHARD_ZONES.forEach(([collection, min, max, tag]) => sh.addTagRange(collection, min, max, tag));

// Enable balancing after configuration
sh.enableBalancing("$MONGO_DB_NAME.User");
sh.enableBalancing("$MONGO_DB_NAME.Company");
EOF