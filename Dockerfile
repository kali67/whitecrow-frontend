FROM node:11.11.0-alpine

COPY . /whitecrow
WORKDIR /whitecrow

RUN npm install && npm run build

CMD ["npm", "run", "start"]



