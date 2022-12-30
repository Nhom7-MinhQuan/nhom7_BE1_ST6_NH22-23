<?php
    class Manufactures extends Db{
        public function getAllManufactures(){
            $sql = self::$connection->prepare("SELECT * FROM manufactures ");
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
        public function delmanufactures($manu_id){
            $sql = self::$connection->prepare("DELETE FROM `manufactures` WHERE `manu_id`=?");
            $sql->bind_param("i",$manu_id);
            return $sql->execute(); //return an object
        }
        
        public function addmanufactures($name){
            $sql = self::$connection->prepare("INSERT INTO `manufactures`(`manu_name`)
            VALUES (?)");
            $sql->bind_param("s",$name);
            return $sql->execute(); //return an object
        }

        public function editmanufactures($manu_name){
            if($manu_name != ""){
                $sql=self::$connection->prepare("UPDATE `manufactures` 
                SET `manu_name`=? 
                WHERE `manu_id`=?");
                $sql->bind_param("s",$manu_name);
            }
            else{
                $sql=self::$connection->prepare("UPDATE `products` 
                SET `manu_name`=? 
                WHERE `manu_id`=?");
                var_dump("");
                $sql->bind_param("s",$manu_name);
            }
            
            return $sql->execute(); //return an object
        }
     
        public function getManufacturesByManuid($manu_id)
        {
            $sql = self::$connection->prepare("SELECT * FROM manufactures WHERE manu_id = ?");
            $sql->bind_param("i",$manu_id);
            $sql->execute(); //return an object
            $items = array();
            $items = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
            return $items; //return an array
        }
    }
?>