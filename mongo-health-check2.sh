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

# 1) Create a user for accessing to claster
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

// Create User Collection and configure sharding

db.createCollection("User");
db.adminCommand({ shardCollection: "db.User", key: { email: 1 } });  // Sharding by email or any other suitable key

// Create Company Collection and configure sharding
db.createCollection("Company");
db.adminCommand({ shardCollection: "db.Company", key: { name: 1 } });  // Sharding by company name or any other suitable key

// Optional: Disable balancing initially (enable later if needed)
sh.disableBalancing("db.User");
sh.disableBalancing("db.Company");

// Example of adding tags and zones (if needed)
# [['shard1', 'NA'], ['shard2', 'EU']].forEach(([shardName, tag]) => sh.addShardTag(shardName, tag));

sh.addShardTag('shard1', 'NA');
sh.addShardTag('shard2', 'EU');

sh.addTagRange("db.User", { "companyMetrics.companyCode": "A" }, { "companyMetrics.companyCode" : "M" }, "NA");
sh.addTagRange("db.User", { "companyMetrics.companyCode": "N" }, { "companyMetrics.companyCode" : "Z" }, "EU");
sh.addTagRange("db.Company", { "name": "A" }, { "name" : "M" }, "NA");
sh.addTagRange("db.Company", { "name": "N" }, { "name" : "Z" }, "EU");

# [
#     ["db.User", { "companyMetrics.companyCode": "A" }, { "companyMetrics.companyCode": "M" }, "NA"],
#     ["db.User", { "companyMetrics.companyCode": "N" }, { "companyMetrics.companyCode": "Z" }, "EU"],
#     ["db.Company", { "name": "A" }, { "name": "M" }, "shard1"],
#     ["db.Company", { "name": "N" }, { "name": "Z" }, "shard2"]
# ].forEach(([collection, min, max, tag]) => sh.addTagRange(collection, min, max, tag));

// Enable balancing after configuration
sh.enableBalancing("db.User");
sh.enableBalancing("db.Company");
EOF

# Add your MongoDB initialization commands here

echo "Initialization commands executed successfully."
