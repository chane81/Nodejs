# ES6 import 구문 node.js 실행

```js
node --experimental-modules my-app.mjs
```

# 디버깅 설정

- /.vscode/launch.json

```json
{
  // IntelliSense를 사용하여 가능한 특성에 대해 알아보세요.
  // 기존 특성에 대한 설명을 보려면 가리킵니다.
  // 자세한 내용을 보려면 https://go.microsoft.com/fwlink/?linkid=830387을(를) 방문하세요.
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceFolder}/src/section2-request-response-post/app.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

# nodemon 설치

    yarn global add nodemon

# ES6 문법 가능하게 설치

## yarn add

    yarn add babel-cli babel-preset-env --dev

## pachage.json 설정

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

# 섹션 설명

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
