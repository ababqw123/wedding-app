
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

# 환경 변수 설정
ENV MONGODB_URL="mongodb+srv://nsc159:shtjdckd11@ano.ismxfen.mongodb.net/anodb?retryWrites=true&w=majority&appName=ano"
ENV CLIENT_ADDRESS="localhost:3000"

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]