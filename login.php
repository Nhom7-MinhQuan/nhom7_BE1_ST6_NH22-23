<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
            background-image: linear-gradient(120deg, #ef8834, #abc123);
        }
        .box-login .login{
            width: 500px;
            height: 500px;
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
            <form action="login_submit.php" method="post">
                <h1>Login</h1>
                <input type="text" name="username" id="username" placeholder="Username...">
                <br>
                <input type="password" name="password" id="password" placeholder="Password...">
                <br>
                <p>Chưa có tài khoản <a href="register.php">ấn vào đây</a></p>
                <input type="submit" name="submit" value="Enter">
            </form>
        </div>
    </div>
</body>
</html>