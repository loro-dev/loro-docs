import { HomeTranslation } from "./types";

export const homeJa = {
  hero: {
    descriptionLines: [
      "協調編集を手軽に実装。",
      "CRDT が支えています。",
      "ローカルファーストなソフトウェアのために設計されています。",
    ],
    titleLines: ["状態管理を", "再発明する"],
    connector: "CRDT とともに",
    emphasis: "",
  },
  cta: {
    getStarted: "はじめる",
  },
  sections: {
    richTextDemo: "リッチテキストエディターデモ",
    syncHeading: ["ドキュメント同期もスムーズに", "P2P 環境でも安心"],
    whatYouCanBuild: "実現できるプロダクト",
    whatYouCanBuildDescription:
      "Loro が協調状態レイヤーを提供します。UI・認証・ストレージ・通信はあなたの自由です。",
  },
  features: {
    intro: "Loro はローカルファーストかつリアルタイム協調のための高性能 CRDT ライブラリです。",
    items: [
      {
        title: "高いパフォーマンス",
        description: "高度な最適化によりメモリ・CPU・読み込み速度を最大限に引き上げます。",
      },
      {
        title: "豊富な CRDT タイプをサポート",
        description: "JSON 風のデータを簡単に協調編集可能な型へと変換します。",
      },
      {
        title: "バージョン管理付きリアルタイム協調",
        description: "リアルタイム協調中でも Git のような完全な履歴を保持します。",
      },
      {
        title: "シンプルで直感的な API",
        description: "開発者体験を最優先に設計されています。",
      },
    ],
  },
  customerWall: {
    heading: "Loro を採用しているチーム",
  },
  build: {
    cards: [
      {
        title: "共同ドキュメント",
        description: "プレゼンス・履歴・衝突のないマージを備えたドキュメント型エディター。",
        ariaLabel: "ドキュメント",
        links: [{ href: "/docs/tutorial/text", label: "チュートリアル" }],
      },
      {
        title: "デザインツール",
        description: "リストやツリー、元に戻す/やり直し、リアルタイム同期を備えた Figma 風キャンバス。",
        ariaLabel: "デザイン",
        links: [
          { href: "/docs/tutorial/tree", label: "ツリー" },
          { href: "/docs/tutorial/list", label: "可動リスト" },
        ],
      },
      {
        title: "データダッシュボード",
        description: "Airtable 風のテーブルで JSON 状態・スナップショット・履歴を共有できます。",
        ariaLabel: "ダッシュボード",
        links: [{ href: "/docs/tutorial/persistence", label: "永続化" }],
      },
      {
        title: "マルチプレイヤーゲーム",
        description: "衝突のない更新とタイムライン再生を備えた共有ゲーム状態。",
        ariaLabel: "ゲーム",
        links: [],
      },
      {
        title: "チャットアプリ",
        description: "オフライン同期・プレゼンス・衝突のない履歴を備えたメッセージストリーム。",
        ariaLabel: "チャット",
        links: [{ href: "/docs/tutorial/list", label: "リスト" }],
      },
      {
        title: "プロダクティビティアプリ",
        description: "Notion 風のワークスペースで、共有ブロック・タスク・ナレッジベースを扱えます。",
        ariaLabel: "プロダクティビティ",
        links: [],
      },
    ],
    linkSeparator: " · ",
  },
  support: {
    heading: "Loro が支援すること",
    cards: [
      {
        title: "ローカルファースト協調の構築",
        description: [
          "Loro はオフラインでも動作し、再接続時に自動同期し、競合を最小化するソフトウェア構築を支援します。",
        ],
      },
      {
        title: "最先端アルゴリズム",
        description: [
          "最新の CRDT 研究とマルチプレイヤー体験についてはブログ ",
          {
            type: "link",
            href: "https://www.loro.dev/blog/loro-update-october-2024",
            label: "Updates: October 2024",
            isExternal: true,
          },
          " をご覧ください。",
        ],
      },
      {
        title: "リッチテキスト CRDT",
        description: [
          "Loro のリッチテキスト CRDT は、並行して発生するスタイル編集を統合して各ユーザーの意図をできるだけ保ちます。詳しくはブログ ",
          {
            type: "link",
            href: "/blog/loro-richtext",
            label: "Loro のリッチテキスト CRDT",
            isExternal: true,
            className: "underline",
          },
          " をご覧ください。",
        ],
      },
      {
        title: "Moveable Tree による階層データ",
        description: [
          "ディレクトリ型データ操作が必要なアプリでは、",
          {
            type: "link",
            href: "https://ieeexplore.ieee.org/document/9563274",
            label: "A Highly-Available Move Operation for Replicated Trees",
            isExternal: true,
            className: "underline italic",
          },
          " のアルゴリズムを採用し、階層構造の移動と再編成を容易にします。",
        ],
      },
    ],
  },
  followOnGitHub: {
    label: "GitHub でフォロー",
    ariaLabel: "GitHub でフォロー",
  },
} satisfies HomeTranslation;

export default homeJa;
