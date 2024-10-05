# Dockerfile
FROM ubuntu:22.04

# Install Docker and other dependencies
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    curl \
    vim \
    git \
    && apt-get clean

# Set up any other configurations you need
