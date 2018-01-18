FROM mhart/alpine-node:8.9.4

RUN mkdir -p /usr/src/app/src

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app/package.json
ADD knexfile.js /usr/src/app/knexfile.js
ADD docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh

# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python && \
#   npm install --quiet node-gyp -g &&\
#   npm install --quiet && \
#   npm install -g nodemon && \
#   apk del native-deps
# RUN npm install -g nodemon
RUN yarn install

# RUN ls

# CMD ["npm", "run", "dev"]
CMD ["./docker-entrypoint.sh"]
