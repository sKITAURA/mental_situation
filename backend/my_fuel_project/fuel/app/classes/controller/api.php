<?php

use Fuel\Core\Controller_Rest;
use Fuel\Core\Input;

class Controller_Api extends Controller_Rest
{
    protected $format = 'json';

public function before()
{
    parent::before();

    // CORS ヘッダーの設定
    $this->response->set_header('Access-Control-Allow-Origin', 'http://localhost:5174');
    $this->response->set_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    $this->response->set_header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    $this->response->set_header('Access-Control-Allow-Credentials', 'true'); // 追加


    // プリフライトリクエストへの対応
    if (Input::method() === 'OPTIONS') {
        $this->response->set_status(200);
        // レスポンスを送信して終了
        echo $this->response->body();
        exit;
    }
}

    public function get_mental_data(){
        
        $data = Model_Situation::get_situation_data();
        return $data;
    }
    public function post_delete_mental_data($id){
        $data = Model_Situation::update_situation_data($id);
        return $this->response($data);
    }
    public function post_update_mental_data($id){
        $data = Model_Situation::delete_situation_data($id);
        return $data;
}
}