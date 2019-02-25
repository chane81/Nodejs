# Node.js 교과서

# 디버깅 설정

- /.vscode/launch.json

```json
{
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

## package.json 설정

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

## section3
  - 동기/ 비동기
    - 동기/ 비동기 차이
      - 함수가 바로 return 되는지 여부
    - 블로킹/논블로킹
      - 백그라운드 작업 완료 여부
    - 동기
      - 참고
        - Sync.js
      - 순차적으로 로직을 처리한 후 다음 로직으로 넘어감
    - 비동기
      - 참고
        - Async.js
      - 비동기 메서드의 경우 백그라운드에 처리부분을 요청하고 다음 메서드로 넘어간다.
      - 모든 동기적인 작업에 대해 처리가 끝나면 백그라운드가 메인 스레드에 알림을 줌
      - 메인 스레드는 등록된 콜백 함수를 실행함

  - 파일을 읽거나 쓰는 방식에는 크게 두가지 방식이 있음
    - 버퍼
    - 스트림

  - buffer
    - 참고
      - `Buffer.js`
    - from(문자열)
      - 문자열을 버퍼로 치환
    - toString(버퍼)
      - 버퍼를 다시 문자열로 치환
      - toString('hex|base64|...')
    - concat(배열)
      - 배열안에 든 버퍼들을 합침
    - alloc(바이트)
      - 바이트 수 만큼의 빈 버퍼를 생성

  - file stream(fs)
    - 참고
      - `ReadFile.js`
      - `CreateReadStream.js`
      - `CreateWriteStream.js`
      - `FsCreate.js`
      - `CopyFile.js`
    - 파일을 스트림으로 읽거나 쓸 때 사용
    - 파일 읽을 때 특정 바이트 수 만큼 쪼개서 읽고 싶다면 createReadStream 의 옵션에 아래 옵션을 사용
      - `highWaterMark`: 바이트수
    - fs.access
      - 폴더나 파일접근 체크
      - F_OK: 파일 존재 여부
      - R_OK: 읽기 권한 여부
      - W_OK: 쓰기 권한 여부
      - ENOENT: 파일/폴더가 없을 경우 에러 코드
    - fs.mkdir
      - 폴더 생성
    - fs.write
      - 파일을 읽거나 쓸 수 있음
      - 두번째 인자로 어떤 동작을 할 것인지 설정가능함
        - w: 쓰기
        - r: 읽기
        - a: 기존 파일에 추가
    - fs.rename
      - 파일의 이름을 바꿈
    - fs.copyFile
      - 파일 복사

  - pipe
    - 참고
      - `Pipe.js`
    - 스트림과 스트림을 연결하여 사용한다.

  - gzip
    - 참고
      - `Gzip.js`
    - 파일을 압축할 때 사용
    - pipe를 이용하여 스트림을 읽은 뒤 압축파일을 생성 할 수 있다.

