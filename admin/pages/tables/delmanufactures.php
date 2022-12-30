<?php
require 'config.php';
require 'models/db.php';
require 'models/manufactures.php';
$manufactures = new Manufactures();
if (isset($_GET['id'])) {
    $manu_id= $_GET['id'];
    $manufactures->delmanufactures($manu_id);
    header('location:manufacture.php');
}