# Stage 1: Build React app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Copy the .env file (ensure you have an .env file in your client directory)
# COPY .env .env

# Build the React app
RUN npm run build && rm -rf node_modules

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine


# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from the previous stage to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html


# Expose the default port for Nginx
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
