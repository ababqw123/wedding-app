FROM node:14 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn 

COPY . /app

RUN yarn build

############################################

FROM nginx:1.21.4-alpine 
COPY --from=build /app/.next /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

