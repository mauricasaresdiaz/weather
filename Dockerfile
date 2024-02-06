# Base image
FROM node:18-alpine as base
RUN apk update

# Building image
FROM base AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
 
# Runner image
FROM base AS runner
ARG PORT
USER node

WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json .
COPY --from=builder --chown=node:node /app/yarn.lock .
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

EXPOSE ${PORT}
CMD ["yarn", "start:prod"]