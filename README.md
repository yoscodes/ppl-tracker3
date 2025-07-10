# PPL-tracker 🏋️‍♂️

PPL法（Push・Pull・Leg）に基づいたトレーニング記録管理アプリケーションです。筋トレ愛好者が効率的にワークアウトを記録し、成長を追跡できるWebアプリです。

## 🌟 特徴

### 📊 トレーニング記録管理
- **PPL法対応**: Push（胸・肩・三頭）、Pull（背中・二頭）、Leg（脚）の3分割トレーニング
- **詳細記録**: 最大6セットまでの重量・回数を記録
- **カレンダー表示**: トレーニング実施日をビジュアルで確認
- **統計グラフ**: 部位別のトレーニング頻度を円グラフで表示

### 🎯 ユーザー体験
- **レスポンシブデザイン**: スマートフォン・タブレット・PCに対応
- **直感的なUI**: Material-UIとTailwind CSSによる美しいインターフェース
- **リアルタイム更新**: 記録の追加・削除が即座に反映

### 🔐 セキュリティ
- **Supabase認証**: 安全なユーザー認証システム
- **データ保護**: ユーザーごとのデータ分離
- **セッション管理**: 自動ログイン機能

## 🚀 技術スタック

### フロントエンド
- **Next.js 15.3.1** - Reactフレームワーク
- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **Material-UI (MUI)** - UIコンポーネント
- **Tailwind CSS** - スタイリング

### バックエンド・データベース
- **Supabase** - バックエンドサービス
  - PostgreSQL データベース
  - リアルタイム認証
  - Row Level Security (RLS)

### その他のライブラリ
- **React Hook Form** - フォーム管理
- **Zod** - スキーマバリデーション
- **Recharts** - データ可視化
- **React Calendar** - カレンダーコンポーネント

## 📦 インストール・セットアップ

### 前提条件
- Node.js 18.0.0以上
- npm または yarn

### 1. リポジトリのクローン
```bash
git clone https://github.com/your-username/ppl-tracker3.git
cd ppl-tracker3
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を追加：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 環境設定
NODE_ENV=development
```

### 4. Supabaseプロジェクトの設定
1. [Supabase Dashboard](https://supabase.com/dashboard) でプロジェクトを作成
2. Settings → API から Project URL と anon key を取得
3. 上記の環境変数に設定値を入力

### 5. データベーステーブルの作成
SupabaseのSQL Editorで以下のテーブルを作成：

```sql
CREATE TABLE records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  training_date DATE NOT NULL,
  menu TEXT NOT NULL,
  category TEXT NOT NULL,
  weight1 INTEGER,
  reps1 INTEGER,
  weight2 INTEGER,
  reps2 INTEGER,
  weight3 INTEGER,
  reps3 INTEGER,
  weight4 INTEGER,
  reps4 INTEGER,
  weight5 INTEGER,
  reps5 INTEGER,
  weight6 INTEGER,
  reps6 INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLSポリシーの設定
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records" ON records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own records" ON records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own records" ON records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own records" ON records
  FOR DELETE USING (auth.uid() = user_id);
```

### 6. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

## 📱 使用方法

### 1. アカウント作成・ログイン
- 初回利用時は新規登録
- Googleアカウントでのログインも可能

### 2. トレーニング記録の追加
1. ホーム画面から「Push」「Pull」「Leg」のいずれかを選択
2. 「追加」ボタンをクリック
3. 日付、種目、重量、回数を入力
4. 最大6セットまで記録可能

### 3. 記録の確認・管理
- 最近の記録をホーム画面で確認
- 部位別の統計グラフでトレーニング頻度を把握
- カレンダーでトレーニング実施日を視覚化

## 🏗️ プロジェクト構造

```
ppl-tracker3/
├── src/
│   ├── app/
│   │   ├── components/          # 再利用可能なコンポーネント
│   │   │   ├── AddButton.tsx    # 記録追加ボタン
│   │   │   ├── RecordFormModel.tsx # 記録入力フォーム
│   │   │   ├── RecordList.tsx   # 記録一覧表示
│   │   │   ├── CalendarView.tsx # カレンダー表示
│   │   │   ├── BodyPartStats.tsx # 統計グラフ
│   │   │   └── RecentRecords.tsx # 最近の記録
│   │   ├── push/               # Pushトレーニングページ
│   │   ├── pull/               # Pullトレーニングページ
│   │   ├── leg/                # Legトレーニングページ
│   │   ├── auth/               # 認証関連ページ
│   │   └── utils/              # ユーティリティ関数
│   │       ├── supabase/       # Supabase設定
│   │       └── interface.ts    # TypeScript型定義
│   └── lib/                    # ライブラリ設定
├── public/                     # 静的ファイル
└── package.json               # 依存関係
```

## 🚀 デプロイ

### Vercelでのデプロイ（推奨）
1. [Vercel](https://vercel.com) にアカウント作成
2. GitHubリポジトリと連携
3. 環境変数を設定
4. デプロイ実行

### その他のプラットフォーム
- Netlify
- Railway
- Heroku

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

- [Supabase](https://supabase.com) - バックエンドサービス
- [Next.js](https://nextjs.org) - Reactフレームワーク
- [Material-UI](https://mui.com) - UIコンポーネント
- [Tailwind CSS](https://tailwindcss.com) - CSSフレームワーク

## 📞 サポート

問題や質問がある場合は、[Issues](https://github.com/your-username/ppl-tracker3/issues) でお知らせください。

---

**PPL-tracker** - 追い込んだ分だけ、結果はついてくる。PPLで限界を超えよう。💪
