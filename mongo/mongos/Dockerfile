FROM mongo:latest
RUN apt-get update && apt-get -q install -y


# COPY entry.sh /usr/local/bin/
# COPY init.sh /usr/local/bin/

# RUN chmod u+x /usr/local/bin/init.sh /usr/local/bin/entry.sh

# ENTRYPOINT ["/usr/local/bin/entry.sh"]

# Install dependencies and mongosh
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org-shell && \
    rm -rf /var/lib/apt/lists/*

CMD mongos --port 27017 --bind_ip 0.0.0.0