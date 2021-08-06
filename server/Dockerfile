FROM node:13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# COPY . .
# RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
