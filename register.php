<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REGITSTER</title>
    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }

        .box-login{
            position: relative;
            width: 100%;
            height: 100vh;
            background-image: linear-gradient(400deg, #ef8834, #abc123);
        }
        .box-login .login{
            width: 500px;
            height: 550px;
            position: absolute;
            display: inline-block;
            background: #fff;
            border-radius: 30px;
            padding: 30px 50px;
            text-align: center;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
        }
        input{
            width: 100%;
            padding: 20px 10px;
            margin: 10px 0;
            font-size: 20px;
        }
        h1{
            font-size: 50px;
            padding-bottom: 30px;
        }
        p{
            text-align: left;
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <div class="box-login">
        <div class="login">
            <form action="regitster_submit.php" method="post">
                <h1>Register</h1>
                <input type="text" name="username" placeholder="Username...">
                <br>
                <input type="password" name="password" placeholder="Password...">
                <br>
                <input type="password" name="repassword" placeholder="Password verification...">
                <br>
                <p>Đã có tài khoản <a href="login.php">ấn vào đây</a></p>
                <input type="submit" name="submit" value="register">
            </form>
        </div>
    </div>
</body>
</html>