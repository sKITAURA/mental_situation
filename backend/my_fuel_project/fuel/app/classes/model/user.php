<?php

use Fuel\Core\Model;

class Model_User extends Model
{
    public static function authenticate($username, $password)
    {
        // ユーザー名とパスワードをデータベースで確認
        // ここではサンプルとして、ユーザー名「admin」、パスワード「password」を設定しています。
        if ($username === 'admin' && $password === 'password') {
            return true;
        }

        return false;
    }
}