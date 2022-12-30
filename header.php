<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		 <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

		<title>Electro - HTML Ecommerce Template</title>

		<!-- Google font -->
		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">

		<!-- Bootstrap -->
		<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css"/>

		<!-- Slick -->
		<link type="text/css" rel="stylesheet" href="css/slick.css"/>
		<link type="text/css" rel="stylesheet" href="css/slick-theme.css"/>

		<!-- nouislider -->
		<link type="text/css" rel="stylesheet" href="css/nouislider.min.css"/>

		<!-- Font Awesome Icon -->
		<link rel="stylesheet" href="css/font-awesome.min.css">

		<!-- Custom stlylesheet -->
		<link type="text/css" rel="stylesheet" href="css/style.css"/>

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

    </head>
	<body>
		<!-- HEADER -->
		<header>
			<!-- TOP HEADER -->
			<div id="top-header">
				<div class="container">
					<ul class="header-links pull-left">
						<li><a href="#"><i class="fa fa-phone"></i> +08 4321 1589</a></li>
						<li><a href="#"><i class="fa fa-envelope-o"></i> Nhom7@email.com</a></li>
						<li><a href="#"><i class="fa fa-map-marker"></i> TDC</a></li>
					</ul>
					<ul class="header-links pull-right">
						<li><a href="#"><i class="fa fa-dollar"></i> USD</a></li>
						<li><a href="login.php"><i class="fa fa-user-o"></i> Login</a></li>
					</ul>
				</div>
			</div>
			<!-- /TOP HEADER -->

			<!-- MAIN HEADER -->
			<div id="header">
				<!-- container -->
				<div class="container">
					<!-- row -->
					<div class="row">
						<!-- LOGO -->
						<div class="col-md-3">
							<div class="header-logo">
								<a href="#" class="logo">
									<img src="./img/logo.png" alt="">
								</a>
							</div>
						</div>
						<!-- /LOGO -->

						<!-- SEARCH BAR -->
						<div class="col-md-6">
							<div class="header-search">
								<form action="store.php?id=<?php if (isset($_GET['search'])) {
									$_GET['search'];
								}?>" method="get">
									<select class="input-select">
										<option value="0">All Categories</option>
										<option value="1">Category 01</option>
										<option value="1">Category 02</option>
									</select>
									<input type="hidden" name="page" value="0">
									<input class="input" name="keyword" placeholder="Search here" >
									<button class="search-btn">Search</button>
								</form>
							</div>
						</div>
						<!-- /SEARCH BAR -->

						<!-- ACCOUNT -->
						<div class="col-md-3 clearfix">
							<div class="header-ctn">
								<!-- Wishlist -->
								<div>
									<a href="#">
										<i class="fa fa-heart-o"></i>
										<span>Your Wishlist</span>
										<div class="qty">2</div>
									</a>
								</div>
								<!-- /Wishlist -->

								<!-- Cart -->
								<?php
									require "config.php";
									require "models/db.php";
									require "models/cart.php";
									$cart = new Cart();
									$getAllCart = $cart->getAllCart();
									$qty = 0;
									$total = 0;
									foreach ($getAllCart as $value) {
										# code...
										$qty += $value['qty'];
										$total += $value['total'];
									}
								?>
								<div class="dropdown">
									<a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" >
										<i class="fa fa-shopping-cart"></i>
										<span>Your Cart</span>
										<div class="qty"><?php echo $qty; ?></div>
									</a>
									<div class="cart-dropdown">
										<div class="cart-list">
								<?php

									foreach ($getAllCart as $value) {
										# code...
									
								?>
											<div class="product-widget">
												<div class="product-img">
													<img src="./img/<?php echo $value['image']; ?>" alt="">
												</div>
												<div class="product-body">
													<h3 class="product-name"><a href="#"><?php echo $value['name']; ?></a></h3>
													<h4 class="product-price"><span class="qty"><?php echo $value['qty']; ?>x </span> <?php echo number_format($value['total']).' VND'; ?></h4>
												</div>
												<form action="xulycart.php" method="get">
													<?php
														if (isset($_GET['pro'])) {
															# code...
															echo '<input type="hidden" name="pro" value="0">';
														}
													?>
													<input type="hidden" name="xoa" value="0">
													<input type="hidden" name="id" value="<?php echo $value['id']; ?>">
													<input type="hidden" name="id_cart" value="<?php echo $value['id_cart']; ?>">
													<button class="delete"><i class="fa fa-close"></i></button>
												</form>
											</div>
									<?php
									}
									?>
										</div>
										<div class="cart-summary">
											<small><?php echo $qty; ?> Item(s) selected</small>
											<h5>SUBTOTAL: <?php echo number_format($total).' VND'; ?></h5>
										</div>
										<div class="cart-btns">
											<a href="blank.php">View Cart</a>
											<a href="checkout.php">Checkout  <i class="fa fa-arrow-circle-right"></i></a>
										</div>
									</div>
								</div>
								<!-- /Cart -->

								<!-- Menu Toogle -->
								<div class="menu-toggle">
									<a href="#">
										<i class="fa fa-bars"></i>
										<span>Menu</span>
									</a>
								</div>
								<!-- /Menu Toogle -->
							</div>
						</div>
						<!-- /ACCOUNT -->
					</div>
					<!-- row -->
				</div>
				<!-- container -->
			</div>
			<!-- /MAIN HEADER -->
		</header>
		<!-- /HEADER -->

		<!-- NAVIGATION -->
		<nav id="navigation">
			<!-- container -->
			<div class="container">
				<!-- responsive-nav -->
				<div id="responsive-nav">
					<!-- NAV -->
					<ul class="main-nav nav navbar-nav">
						<li class="active"><a href="index.php">Home</a></li>
						<?php
							require "models/protype.php";
							$protype = new Protype;
							$getAllProtype = $protype->getAllProtype();
							foreach ($getAllProtype as $value) {
							
						?>
							<li><a href="store.php?id=<?php echo $value['type_id']; ?>&page=0"><?php echo $value['type_name']; ?></a></li>
						<?php
					 		} 
					 	?>
					</ul>
					<!-- /NAV -->
				</div>
				<!-- /responsive-nav -->
			</div>
			<!-- /container -->
		</nav>
		<!-- /NAVIGATION -->
