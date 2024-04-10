# 빌드 단계
FROM node:18 AS build

WORKDIR /app

# 종속성 설치를 먼저 실행하여 캐싱을 최적화
COPY package.json .
COPY yarn.lock .

RUN yarn install --production

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN yarn build

EXPOSE 80

# Nginx 실행
CMD ["yarn", "start"]




##############################################
# 빌드 단계
# FROM node:18 AS build

# WORKDIR /app

# # 종속성 설치를 먼저 실행하여 캐싱을 최적화
# COPY package.json .
# COPY yarn.lock .

# RUN yarn install --production

# COPY . .

# RUN yarn build

# ############################

# FROM node:18

# WORKDIR /app

# COPY --from=build /app .

# RUN yarn global add pm2

# EXPOSE 80

# # CMD  ["pm2-runtime", "start", "ecosystem.config.cjs"]
# CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]

