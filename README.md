# 예식 시스템 관리 및 키오스크 웹앱

- 배포 URL : https://wedding-app-delta.vercel.app

<br>

## 프로젝트 소개

- 웨딩 업체 등록부터 홀관리, 예식 일정까지 관리할 수 있는 시스템입니다.
- 예식 일정을 등록할 경우 자동으로 모바일 청접장이 생성되고, 청첩장을 공유할 수 있습니다.
- 모바일 청첩장에서 


<br>

## 1. 개발 환경

- Front : HTML, React, styled-components, Recoil
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Discord, Notion, Github Wiki
- 서비스 배포 환경 : Netlify
- 디자인 : [Figma](https://www.figma.com/file/fAisC2pEKzxTOzet9CfqML/README(oh-my-code)?node-id=39%3A1814)
- [커밋 컨벤션](https://github.com/likelion-project-README/README/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [코드 컨벤션](https://github.com/likelion-project-README/README/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [스프라이트](https://github.com/likelion-project-README/README/wiki/%EC%8A%A4%ED%94%84%EB%9D%BC%EC%9D%B4%ED%8A%B8)
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

