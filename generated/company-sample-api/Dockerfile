
FROM node:10.19.0-slim

RUN npm install pm2 -g

USER node

WORKDIR /home/node

COPY --chown=node:node ./ /home/node

RUN npm run build-routes-ingress
RUN npm run compile

EXPOSE 3000

CMD ["pm2-runtime", "process.yaml"]