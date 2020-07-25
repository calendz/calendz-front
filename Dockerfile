# Node latest LTS 12.18.2 with alpine
# (a lightweight distribution)
FROM node:12.18.2-alpine
LABEL maintainer="Calendz. <https://calendz.app/>"

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install the app
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . . 