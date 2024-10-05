# Dockerfile

# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /app ./
COPY .env .env
EXPOSE 4000
CMD ["node", "index.js"]
