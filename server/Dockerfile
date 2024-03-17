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

# Expose port 4000
EXPOSE 4000

# Start the backend server
CMD ["npm", "start"]
