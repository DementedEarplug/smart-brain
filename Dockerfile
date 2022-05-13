FROM node:16.14.0

WORKDIR /usr/src/smart-brain

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]