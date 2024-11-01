<?php

use Fuel\Core\Controller_Rest;
use Fuel\Core\Input;

class Controller_Situation extends Controller
{
    protected $format = 'json';

    // 新しい状況を追加するメソッド
    public function post_create()
    {
        $date = Input::post('date');
        $situation = Input::post('situation');
        $reason = Input::post('reason');
        $solution = Input::post('solution');

        // 入力チェック（必要に応じて行う）
        if (empty($date) || empty($situation) || empty($reason) || empty($solution)) {
            return $this->response([
                'status' => false,
                'message' => 'すべての項目を入力してください。',
            ], 400);
        }

        // 新しいレコードを作成
        $new_situation = Model_Situation::forge([
            'date' => $date,
            'situation' => $situation,
            'reason' => $reason,
            'solution' => $solution,
        ]);

        if ($new_situation && $new_situation->save()) {
            return $this->response([
                'status' => true,
                'message' => '新しい状況が追加されました。',
                'data' => $new_situation,
            ], 201);
        } else {
            return $this->response([
                'status' => false,
                'message' => '追加に失敗しました。',
            ], 500);
        }
    }

    // 既存の状況を取得するメソッド
    public function get_list()
    {
        $situations = Model_Situation::find('all');
        return $this->response($situations, 200);
    }
}