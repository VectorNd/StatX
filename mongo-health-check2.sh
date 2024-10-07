#!/bin/bash

# Define the health check URLs for your MongoDB servers
MONGO_SERVERS=(
    "mongodb://router1:27017"
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

# 1) Create a users for accessing to claster
# 2) Create a sharded collection
# 3) Config sharded collection
# https://docs.mongodb.com/manual/tutorial/sharding-segmenting-data-by-location/

/usr/bin/mongosh --host router1 --port 27017 <<EOF
    sh.addShard("shard1/shard1_r1:27017");
    sh.addShard("shard2/shard2_r1:27017");
EOF

/usr/bin/mongosh --host router1 --port 27017 <<EOF
use db;

db.createUser({user: 'harshshrivastavaeee21', pwd: 'J6rVwdzNCQWT0m4A', roles: [{role: 'clusterAdmin', db: 'admin'}, "readWrite"]});

// Enable sharding for the database
sh.enableSharding("db");

// Create users Collection and configure sharding

db.createCollection("users");
db.companies.createIndex({ username: 1 });
db.adminCommand({ shardCollection: "db.users", key: { username: 1 } });

// Create companies Collection and configure sharding
db.createCollection("companies");
db.companies.createIndex({ name: 1 });
db.adminCommand({ shardCollection: "db.companies", key: { name: 1 } });

// Optional: Disable balancing initially (enable later if needed)
sh.disableBalancing("db.users");
sh.disableBalancing("db.companies");

// Example of adding tags and zones (if needed)
# [['shard1', 'NA'], ['shard2', 'EU']].forEach(([shardName, tag]) => sh.addShardTag(shardName, tag));

sh.addShardTag('shard1', 'NA');
sh.addShardTag('shard2', 'EU');


sh.addTagRange("db.users", { "username": "A" }, { "username": "M" }, "NA"); 

sh.addTagRange("db.users", { "username": "N" }, { "username": "Z" }, "EU"); 

sh.addTagRange("db.companies", { "name": "A" }, { "name": "M" }, "NA"); 

sh.addTagRange("db.companies", { "name": "N" }, { "name": "Z" }, "EU"); 

# [
#     ["db.users", { "username": "A" }, { "username": "M" }, "NA"],
#     ["db.users", { "username": "N" }, { "username": "Z" } "EU"],
#     ["db.companies", { "name": "A" }, { "name": "M" }, "NA"],
#     ["db.companies", { "name": "N" }, { "name": "Z" }, "EU"]
# ].forEach(([collection, min, max, tag]) => sh.addTagRange(collection, min, max, tag));

// Enable balancing after configuration
sh.enableBalancing("db.users");
sh.enableBalancing("db.companies");

EOF

# Add your MongoDB initialization commands here

echo "Initialization commands executed successfully."
