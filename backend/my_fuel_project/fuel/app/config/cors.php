<?php
return [
    // 許可するオリジン（ReactアプリのURLなどを指定）
    'allowed_origins' => [
        'http://localhost:5174', // Reactが動作しているURLを指定
        'http://example.com',    // 必要に応じて他のオリジンを追加
    ],

    // 許可するHTTPメソッド
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    // 許可するヘッダー
    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],

    // 認証情報（クッキーや認証ヘッダ）の共有を許可するか
    'allow_credentials' => true,
];