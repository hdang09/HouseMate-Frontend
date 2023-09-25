FROM node
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn add typescript
RUN yarn install
COPY . .
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]
EXPOSE 3000