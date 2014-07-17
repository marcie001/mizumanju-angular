# Mizumanju Client

Mizumanju は一定時間ごとに webcam の画像をメンバー間で共有するシステムです。
これはそのクライアントです。
サーバは [Mizumanju Server](https://github.com/marcie001/mizumanju) です。こちらに試し方も記載しています。

## 開発するには

事前に Node.js と Ruby をインストールしてください。まずは、必要なツールをインストールします。

    $ npm install -g grunt-cli typescript tsd bower
    $ gem install compass

次に依存関係のライブラリなどをダウンロードし、ビルドを行います。

    $ npm install
    $ grunt setup default

### JavaScript

JavaScript ライブラリの依存関係は bower で管理しています。

### TypeScript 型定義ファイル

TSD で管理しています。

## Unit Test

TODO

## E2E Test

protoractor を使っています。 [AngularJS のドキュメント](https://docs.angularjs.org/guide/e2e-testing) や書籍『AngularJS リファレンス』に解説があります。今のところ JavaScript で書いています。

Web サーバ、mizumanju サーバ、Web Driver を立ち上げ(@webdriver-manager start@)、テストを実行してください。

    $ grunt e2etest

