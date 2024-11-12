<?php
/**
 * Fuel is a fast, lightweight, community driven PHP 5.4+ framework.
 *
 * @package    Fuel
 * @version    1.9-dev
 * @author     Fuel Development Team
 * @license    MIT License
 * @copyright  2010 - 2019 Fuel Development Team
 * @link       https://fuelphp.com
 */

 return array(
    Router::add('situation/get', 'situation/get_situation_data'),          // GETリクエスト
    Router::add('situation/create', 'situation/post_new_situation_data'),              // POSTリクエスト (新規作成)
    Router::add('situation/edit/:id', 'situation/post_update_data'),               // PUTリクエスト (編集)
    Router::add('situation/delete/:id', 'situation/delete_situation'),     // DELETEリクエスト (削除)
);

// return array(
// 	Router::add('situation/get', 'situation/get_situation_data'),
// 	Router::add('situation/create', 'situation/post_create'),
// 	Router::add('situation/edit/:id', 'situation/post_edit'),
// 	Router::add('situation/delete/:id', 'situation/delete_situation'),
// );