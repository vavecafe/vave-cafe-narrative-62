# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed - e.g., for React, Vue, Angular)
RUN npm run build

# Expose the port your app listens on (e.g., 3000)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]