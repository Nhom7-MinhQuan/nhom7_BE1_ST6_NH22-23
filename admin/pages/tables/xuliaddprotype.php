<?php
require 'config.php';
require 'models/db.php';
require 'models/protype.php';
$product = new Protype();
$name=$_POST['name'];
$image=$_FILES['image']['name'];
$product->addprotype($name,$image);
$target_dir = "img/";
$target_file = $target_dir.basename($_FILES["image"]["name"]);
move_uploaded_file($_FILES['image']['tmp_name'],$target_file);
header('location:protypes.php');