FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "build" ]


FROM node:22-alpine

WORKDIR /app

EXPOSE 3000

COPY --from=build /app/build /app/build

CMD [ "npx", "serve", "-s", "build", "-l", "3000" ]