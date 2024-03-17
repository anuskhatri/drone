# Stage 1: Build React application
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Expose port 3000
EXPOSE 3000

# Start Node.js server
CMD ["npm", "start"]
