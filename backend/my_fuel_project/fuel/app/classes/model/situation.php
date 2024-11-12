<?php

use Fuel\Core\Model_Crud;

class Model_Situation extends Model
{
    // 対応するテーブル名を指定

    // 主キーのカラム名を指定（通常は'id'ですが、異なる場合は変更）
    protected static $_primary_key = ['id']; 

    /**
     * 全ての状況データを取得するメソッド
     * 
     * @return array 状況データの配列
     */
    public static function get_situation_data()
    {
        // FuelPHPのfindメソッドを使用して、全てのレコードを取得
        $situations = DB::select()
            ->from('situation-table')           
            ->execute()
            ->as_array();


        return $situations;
    }
    public static function update_situation_data($id, $new_data)
{
    // デバッグ出力
    error_log("Received new_data: " . print_r($new_data, true)); // エラーログに出力
    var_dump($new_data); // ブラウザで確認

    // データベースの「situation-table」に対する更新クエリを実行
    $result = DB::update('situation-table')
        ->set([
            'id' => $id,
            'date' => $new_data['date'],
            'situation' => $new_data['situation'],
            'reason' => $new_data['reason'],
            'solution' => $new_data['solution']
        ])
        ->where('id', '=', $id)
        ->execute();

    // 結果を返す
    return $result;
}

    public static function delete_situation_data($id)
    {
        // IDに基づいて特定のレコードを削除
        $result = DB::delete('situation-table')
            ->where('id', '=', $id)
            ->execute();

        return $result; // 削除した件数が返される
    }

    


    /**
     * 新しい状況データを作成するメソッド
     * 
     * @param array $data 登録するデータの配列
     * @return Model_Situation|false 作成されたインスタンスまたは失敗時はfalse
     */
    public static function new_mental_data($data)
    {
        $new_mental_data = self::forge([
            'date' => $data['date'],
            'situation' => $data['situation'],
            'reason' => $data['reason'],
            'solution' => $data['solution'],
        ]);

        // 保存が成功した場合にインスタンスを返す
        if ($new_mental_data->save()) {
            return $new_mental_data;
        } else {
            return false;
        }
    }
}