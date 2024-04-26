
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

# 런타임 단계
FROM node:18-slim

WORKDIR /app

# 필요한 파일 복사
COPY --from=build /app .

# 환경 변수 설정
ENV NEXT_PUBLIC_SERVER_URL="https://weddingpage.kro.kr"
ENV NEXT_PUBLIC_MAP_TOKEN="8591044f66278fd2484621cb7140724d"

# Nginx 실행
CMD ["yarn", "start"]
