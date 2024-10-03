<?php

namespace Fuel\Migrations;

class Create_situations
{
	public function up()
	{
		\DBUtil::create_table('situations', array(
			'id' => array('type' => 'int', 'unsigned' => true, 'null' => false, 'auto_increment' => true, 'constraint' => 11),
			'date' => array('null' => false, 'type' => 'date'),
			'situation' => array('constraint' => 5, 'null' => false, 'type' => 'varchar'),
			'reason' => array('constraint' => 50, 'null' => false, 'type' => 'char'),
			'solution' => array('constraint' => 50, 'null' => false, 'type' => 'char'),
			'created_at' => array('constraint' => 11, 'null' => true, 'type' => 'int', 'unsigned' => true),
			'updated_at' => array('constraint' => 11, 'null' => true, 'type' => 'int', 'unsigned' => true),
		), array('id'));
	}

	public function down()
	{
		\DBUtil::drop_table('situations');
	}
}