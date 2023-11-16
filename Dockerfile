FROM node as builder
WORKDIR /app
COPY . .
RUN \
  npm install --frozen-lockfile && \
  npm build

FROM alpine as runner
ENV \
  NODE_ENV="development" \
  PORT="3000"
  
RUN apk add --update nodejs
WORKDIR /app
COPY --from=builder /app/.tmp/dist/ /app/
EXPOSE ${PORT}
CMD node index.js