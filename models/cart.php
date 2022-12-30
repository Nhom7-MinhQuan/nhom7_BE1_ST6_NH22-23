<?php
    class Cart extends Db{
        public function getAllCart(){
            $sql = self::$connection->prepare("SELECT * FROM `cart`, `products` WHERE `cart`.`id` = `products`.`id`");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
        public function them($id, $qty, $total){
            $sql = self::$connection->prepare("INSERT INTO `cart`(`id`, `qty`, `total`) VALUES (?, ?, ?)");
            $sql->bind_param("iii", $id, $qty, $total);
            $sql->execute(); //return an object
        }
        public function xoa($id_cart){
            $sql = self::$connection->prepare("DELETE FROM `cart` WHERE `id_cart` = $id_cart");
            $sql->execute(); //return an object
        }
        public function sua($id_cart, $qty, $total){
            $sql = self::$connection->prepare("UPDATE `cart` SET `qty`= ?,`total`= ? WHERE `id_cart` = ?");
            $sql->bind_param("iii", $qty, $total, $id_cart);
            $sql->execute(); //return an object
        }
    }
?>