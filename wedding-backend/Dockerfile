# FROM node:18 AS build

# WORKDIR /app

# COPY package.json .
# COPY yarn.lock .

# RUN yarn install

# COPY . .

# RUN yarn build

# ############################################

# FROM nginx:1.21.4-alpine 


# COPY --from=build /app/dist /usr/share/nginx/html


# EXPOSE 8080

# CMD ["nginx", "-g", "daemon off;"]



#####################################################
# 빌드 단계
FROM node:18 AS build

WORKDIR /app

# 종속성 설치를 먼저 실행하여 캐싱을 최적화
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

############################

FROM node:18

WORKDIR /app

COPY --from=build /app .

RUN yarn global add pm2

# CMD  ["pm2-runtime", "start", "ecosystem.config.cjs"]
CMD ["pm2-runtime", "start", "ecosystem.config.cjs", "--env", "production"]