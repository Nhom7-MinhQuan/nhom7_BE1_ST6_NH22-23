<?php
require "refig.php";
if (isset($_POST['submit']) && $_POST['username'] != '' && $_POST['password'] != '' && $_POST['repassword'] != '') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $role_id=0;
    if ($password != $repassword) {
        header("location:register.php");
    }
    $sql="SELECT * FROM users WHERE username='$username'";
    $old = mysqli_query($conn,$sql);
    $password=md5($password);
    if (mysqli_num_rows($old)>0) {
        header("location:register.php");
    }
    $sql="INSERT INTO users (username,password) VALUES ('$username','$password')";
    mysqli_query($conn,$sql);
    echo "Bạn Đã Đăng Kí Thành Công";
}else {
    header("location:register.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        a{
            text-decoration:none;
            color: pink;
        }
        button{
            padding: 7px;
        }
    </style>
</head>
<body>
    <button>
        <a href="login.php">LOGIN</a>
    </button>
</body>
</html>