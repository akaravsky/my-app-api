# Use an existing docker image as a base
# alpine means a small as possible
FROM node:alpine

WORKDIR /usr/src/my-app/server

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# Copy package.json before other files to cache npm install step, because node_modules most of the time the same
COPY package*.json ./

# Download and install a dependency
# Every run create image with installed dependency from current container
RUN npm install

# Copy build files
COPY . .

# Specify port
EXPOSE 3000

# Tell the image what to do when it starts as container
CMD ["npm", "run", "dev"] 

# docker build -t my-app/server .