# # 빌드 단계
# FROM node:18 AS build

# WORKDIR /app

# # 종속성 설치를 먼저 실행하여 캐싱을 최적화
# COPY package.json .
# COPY yarn.lock .

# RUN yarn install --production

# # 소스 코드 복사
# COPY . .

# # 프로덕션 빌드
# RUN yarn build

# ############################################

# # 실행 단계
# FROM nginx:1.21.4-alpine 

# # 빌드 단계에서 생성된 프로덕션용 번들 복사
# COPY --from=build /app/.next /usr/share/nginx/html

# # 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
# RUN rm /etc/nginx/conf.d/default.conf

# # custom 설정파일을 컨테이너 내부로 복사한다.
# COPY nginx.conf /etc/nginx/conf.d

# # Nginx에 노출할 포트 지정
# EXPOSE 80

# # Nginx 실행
# CMD ["nginx", "-g", "daemon off;"]


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

############################################

# 실행 단계
FROM nginx:1.21.4-alpine 

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build app/out /usr/share/nginx/html


# Nginx에 노출할 포트 지정
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]


##############################################
# # 빌드 단계
# FROM node:18 AS build

# WORKDIR /app

# # 종속성 설치를 먼저 실행하여 캐싱을 최적화
# COPY package.json .
# COPY yarn.lock .

# RUN yarn global add pm2

