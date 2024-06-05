# 예식 시스템 관리 및 키오스크 웹앱

- 배포 URL : https://wedding-app-delta.vercel.app

<br>

## 프로젝트 소개

- 웨딩 업체 등록부터 홀관리, 예식 일정까지 관리할 수 있는 시스템입니다.
- 예식 일정을 등록할 경우 자동으로 모바일 청접장이 생성되고, 청첩장을 공유할 수 있습니다.
- 모바일 청첩장에서 예비 등록을 할 시, QR코드가 생성되고 QR코드를 키오스크에 찍음으로써 편하게 결재와 식권을 받을 수 있습니다.


<br>

## 1. 개발 환경

- Front : HTML, NextJs(Typescript), MUI, PWA
- Back-end : NestJs(Typescript)
- 버전 및 이슈관리 : Github
- 서비스 배포 환경 : Netlify, Oracle Cloud, Docker, Github Action
<br>


## 2. 프로젝트 구조

```
├── README.md
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
│
├── public
│    └── index.html
└── src
     ├── App.jsx
     ├── index.jsx
     ├── api
     │     └── mandarinAPI.js
     ├── asset
     │     ├── fonts
     │     ├── css_sprites.png
     │     ├── logo-404.svg
     │     └── logo-home.svg
     │          .
     │          .
     │          .
     ├── atoms
     │     ├── LoginData.js
     │     └── LoginState.js
     ├── common
     │     ├── alert
     │     │     ├── Alert.jsx
     │     │     └── Alert.Style.jsx
     │     ├── button
     │     ├── comment
     │     ├── inputBox
     │     ├── post
     │     ├── postModal
     │     ├── product
     │     ├── tabMenu
     │     ├── topBanner
     │     └── userBanner
     ├── pages
     │     ├── addProduct
     │     │     ├── AddProduct.jsx
     │     │     └── AddProduct.Style.jsx
     │     ├── chatList
     │     ├── chatRoom
     │     ├── emailLogin
     │     ├── followerList
     │     ├── followingList
     │     ├── home
     │     ├── join
     │     ├── page404
     │     ├── postDetail
     │     ├── postEdit
     │     ├── postUpload
     │     ├── productEdit
     │     ├── profile
     │     ├── profileEdit
     │     ├── profileSetting
     │     ├── search
     │     ├── snsLogin
     │     └── splash
     ├── routes
     │     ├── privateRoutes.jsx
     │     └── privateRoutesRev.jsx  
     └── styles
           └── Globalstyled.jsx
```


## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2022-12-09 ~ 2022-12-31
- UI 구현 : 2022-12-09 ~ 2022-12-16
- 기능 구현 : 2022-12-17 ~ 2022-12-31

<br>

