FROM node:10

ARG APP_DIR=api
RUN mkdir -p ${APP_DIR}

WORKDIR ${APP_DIR}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


