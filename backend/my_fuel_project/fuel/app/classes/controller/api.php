<?php

use Fuel\Core\Controller_Rest;
use Fuel\Core\Input;

class Controller_Api extends Controller_Rest
{
    protected $format = 'json';

    public function before()
    {
        parent::before();
        
        header('Access-Control-Allow-Origin: http://localhost:5174');
        header('Access-Control-Allow-Methods: PUT,POST, GET');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Credentials: true');
        header('X-Frame-Options: DENY');

        if (Input::method() == 'OPTIONS') {
            exit;
        }

    }

        public function get_mental_data(){
            
            $data = Model_Situation::get_situation_data();
            return $data;
        }
        public function post_delete_mental_data($id){
            $data = Model_Situation::delete_situation_data($id);
            return $this->response($data);
        }
        public function post_update_mental_data($id)
    {
        // リクエストボディのJSONデータを取得
        $new_data = Input::json(); // POSTされたデータを取得
        $data = Model_Situation::update_situation_data($id, $new_data);
        return $this->response($data);
    }

    public function post_new_mental_data()
    {
        // リクエストボディのJSONデータを取得
        $new_data = Input::json(); // POSTされたデータを取得
        $data = Model_Situation::new_situation_data($new_data);
        var_dump($data);
        return $this->response($data);
    }

        
}