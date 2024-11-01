<?php

use Fuel\Core\Model;

class Model_User extends Model_Crud
{
    protected static $_table_name = 'users';
    protected static $_primary_key = 'id';

    protected static $_properties = [
        'id',
        'username',
        'password',
        'created_at',
        'updated_at',
    ];

    // 新規ユーザーを作成するメソッド
    public static function create_user($username, $password)
    {
        // ユーザー名が既に存在するかチェック
        $existing_user = static::find('first', [
            'where' => [['username', $username]]
        ]);

        if ($existing_user) {
            // ユーザー名が既に存在する場合は false を返す
            return ['status' => false, 'message' => 'ユーザー名は既に使用されています。'];
        }

        // 新しいユーザーを登録
        $user = static::forge([
            'username' => $username,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        if ($user && $user->save()) {
            // 成功した場合
            return ['status' => true, 'message' => '登録が成功しました！'];
        } else {
            // 保存に失敗した場合
            return ['status' => false, 'message' => 'ユーザー登録に失敗しました。'];
        }
    }
}