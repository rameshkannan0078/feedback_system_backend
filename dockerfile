FROM node:18.12.0-alpine

# Install build dependencies
RUN apk --no-cache add --virtual .build-deps build-base python3

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies and rebuild bcrypt
RUN npm install --silent --production \
    && npm rebuild bcrypt --build-from-source \
    && npm cache clean --force

COPY . .

EXPOSE 7000

CMD ["npm", "start"]
