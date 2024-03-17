# Use a node base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files into the working directory
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the socket server
CMD ["npm", "start"]
