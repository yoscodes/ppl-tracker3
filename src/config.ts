const config = {
  appName: "PPL-tracker",
  appDescription: "Record your workout!",
  // 開発中はローカルのURL、本番では本物のドメインが使われるように自動で切り替えて
  domainName:
    // アプリケーションが開発環境で実行されている場合に true
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://quillminds.com", // 本番ドメインの設定
};

export default config;
