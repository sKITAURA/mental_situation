<?php


class Model_Situation extends \Model
{
    // 対応するテーブル名を指定
    protected static $_table_name = 'situation-table';

    // 主キーのカラム名を指定（通常は'id'ですが、異なる場合は変更）
    protected static $_primary_key = ['id'];

    /**
     * 全ての状況データを取得するメソッド
     * 
     * @return array 状況データの配列
     */
    public static function get_situation_data()
    {
        // FuelPHPのDBクラスのselectメソッドを使用して全てのレコードを取得
        $situations = DB::select()
            ->from(self::$_table_name)           
            ->execute()
            ->as_array();

        return $situations;
    }

    /**
     * 状況データを更新するメソッド
     * 
     * @param int $id 更新対象のレコードID
     * @param array $new_data 更新するデータの配列
     * @return int 更新された行数
     */
    public static function update_situation_data($id, $new_data)
    {
        // デバッグ出力
        error_log("Received new_data: " . print_r($new_data, true));

        // データベースの「situation-table」に対する更新クエリを実行
        $result = \DB::update(self::$_table_name)
            ->set([
                'state' => $new_data['state'],
                'reason' => $new_data['reason'],
                'solution' => $new_data['solution']
            ])
            ->where('id', '=', $id)
            ->execute();

        return $result;
    }

    /**
     * 特定の状況データを削除するメソッド
     * 
     * @param int $id 削除対象のレコードID
     * @return int 削除された行数
     */
    public static function delete_situation_data($id)
    {
        $result = \DB::delete(self::$_table_name)
            ->where('id', '=', $id)
            ->execute();

        return $result;
    }

    /**
     * 新しい状況データを作成するメソッド
     * 
     * @param array $data 登録するデータの配列
     * @return Model_Situation|false 作成されたインスタンスまたは失敗時はfalse
     */
    public static function new_situation_data($data)
    {
        // 新規データの生成と保存
        $result = \DB::insert(self::$_table_name)->set([
            'state' => $data['state'],
            'reason' => $data['reason'],
            'solution' => $data['solution'],
        ])
        ->execute();
        
        if ($result) {
            $new_data = \DB::select()
            ->from(self::$_table_name)
            ->where('id', '=', $result[0])
            ->execute()
            ->current();
            return $new_data;
        } else {
            return false;
        }
    }
}