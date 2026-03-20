FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --production=false

COPY . .

ENV NODE_ENV=production

EXPOSE 4000

CMD ["yarn", "start"]
