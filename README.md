# TODO App

TypeScript製のTODOアプリケーションです。モノレポ構成でフロントエンドとバックエンドを分けて開発しています。

## 技術スタック

- **言語**: TypeScript
- **パッケージ管理**: npm
- **フロントエンド**: Hono, Tailwind CSS
- **バックエンド**: Hono, Prisma, PostgreSQL
- **バリデーション**: Zod
- **テスト**: Vitest
- **リンター/フォーマッター**: Biome

## 主要機能

- TODOリストの作成
- TODOリストの削除
- TODOリストの変更
- TODOリストのステータス変更
- ステータスのカスタマイズ

## セットアップ

### Docker Compose を使用する場合（推奨）

```bash
# 開発環境の自動セットアップ
./scripts/setup-dev.sh

# または手動でDockerコンテナを起動
docker compose up -d

# データベースマイグレーション実行
cd packages/backend
npx prisma migrate dev
npx prisma db seed
```

アプリケーションにアクセス:
- フロントエンド: http://localhost:3001
- バックエンドAPI: http://localhost:3000
- PostgreSQL: localhost:5432

### ローカル開発環境の場合

PostgreSQLサーバーを事前にインストール・起動しておいてください。

```bash
# 1. 依存関係のインストール
npm install

# 2. 環境変数の設定
cd packages/backend
cp .env.example .env
# .envファイルのDATABASE_URLを適切に設定

# 3. データベースのセットアップ
npx prisma migrate dev
npx prisma db seed

# 4. アプリケーションの起動
# バックエンドサーバーを起動
npm run dev

# 別のターミナルでフロントエンドサーバーを起動
cd ../frontend
npm run dev
```

## 開発コマンド

### 全体
- `npm run dev`: 開発サーバー起動
- `npm run build`: プロダクションビルド
- `npm run test`: テスト実行
- `npm run lint`: リント実行
- `npm run format`: フォーマット実行

### バックエンド
- `npm run dev`: 開発サーバー起動
- `npm run db:migrate`: データベースマイグレーション
- `npm run db:seed`: データベースシード実行
- `npm run db:studio`: Prisma Studio起動

### Docker
- `docker-compose up -d`: バックグラウンドで全サービス起動
- `docker-compose down`: 全サービス停止
- `docker-compose logs -f [service]`: サービスログ確認

## API エンドポイント

### Todos
- `GET /api/todos` - 全てのTODO取得
- `POST /api/todos` - TODO作成
- `GET /api/todos/:id` - 特定のTODO取得
- `PUT /api/todos/:id` - TODO更新
- `DELETE /api/todos/:id` - TODO削除

### Statuses
- `GET /api/statuses` - 全てのステータス取得
- `POST /api/statuses` - ステータス作成
- `GET /api/statuses/:id` - 特定のステータス取得
- `PUT /api/statuses/:id` - ステータス更新
- `DELETE /api/statuses/:id` - ステータス削除

## プロジェクト構成

```
packages/
├── backend/       # バックエンドAPI
├── frontend/      # フロントエンドUI
└── shared/        # 共通の型定義とスキーマ
```