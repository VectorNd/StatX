#!/bin/sh

echo "Replica Set Name: ${REPSET_NAME}"
echo "Host 1: ${REPSET_NAME}_r1:27017"

while true; do
  if mongosh --host "${REPSET_NAME}_${REPSET_CONTAINER}" --eval "db.adminCommand('ping')" &> /dev/null; then
    break
  fi
  echo "Waiting for MongoDB to be ready..."
  sleep 90
done

# Wait until local MongoDB instance is up and running
until /usr/bin/mongosh --host "${REPSET_NAME}_${REPSET_CONTAINER}" --port 27017 --quiet --eval 'db.getMongo()'; do
    sleep 60
done

# Configure a MongoDB replica set (doesn't matter if each container attempts
# to run same action, first one wins, other attempts will then be ignored)
/usr/bin/mongosh --host "${REPSET_NAME}_${REPSET_CONTAINER}" --port 27017 <<EOF
    rs.initiate({
    _id: "${REPSET_NAME}",
    members: [
        {_id: 0, host: "${REPSET_NAME}_r1:27017"},
    ],
    settings: {
      electionTimeoutMillis: 2000
    }});
EOF

