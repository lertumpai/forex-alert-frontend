FROM node:lts

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN echo $NODE_ENV

ARG SERVER_URL
ENV SERVER_URL=$SERVER_URL
RUN echo $SERVER_URL

# set a directory for the app
WORKDIR /usr/src/forex-aler-frontend

# copy all the files to the container
COPY package.json /usr/src/forex-aler-frontend

RUN npm install

COPY . /usr/src/forex-aler-frontend

RUN npm run build

# tell the port number the container should expose
EXPOSE 3000

# run the command
CMD ["npm", "run", "start"]
