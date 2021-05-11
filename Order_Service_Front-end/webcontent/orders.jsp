<%@page import="com.Order"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Order Management</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/orders.js"></script>
<style>
body {
  background-color: #ffb3b3;
}
.form-group {
	border-style: solid;
	background-color : lightblue;
}
h1 {
	font-family: Arial;
	text-align: center;
}
</style>
</head>
<body>
<div class="container">
 <div class="row">
 	<div class="col">
	<h1 >Items Management</h1>
	<form id="formOrder" name="formOrder">
	<div class="form-group">
	<div class="col-sm-12">
	<br>
	Product ID: <input name="ProductID" id ="ProductID" type="text" class="form-control form-control-sm"><br>
	Product Name: <input name="ProductName" id ="ProductName" type="text" class="form-control form-control-sm"><br> 
	Date (YY-MM-DD): <input name="Date" id ="Date" type="text" class="form-control form-control-sm"><br> 
	Buyer Name: <input name="BuyerName" id ="BuyerName" type="text" class="form-control form-control-sm"><br>
	
	<input name="btnSave" id ="btnSave" type="button" value="Save" class="btn btn-outline-primary btn-block"> 
	<input type ="hidden" id="hidOrderIDSave" name="hidOrderIDSave" value = ""><br><br>
	</div>
	</div>
	</form>
	
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>
	<br>
	
	<div id="divOrdersGrid">
	<%
			 Order orderObj = new Order(); 
			 out.print(orderObj.readOrders()); 
	%>
	</div>
	
</div>
</div>
</div>

</body>
</html>