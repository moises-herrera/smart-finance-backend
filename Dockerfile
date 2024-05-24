FROM node:20.10.0-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20.10.0-alpine as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --omit=dev --only=production --ignore-scripts

FROM node:20.10.0-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.10.0-alpine as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
