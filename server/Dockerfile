# Use a Node.js base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your backend service runs on (adjust as per your setup)
EXPOSE 4000

# Command to run your backend service
CMD ["npm", "start"]
