FROM node:14 AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build

############################################

FROM nginx:1.21.4-alpine 
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

