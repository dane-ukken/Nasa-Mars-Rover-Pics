FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


RUN pwd
RUN ls -la  
RUN npm run build
RUN ls -la dist/

EXPOSE 3000

CMD [ "npm", "start" ] 