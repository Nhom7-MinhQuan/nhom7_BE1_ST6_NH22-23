<?php
    class Product extends Db{
        public function getAllProduct(){
            $sql = self::$connection->prepare("SELECT * FROM `products`");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getAllProductOfManu($id){
            $sql = self::$connection->prepare("SELECT * FROM `products`, `protypes` WHERE `products`.`manu_id` = ? AND `protypes`.`type_id` = `products`.`type_id`");
            $sql->bind_param("i", $id);
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getNewProduct(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id`  ORDER BY `products`.`created_at` DESC LIMIT 0,10");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTopSelling(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` ORDER BY `products`.`price` DESC LIMIT 0,10");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        
        public function getTopSellingOppo(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` AND `products`.`manu_id` = 2 ORDER BY `products`.`price` DESC LIMIT 0,3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTopSellingOppoNext(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` AND `products`.`manu_id` = 2 ORDER BY `products`.`price` DESC LIMIT 3,3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTopSellingApple(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` AND `products`.`manu_id` = 1 ORDER BY `products`.`price` DESC LIMIT 0,3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTopSellingAppleNext(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` AND `products`.`manu_id` = 1 ORDER BY `products`.`price` DESC LIMIT 3,3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTopSellingSamsung(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` AND `products`.`manu_id` = 3 ORDER BY `products`.`price` DESC LIMIT 0,3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTopSellingSamsungNext(){
            $sql = self::$connection->prepare("SELECT * FROM `products`,`protypes` WHERE `protypes`.`type_id` = `products`.`type_id` AND `products`.`manu_id` = 3 ORDER BY `products`.`price` DESC LIMIT 3,3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
        public function getProductBytype_Id($id)
        {
            $sql = self::$connection->prepare("SELECT * FROM products WHERE type_id = ?");
            $sql->bind_param("i",$id);
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

    }
?>