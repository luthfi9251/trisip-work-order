# syntax=docker.io/docker/dockerfile:1

FROM node:20.18.3-alpine3.21 AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY package.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
ENV NODE_ENV=production

USER node

EXPOSE 3000

ENV PORT=3000
CMD ["npm", "start"]