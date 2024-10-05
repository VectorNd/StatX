#!/bin/bash

# Wait for the mongos process to start
until mongo --host mongos --eval "print('Waiting for mongos connection...')" 2>/dev/null; do
  sleep 5
done

# Add shards to the cluster
mongo --host mongos --eval '
sh.addShard("shard1ReplSet/mongo-shard1:27017");
sh.addShard("shard2ReplSet/mongo-shard2:27017");
sh.addShard("shard3ReplSet/mongo-shard3:27017");
sh.status();
'

# Enable sharding for the service1_db database
mongo --host mongos --eval '
sh.enableSharding("service1_db");
sh.shardCollection("service1_db.users", { email: 1 });
sh.shardCollection("service1_db.companies", { code: 1 });
'

# Keep the script running
wait
