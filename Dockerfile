FROM node
WORKDIR /app
COPY . /app
ENV NODE_ENV=production
RUN yarn global add serve
RUN yarn install
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "run", "serve"]