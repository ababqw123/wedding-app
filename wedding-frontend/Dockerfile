FROM node:14 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build

############################################

FROM nginx:1.21.4-alpine 
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

