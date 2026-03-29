# 学習記録アプリ
このアプリはReactとsupabaseを使用したWebアプリです。
また、リポジトリはgithubにpushするとGithub Actionsで
Test → Build → Deploy

# アプリ説明
日々の学習の内容と学習時間の記録と総学習時間の見える化をした
アプリです。  
学習内容と0より大きい数字を入力して登録を押すと
記録が保存され、削除したい記録の隣の「削除」ボタンを押すと
削除されます。

# 環境設定の方法
1. `.env`ファイルを作成し、以下の内容を記載してください。  
VITE_SUPABASE_URL=SUPABASEのプロジェクトURL(SUPABASE_URLも同様)  
VITE_SUPABASE_ANON_KEY=SUPABASEのANON_KEY(SUPABASE_ANON_KEYも同様)


Firebaseのプロジェクトコンフィグ情報を記載する  
https://zenn.dev/h_yoshikawa0724/articles/2020-10-06-react-firebase-deploy?redirected=1  
上記サイトを参考にFirebaseにプロジェクトを作り、それぞれ設定する  

VITE_REACT_APP_APP_KEY=※apikey  
VITE_REACT_APP_AUTH_DOMAIN=※authDomain  
VITE_REACT_APP_PROJECT_ID=※projectId  
VITE_REACT_APP_STORAGEBUCKET=※storageBucket  
VITE_REACT_APP_MESSAGING_SENDER_ID=※messagingSenderId  
VITE_REACT_APP_APP_ID=※appId  
VITE_REACT_APP_MEASUREMENT_ID=※measurementId  

2. Makeファイルを実行して、firebaseへデプロイします  

1, 2まで対応するとローカルで動きます。  

# 起動の仕方
ローカルにpullした後、リポジトリ直下へ
ディレクトリへ移動。その後、
コマンドプロンプトで「npm run dev」を叩くと
ローカルで起動する
