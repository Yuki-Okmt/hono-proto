## プロジェクト概要
- アプリ名
  - TODOアプリ
- リポジトリ構成
  - モノレポ構成
- 主要機能
  - TODOリストの作成
  - TODOリストの削除
  - TODOリストの変更
  - TODOリストのステータスの変更
  - ステータスのカスタマイズ

## 技術スタック
- 言語
  - TypeScript
- パッケージ管理
  - npm
- テストツール
  - vitest
- フロントエンド
  - Hono
  - Tailwind CSS
  - Zod
- バックエンド
  - Hono
  - Prisma
  - Zod
- DB
  - PostgresSQL
- linter, formatter
  - Biome

## Playwright MCP使用ルール

### 禁止事項

1. 以下のようなPlaywright MCP以外のアプローチは禁止

   - プログラミング言語やスクリプト言語を使用したブラウザ操作
   - コマンド実行によるブラウザ操作

2. MCPツールの呼び出しのみ利用可能とする

   - playwright:browser_navigate
   - playwright:browser_screenshot
   - playwright:browser_navigate_back
   - playwright:browser_navigate_forward
   - 他のPlaywright MCPツール

3. エラー時は即座に報告すること
   - 回避策を探さない
   - 代替手段を実行しない
   - エラーメッセージをそのまま伝える
