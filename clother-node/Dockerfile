FROM node:15

RUN mkdir -p /node/

COPY . /node/
WORKDIR /node/

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]