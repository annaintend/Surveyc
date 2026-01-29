# Стадия 1 — сборка
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Стадия 2 — запуск (serve)
FROM node:20-slim

RUN npm install -g serve@latest

WORKDIR /app

COPY --from=builder /app/build ./build

EXPOSE 3041

CMD ["serve", "-s", "build", "--listen", "tcp://0.0.0.0:3041"]
