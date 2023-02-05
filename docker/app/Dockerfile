#dev
FROM node:18-alpine As development
WORKDIR /var/www
COPY --chown=node:node ../../package.json  package.json
COPY --chown=node:node ../../package-lock.json  package-lock.json
RUN npm ci
COPY --chown=node:node . .
USER node


#build
FROM node:18-alpine As build
WORKDIR /var/www
COPY --chown=node:node ../../package.json  package.json
COPY --chown=node:node --from=development /var/www/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node 


#production
FROM node:18-alpine As production
COPY --chown=node:node --from=build /var/www/node_modules ./node_modules
COPY --chown=node:node --from=build /var/www/build ./build
COPY --chown=node:node --from=build /var/www/package.json  package.json
COPY --chown=node:node --from=build /var/www/public  ./public
CMD [ "npm", "start" ]