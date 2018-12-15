# ES6 import 구문 node.js 실행

```js
node --experimental-modules my-app.mjs
```

## nodemon 설치

    yarn global add nodemon

## ES6 문법 가능하게 설치

### yarn add

    yarn add babel-cli babel-preset-env --dev

### pachage.json 설정

```json
    "babel": {
        "presets": ["env"],
        "plugins": []
    },
    "scripts": {
        "start": "nodemon src/index.js --exec babel-node",
        "build": "babel src -d dist",
        "serve": "node dist/index.js"
    }
```

## section1

    - express 서버 구동
    - static 폴더 설정
    - url routing 처리
    - get 방식 호출

## section2

    - post 방식 호출
    - body-parser 모듈 설치
    - ejs 모듈 설치
    - ejs 템플릿으로 json 객체 보내기
    - ajax request, response
