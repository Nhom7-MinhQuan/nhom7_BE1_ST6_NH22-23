<?php
    require "config.php";
    require "models/db.php";
    require "models/cart.php";

    $cart = new Cart();
    $getAllCart = $cart->getAllCart();
    if (isset($_GET['id'])) {
        # code...
        $id = $_GET['id']; 
    }
    if (isset($_GET['them'])) {
        # code...
        $qty = 1;
        $price = $_GET['price'];
        $check = true;
        foreach ($getAllCart as $value) {
            # code...
            if ($value['id'] == $id) {
                # code...
                $id_cart = $value['id_cart'];
                $qty = $value['qty'] + 1;
                $total = $qty * $price;
                $sua = $cart->sua($id_cart, $qty, $total);
                if (isset($_GET['pro'])) {
                    # code...
                    header('location:product.php?pro=0&id='.$id.'');
                }else {
                    # code...
                    header('location:index.php');
                }
                $check = false;
            }
        }
        if ($check == true) {
            # code...
            $total = $qty * $price;
            $them = $cart->them($id, $qty, $total);
            if (isset($_GET['pro'])) {
                # code...
                header('location:product.php?pro=0&id='.$id.'');
            }else {
                # code...
                header('location:index.php');
            }
        }
    }
    if (isset($_GET['xoa'])) {
        # code...
        $id_cart = $_GET['id_cart'];
        $xoa = $cart->xoa($id_cart);
        if (isset($_GET['pro'])) {
            # code...
            header('location:product.php?pro=0&id='.$id.'');
        }else {
            # code...
            header('location:index.php');
        }
    }

    if (isset($_GET['delete'])) {
        # code...
        $id_cart = $_GET['id_cart'];
        $xoa = $cart->xoa($id_cart);
        header('location:blank.php');
    }
    if (isset($_GET['edit'])) {
        # code...
        $price = $_GET['price'];
        $id_cart = $_GET['id_cart'];
        $qty = $_GET['qty'];
        $total = $qty * $price;
        $sua = $cart->sua($id_cart, $qty, $total);
        header('location:blank.php');
    }
?>