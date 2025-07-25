# Use Node.js as the base image
FROM node:22-alpine

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port NestJS will run on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:dev"]
