<?php

use Fuel\Core\Controller;
use Fuel\Core\View;

class Controller_Login extends Controller
{
    public function action_index()
    {
        // loginページのビューを返す
        return View::forge('login/index');
    }

    public function post_authenticate()
    {
        // Knockout.js から POST されるデータを取得
        $username = Input::post('username');
        $password = Input::post('password');

        // モデルで認証処理を実行
        if (Model_User::authenticate($username, $password)) {
            return json_encode(['success' => true]);
        } else {
            return json_encode(['success' => false, 'error' => 'Invalid credentials']);
        }
    }
}