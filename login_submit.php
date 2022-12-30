<?php
include "refig.php";
if(isset($_POST['submit']) && $_POST['username'] != '' && $_POST['password'] != ''){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $password=md5($password);
    $sql="SELECT * FROM users WHERE username='$username' AND password='$password'";
    $users=mysqli_query($conn,$sql);
    if(mysqli_num_rows($users)>0){
        if ($_POST['username'] == 'admin1' || $_POST['username'] == 'admin2' ){
            header("location:admin/index.php?admin=ad");
        }
        else {
            header("location:index.php");
        }
        
    }
    else {
        # code...
        header("location:login.php");
    }
}
else {
    header("location:login.php");
}
?>