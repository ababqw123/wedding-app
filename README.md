# 예식 시스템 관리 및 키오스크 웹앱

- 배포 github : https://github.com/ababqw123/wedding-app
- 배포 URL : https://wedding-app-delta.vercel.app

<br>
<img width="600" alt="wedding_Title" src="https://github.com/ababqw123/wedding-app/assets/96455920/82eeb5c0-f806-4329-9d8f-d9d2d1407bbb">

## 프로젝트 소개

- 웨딩 업체 등록부터 홀관리, 예식 일정까지 관리할 수 있는 시스템입니다.
- 예식 일정을 등록할 경우 자동으로 모바일 청접장이 생성되고, 청첩장을 공유할 수 있습니다.
- 모바일 청첩장에서 예비 등록을 할 시, QR코드가 생성되고 QR코드를 키오스크에 찍음으로써 편하게 결재와 식권을 받을 수 있습니다.
- 프론트엔드는 Nextjs로 개발되어 vercel을 통해 배포하였고, 백엔드는 Oracle cloud에 docker를 설치하여 배포하였습니다.
- main 브런치의 프론트엔드/백엔드 코드가 수정될 경우 github action을 통하여 각각의 이미지가 자동으로 docker hub에 배포됩니다.

<br>

## 1. 개발 환경 및 개발 기간
### 개발 환경
- Front : HTML, NextJs(Typescript), MUI, PWA(앱으로 생성)
- Back-end : NestJs(Typescript)
- DB : MongoDB
- 버전 및 이슈관리 : Github
- 서비스 배포 환경 : vercel, Oracle Cloud, Docker, Github Action
  <br>
### 개발 기간 및 개발 인원
- 개발 인원 : 1명
- 전체 개발 기간 : 2023-12 ~ 2024-04

## 2. 프로젝트 구조

```
wedding-app
├─ .DS_Store
├─ README.md
├─ docker-compose.yml
├─ wedding-backend
│  ├─ .dockerignore
│  ├─ .env
│  ├─ .eslintrc.js
│  ├─ .prettierrc
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ ecosystem.config.cjs
│  ├─ nest-cli.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ controller
│  │  │  ├─ company.controller.ts
│  │  │  └─ login.controller.ts
│  │  ├─ function.ts
│  │  ├─ interface
│  │  │  ├─ companyInfo.ts
│  │  │  ├─ congratulatoryMoney.ts
│  │  │  ├─ hallInfo.ts
│  │  │  ├─ userInfo.ts
│  │  │  └─ weddingInfo.ts
│  │  ├─ main.ts
│  │  ├─ module
│  │  │  ├─ company.module.ts
│  │  │  └─ login.module.ts
│  │  ├─ schema
│  │  │  ├─ companyInfo.ts
│  │  │  ├─ congratulatoryMoney.ts
│  │  │  ├─ userInfo.ts
│  │  │  └─ weddingInfo.ts
│  │  ├─ secret
│  │  │  ├─ AES256.ts
│  │  │  └─ AESKeySetting.ts
│  │  └─ service
│  │     ├─ company.service.ts
│  │     └─ login.service.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  └─ yarn.lock
└─ wedding-frontend
   ├─ .dockerignore
   ├─ .env
   ├─ Dockerfile
   ├─ README.md
   ├─ next-env.d.ts
   ├─ next.config.js
   ├─ package-lock.json
   ├─ package.json
   ├─ pages
   │  ├─ _app.tsx
   │  ├─ _document.tsx
   │  ├─ admin
   │  │  ├─ company.tsx
   │  │  ├─ index.tsx
   │  │  └─ wedding
   │  │     ├─ [token].tsx
   │  │     ├─ addWedding.tsx
   │  │     └─ index.tsx
   │  ├─ customer
   │  │  └─ [token].tsx
   │  ├─ index.tsx
   │  ├─ invitation
   │  │  └─ [token].tsx
   │  ├─ login.tsx
   │  ├─ qrscan
   │  │  └─ index.tsx
   │  └─ register
   │     └─ [token].tsx
   ├─ public
   │  ├─ assets
   │  │  ├─ BackgroundVideo.mp4
   │  │  ├─ Gallery_Photo_1.webp
   │  │  ├─ Gallery_Photo_2.webp
   │  │  ├─ Gallery_Photo_3.webp
   │  │  ├─ Gallery_Photo_4.webp
   │  │  ├─ Gallery_Photo_5.webp
   │  │  ├─ Gallery_Photo_6.webp
   │  │  ├─ GroovePaper.png
   │  │  ├─ LocationMap.png
   │  │  ├─ Quote.png
   │  │  ├─ flower1.png
   │  │  ├─ flower2.png
   │  │  ├─ flower3.png
   │  │  └─ song.mp3
   │  ├─ companent
   │  │  ├─ Appbar.tsx
   │  │  ├─ KakaoMap.tsx
   │  │  ├─ SnackBarCustom.tsx
   │  │  └─ copyClipboard.tsx
   │  ├─ favicon.ico
   │  ├─ fonts
   │  │  └─ SKYBORI.ttf
   │  ├─ icons
   │  │  ├─ icon-128x128.png
   │  │  ├─ icon-144x144.png
   │  │  ├─ icon-152x152.png
   │  │  ├─ icon-192x192.png
   │  │  ├─ icon-384x384.png
   │  │  ├─ icon-48x48.png
   │  │  ├─ icon-512x512.png
   │  │  ├─ icon-72x72.png
   │  │  └─ icon-96x96.png
   │  ├─ manifest.json
   │  ├─ next.svg
   │  ├─ photo
   │  │  └─ 45-degree-fabric-light.png
   │  ├─ sw.js
   │  ├─ sw.js.map
   │  ├─ types
   │  │  ├─ instascan.d.ts
   │  │  ├─ kakaoMap.d.ts
   │  │  └─ quagga.d.ts
   │  ├─ vercel.svg
   │  ├─ workbox-bd7e3b9b.js
   │  └─ workbox-bd7e3b9b.js.map
   ├─ styles
   │  ├─ Home.module.css
   │  └─ globals.css
   ├─ tsconfig.json
   └─ yarn.lock

```
<br>

## 3. 프로젝트 상세 설명
### 1. 관리자 페이지
- 관리자 로그인 
<img width="1432" alt="login" src="https://github.com/ababqw123/wedding-app/assets/96455920/79efbf7c-26a6-4911-aa75-4493e8a8169b">
  - 관리자의 로그인 페이지로 현재 테스트용으로 사용하고 있기에 로그인 버튼만 누르면 접속하게 되어있습니다.
<br>
  - 회원가입 및 관리자와 고객에 대한 로그인이 가능하고, 키오스크로 활용 시 사용되는 QR 코드 기능이 로그인 화면에 같이 있습니다.

<br>
- 예식장 관리
<img width="1433" alt="company" src="https://github.com/ababqw123/wedding-app/assets/96455920/44471e5b-2f2a-49d9-82ef-7379376a45d6">
  - 예식장을 추가/수정/삭제 할 수 있는 관리 페이지 입니다.
<br>
  - 예식장을 등록하고 주소를 입력해놓으면 청첩장의 카카오맵에서 해당 지점에 대한 주소를 검색하여 지도가 출력됩니다.

<br>
- 홀 관리
<img width="1434" alt="hall" src="https://github.com/ababqw123/wedding-app/assets/96455920/6dd17d4e-0126-4ffa-a235-7edce3bd326f">
  - 예식장의 홀을 추가/수정/삭제 할 수 있는 관리 페이지 입니다.

<br>
- 예식 일정 관리
<img width="1429" alt="wedding1" src="https://github.com/ababqw123/wedding-app/assets/96455920/457fa501-e444-48bd-a87f-36b7e899cd72">
<img width="1434" alt="wedding2" src="https://github.com/ababqw123/wedding-app/assets/96455920/b4dc9db4-b859-4455-803c-7ce7ffb509a2">
  - 예식 일정을 추가/수정/삭제 할 수 있는 관리 페이지입니다.
<br>
  - 예식 일정을 추가하면 자동으로 청첩장이 생성됩니다.
<br>
  - 청첩장 바로 접속 및 청첩장 url 복사, 수정 및 고객용 login id를 확인할 수 있습니다.
  (login id를 사용하여, QR코드를 사용하여 축의금을 낸 명단과 금액, 식권 수량을 파악할 수 있습니다.)

### 2. 고객 페이지
- 청첩장
<img width="1433" alt="company" src="https://github.com/ababqw123/wedding-app/assets/96455920/44471e5b-2f2a-49d9-82ef-7379376a45d6">
  - 자동으로 생성되는 청첩장 페이지입니다.
<br>
  - 예비 등록을 통하여 이름과 번호, 축의금 금액을 입력한 QR코드를 미리 생성할 수 있습니다.
<br>
  - 추가적인 업데이트를 통하여 소개글 및 배경색, 사진, 노래 등을 선택하여 넣을 수 있도록 기능을 추가할 예정입니다.

<br>
- 축의금 명단
<img width="1280" alt="list" src="https://github.com/ababqw123/wedding-app/assets/96455920/cecc2632-5845-4060-93d7-065fbfc2144a">
  - 로그인 페이지에서 관리자로 부터 받은 고객용 login id를 통해서 접속할 수 있습니다.
<br>
  - 청첩장에 있는 예비등록으로 얻은 QR코드를 키오스크에 찍으면 축의금 명단에 출력됩니다.
<br>
  - 총 식권 수량과 축의금 금액 이름과 연락처를 알수있습니다.

### 3. 하객 및 키오스크
- 사전 등록 페이지
<img width="1183" alt="regist" src="https://github.com/ababqw123/wedding-app/assets/96455920/7c52f9ab-9372-4e42-9bdb-9acc0399f6f4">
<img width="1362" alt="qr" src="https://github.com/ababqw123/wedding-app/assets/96455920/74b1e7ca-f815-45f8-9477-97f038ef5026">
  - 청첩장에서 접속할 수 있는 사전 등록페이지 입니다.
<br>
  - 정보를 입력하면 QR코드를 얻을 수 있고, 예식장에서 키오스크를 통하여 등록 및 결재가 가능합니다.

<br>
- 키오스크
<img width="1143" alt="kiosk" src="https://github.com/ababqw123/wedding-app/assets/96455920/96d43eff-24ef-4cd4-830f-c8fa79bc9a23">
<img width="1184" alt="kiosk2" src="https://github.com/ababqw123/wedding-app/assets/96455920/8ff8ab2f-1461-4473-a500-92bfaedcea50">
<img width="1187" alt="kiosk3" src="https://github.com/ababqw123/wedding-app/assets/96455920/3df478ea-25bc-409d-9f79-0ded56562718">
  - 예식장에 설치될 키오스크 기능입니다.
<br>
  - 기존에 다운받은 QR코드를 찍으면 자동으로 결재 시스템으로 넘어가고, 결재가 승인되면 식권 발급 수량을 확인합니다.
<br>
  - 결재 시스템의 구현은 하지 않았고, 승인을 선택할 시 식권 발급 화면으로 넘어가집니다.



