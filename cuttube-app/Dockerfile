FROM node:latest

WORKDIR /home/app

COPY . .

RUN rm -rf node_modules && rm -rf yarn.lock

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]