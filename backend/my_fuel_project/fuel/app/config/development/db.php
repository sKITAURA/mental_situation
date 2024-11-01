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

/**
 * -----------------------------------------------------------------------------
 *  Database settings for development environment
 * -----------------------------------------------------------------------------
 *
 *  These settings get merged with the global settings.
 *
 */

return array(
    'default' => array(
        'type'       => 'mysqli',
        'connection' => array(
            'hostname'   => 'docker-db-1',  // MySQLコンテナ名を使用
            'database'   => 'mental_situation',
            'username'   => 'root',
            'password'   => 'root',
            'persistent' => false,
        ),
        'charset'    => 'utf8',
        'table_prefix' => '',
        'enable_cache' => true,
        'profiling'    => false,
    ),
);