FROM node:11.11.0-alpine

COPY . /whitecrow
WORKDIR /whitecrow

RUN npm install -g serve
RUN npm install && npm run build

CMD ["serve", "-s", "build"]



