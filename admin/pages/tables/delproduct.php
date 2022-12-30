<?php
require 'config.php';
require 'models/db.php';
require 'models/product.php';
$product = new Product();
if(isset($_GET['id'])){
    $id=$_GET['id'];
    $product->delproduct($id);
    header('location:product.php');
}