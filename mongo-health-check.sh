#!/bin/bash

# Define the health check URLs for your MongoDB servers
MONGO_SERVERS=(
    "mongodb://shard1_r1:27017"
    "mongodb://shard2_r1:27017"
    "mongodb://cfg_r1:27017"
    # "mongodb://router1:27017"
)

# Function to check MongoDB health
check_mongo_health() {
    for server in "${MONGO_SERVERS[@]}"; do
        echo "Checking health for MongoDB server: $server"
        # Check if the server is reachable and responsive
        if !  /usr/bin/mongosh "$server" --eval 'db.adminCommand("ping")' --quiet; then
            echo "MongoDB server $server is not healthy. Waiting..."
            return 1
        fi
    done
    echo "All MongoDB servers are healthy."
    return 0
}

# Wait until all MongoDB servers are healthy
until check_mongo_health; do
    sleep 10  # Check every 10 seconds
done

# Run initialization commands after confirming MongoDB is healthy
echo "All MongoDB servers are healthy. Running initialization commands..."


 /usr/bin/mongosh --host shard1_r1 --port 27017 <<EOF
    rs.initiate({
    _id: "shard1",
    members: [
        {_id: 0, host: "shard1_r1:27017"},
    ],
    settings: {
      electionTimeoutMillis: 2000
    }});
EOF

 /usr/bin/mongosh --host shard2_r1 --port 27017 <<EOF
    rs.initiate({
    _id: "shard2",
    members: [
        {_id: 0, host: "shard2_r1:27017"},
    ],
    settings: {
      electionTimeoutMillis: 2000
    }});
EOF

 /usr/bin/mongosh --host cfg_r1 --port 27017 <<EOF
    rs.initiate({
    _id: "cfg",
    members: [
        {_id: 0, host: "cfg_r1:27017"},
    ],
    settings: {
      electionTimeoutMillis: 2000
    }});
EOF

#  /usr/bin/mongosh --host router1 --port 27017 <<EOF
#     sh.addShard(shard1_r1);
# EOF
#  /usr/bin/mongosh --host router1 --port 27017 <<EOF
#     sh.addShard(shard2_r1);
# EOF
# 1) Create a user for accessing to claster
# 2) Create a sharded collection
# 3) Config sharded collection
# https://docs.mongodb.com/manual/tutorial/sharding-segmenting-data-by-location/
#  /usr/bin/mongosh --host router1 --port 27017 <<EOF
# use $MONGO_DB_NAME;

# db.createUser({user: '$MONGO_USER', pwd: '$MONGO_PASSWORD', roles: [{role: 'clusterAdmin', db: 'admin'}, "readWrite"]});

# // Enable sharding for the database
# sh.enableSharding("$MONGO_DB_NAME");

# // Create User Collection and configure sharding

# db.createCollection("User");
# db.adminCommand({ shardCollection: "$MONGO_DB_NAME.User", key: { email: 1 } });  // Sharding by email or any other suitable key

# // Create Company Collection and configure sharding
# db.createCollection("Company");
# db.adminCommand({ shardCollection: "$MONGO_DB_NAME.Company", key: { name: 1 } });  // Sharding by company name or any other suitable key

# // Optional: Disable balancing initially (enable later if needed)
# sh.disableBalancing("$MONGO_DB_NAME.User");
# sh.disableBalancing("$MONGO_DB_NAME.Company");

# // Example of adding tags and zones (if needed)
# $SHARD_TAGS.forEach(([shardName, tag]) => sh.addShardTag(shardName, tag));
# $SHARD_ZONES.forEach(([collection, min, max, tag]) => sh.addTagRange(collection, min, max, tag));

# // Enable balancing after configuration
# sh.enableBalancing("$MONGO_DB_NAME.User");
# sh.enableBalancing("$MONGO_DB_NAME.Company");
# EOF

# Add your MongoDB initialization commands here

echo "Initialization commands executed successfully."
