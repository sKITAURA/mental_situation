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
            ->as_array(p);


        return $situations;
    }

    /**
     * 新しい状況データを作成するメソッド
     * 
     * @param array $data 登録するデータの配列
     * @return Model_Situation|false 作成されたインスタンスまたは失敗時はfalse
     */
    public static function create_situation($data)
    {
        $new_situation = self::forge([
            'date' => $data['date'],
            'situation' => $data['situation'],
            'reason' => $data['reason'],
            'solution' => $data['solution'],
        ]);

        // 保存が成功した場合にインスタンスを返す
        if ($new_situation->save()) {
            return $new_situation;
        } else {
            return false;
        }
    }
}