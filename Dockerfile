# see: https://www.tomray.dev/nestjs-docker-production

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

ENV PORT=3000 \
    NODE_ENV="development" \
    DB_POSTGRES="postgresql://postgres:postgres@localhost:5432/github-viewer" \
    DB_LIMIT=50 \
    JWT_PRIVATE_KEY="secret" \
    JWT_PUBLIC_KEY="secret" \
    JWT_AUGORITHM="HS256" \
    JWT_ISSUER="issuer" \
    JWT_ACCESS_TTL=600000 \
    JWT_REFRESH_TTL=1209600000

HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1   

CMD [ "node", "dist/src/index.js" ]