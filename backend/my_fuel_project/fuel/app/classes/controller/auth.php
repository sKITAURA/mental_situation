<?php

use Fuel\Core\Controller_Rest;

class Controller_Auth extends Controller_Rest
{
    protected $format = 'json';

    // ユーザー登録用のメソッド
    public function post_signup()
    {
        // POST データの取得
        $username = Input::post('username');
        $password = Input::post('password');

        // 入力チェック
        if (empty($username) || empty($password)) {
            return $this->response([
                'status' => false,
                'message' => 'ユーザー名とパスワードを入力してください。',
            ], 400);
        }

        // Model_User の create_user メソッドを呼び出す
        $result = Model_User::create_user($username, $password);

        // 結果に基づいてレスポンスを返す
        if ($result['status']) {
            return $this->response([
                'status' => true,
                'message' => $result['message'],
            ], 201);
        } else {
            return $this->response([
                'status' => false,
                'message' => $result['message'],
            ], 400);
        }
    }
}