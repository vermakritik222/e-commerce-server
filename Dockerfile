# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package json and yarn lock only to optimise the image building
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 80

# Define the command to run your app
CMD [ "node", "./src/server.js" ] 
