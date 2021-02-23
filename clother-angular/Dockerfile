FROM node:15

RUN mkdir -p /angular/

COPY . /angular/
WORKDIR /angular/

RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]