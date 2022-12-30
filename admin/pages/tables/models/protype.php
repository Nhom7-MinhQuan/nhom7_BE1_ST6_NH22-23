<?php
    class Protype extends Db{
        public function getAllProtype(){
            $sql = self::$connection->prepare("SELECT * FROM protypes");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
        public function delproduct($id){
            $sql = self::$connection->prepare("DELETE FROM `protypes` WHERE `type_id`=?");
            $sql->bind_param("i",$id);
            return $sql->execute(); //return an object
        }
        public function getTop3Protype(){
            $sql = self::$connection->prepare("SELECT * FROM `protypes` WHERE type_id = 1 OR type_id = 2 OR type_id = 3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
        
        public function getProtypeId($id){
            $sql = self::$connection->prepare("SELECT * FROM `protypes` WHERE type_id = ?");
            $sql->bind_param("i", $id);
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
        public function addprotype($name,$image){
            $sql = self::$connection->prepare("INSERT INTO `protypes`(`type_name`, `type_image`) VALUES (?,?)");
            $sql->bind_param("ss",$name,$image);
            return $sql->execute(); //return an object
        }
    }
?>