FROM node:14 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn 

COPY . .

RUN yarn build

############################################

FROM nginx:1.21.4-alpine 

COPY --from=build /app/.next /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

