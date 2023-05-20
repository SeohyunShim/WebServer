<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link href="css/login.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="./javascript/login.js"></script>
<meta charset="UTF-8">
<title>Sign In</title>
</head>
<body>
	<div>
		<div class="left">
			<form id="form" name="form" method="post" action="login" onsubmit="return checkField();">
				<img class="left-top" src="img/login-top.png">
				<h1>Sign In</h1>
				<span>Make attendance management easy</span>
				<input id="userID" type="text" name="userID" placeholder="Enter your ID">
				<input id="userPW" type="password" name="userPW" placeholder="Enter your password">
				<button type="submit" id="Signin">Sign in</button>
			</form>
		</div>
		<div class="right">
	       	<img src="img/login-right.png">
	    </div>
	</div>
</body>
</html>