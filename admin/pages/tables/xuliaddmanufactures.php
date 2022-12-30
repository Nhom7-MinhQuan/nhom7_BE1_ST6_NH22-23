<?php
require 'config.php';
require 'models/db.php';
require 'models/manufactures.php';
$manufactures = new Manufactures();
$name=$_POST['name'];
$manufactures->addmanufactures($name);
header('location:manufacture.php');