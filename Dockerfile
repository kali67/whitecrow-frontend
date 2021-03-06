FROM node:11.11.0-alpine

COPY . /whitecrow
WORKDIR /whitecrow

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install -g serve
RUN npm install && npm run build

CMD ["serve", "-s", "build"]



