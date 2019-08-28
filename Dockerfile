FROM node:10
WORKDIR /usr/Documents/beejee
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 3000
EXPOSE 3000
# CMD [ "node", "./bin/www.js" ]
CMD ["npm", "start"]


