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
        $this->response->set_header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
        $this->response->set_header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // プリフライトリクエストへの対応
        if (Input::method() === 'OPTIONS') {
            $this->response->set_status(204);
            return $this->response;
        }
    }
    public function get_get_data(){
        
        $data = Model_Situation::get_situation_data();
        return $data;
    }
}