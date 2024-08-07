# Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### 1. 프로젝트 루트 디렉토리(front)로 이동합니다.

```bash
cd front
```

#### 2. 필요한 패키지를 설치합니다.

```bash
npm install
# or
yarn
```

#### 3. 개발 환경에서 실행합니다.

```bash
npm run dev
# or
yarn dev
```

#### 4. 브라우저에서 [http://localhost:3000](http://localhost:3000)로 접속하여 결과를 확인합니다.

(초기 페이지는 `app/page.js`을 기반으로 작성되어 있습니다.)

#### 5. 코드 변경사항 저장 후 [http://localhost:3000](http://localhost:3000)에서 실시간으로 반영되는 것을 확인합니다.

# 깃에 푸시하기 & 배포하기

#### 1. 깃에 올리기 전 변경사항이 오류가 나지 않는지 확인합니다.

```bash
npm run build
# or
yarn build
```

#### 2. 변경사항을 스테이징합니다.

```bash
git add .
```

#### 3. 변경사항을 커밋합니다.

- Commit 컨벤션은 [Notion > 개발 > Commits 컨벤션](https://www.notion.so/designersejinoh/4d8fa233e9144e89ad5db99d084d04db?pvs=4#b19970bf7d1d435ea55c1d1ade941258/)을 참고하세요.

```bash
git commit -m "커밋 메시지"
```

#### 4. 변경사항을 깃허브에 푸시합니다.

```bash
git push origin [브랜치명]
```

#### 5. 배포하기

- 배포는 [Vercel](https://vercel.com/)을 통해 진행합니다.
- [Vercel > Pelikan Team ](https://vercel.com/pelikan)에서 Git Repo를 자동으로 연동하기 때문에 깃허브에 푸시하면 자동으로 배포가 진행됩니다.
- 배포가 완료되면 [Vercel > pelikantoy Deployments](https://vercel.com/pelikan/pelikantoy)에서 배포된 사이트를 확인할 수 있습니다.
