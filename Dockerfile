
# Node latest LTS 10.15.3 with alpine
# (a lightweight distribution)
FROM node:10.15.3-alpine
LABEL maintainer="Calendz. <https://calendz.app/>"

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install the app
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . . 