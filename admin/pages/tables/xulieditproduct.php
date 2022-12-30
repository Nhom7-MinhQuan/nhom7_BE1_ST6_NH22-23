<?php
require 'config.php';
require 'models/db.php';
require 'models/product.php';
$product = new Product();
$name=$_POST['name'];
$manu_id=$_POST['manu'];
$type_id=$_POST['type'];
$price=$_POST['price'];
$image=$_FILES['image']['name'];
$description=$_POST['description'];
$feature=isset($_POST['feature'])?1:0;
$id=$_POST['id'];
$product->editproduct($name,$manu_id,$type_id,$price,$image,$description,$feature,$id);
$target_dir = "img/";
$target_file = $target_dir.basename($_FILES["image"]["name"]);
move_uploaded_file($_FILES['image']['tmp_name'],$target_file);
header('location:product.php');