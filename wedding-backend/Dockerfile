FROM node:18 AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

############################################

FROM nginx:1.21.4-alpine 

# Nginx 설정 파일을 복사하여 요청을 적절히 처리
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
