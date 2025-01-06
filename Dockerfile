# Use Node.js runtime
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code and env config
COPY . .

# Expose port that matches Express config
EXPOSE 8080

# Start the Express server
CMD [ "npm", "start" ]