FROM node:18-alpine

WORKDIR /app

COPY package.next.json ./package.json
COPY package-lock.json ./

RUN npm ci --omit=dev

COPY . .

CMD ["node", "src/index.js"]
