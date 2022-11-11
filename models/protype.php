<?php
    class Protype extends Db{
        public function getAllProtype(){
            $sql = self::$connection->prepare("SELECT * FROM protypes");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }

        public function getTop3Protype(){
            $sql = self::$connection->prepare("SELECT * FROM `protypes` WHERE type_id = 1 OR type_id = 2 OR type_id = 3");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
    }
?>