FROM node:alpine3.17
WORKDIR /app
COPY . /app
ENV NODE_ENV=production
RUN yarn global add serve typescript @types/node
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "run", "serve"]