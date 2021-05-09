<%@page import="com.Order"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%
if (request.getParameter("ProductID") != null) 
{ 

	 Order orderObj = new Order(); 
	 String stsMsg = "" ;
	 
	 //Insert..........................................................
	 if (request.getParameter("hidOrderIDSave") == "")
	 {
	 	stsMsg = orderObj.insertOrders(request.getParameter("ProductID"), 
					 	 request.getParameter("ProductName"), 
						 request.getParameter("Date"), 
						 request.getParameter("BuyerName")); 
	 } 
	 else//Update----------------------
	 {
		 stsMsg = orderObj.updateOrders(request.getParameter("hidOrderIDSave"),
		 	 request.getParameter("ProductID"), 
			 request.getParameter("ProductName"), 
			 request.getParameter("Date"), 
			 request.getParameter("BuyerName")); 
	 }
	
	 session.setAttribute("statusMsg", stsMsg);
} 


//Delete........................
if (request.getParameter("hidOrderIDDelete") != null)
{
	Order orderObj = new Order();
	String stsMsg = orderObj.deleteOrders(request.getParameter("hidOrderIDDelete"));
	session.setAttribute("statusMsg",stsMsg);
}
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/orders.js"></script>
    
<title>Order Management</title>
</head>
<body>
<div class="container">
 <div class="row">
 	<div class="col">
	<h1>Items Management</h1>
	<form method="post" action="orders.jsp" id="formOrder" name="formOrder">
	<div class="col-sm-10">
	Product ID: <input name="ProductID" id ="ProductID" type="text" class="form-control form-control-sm"><br>
	Product Name: <input name="ProductName" id ="ProductName" type="text" class="form-control form-control-sm"><br> 
	Date:(YY-MM-DD) <input name="Date" id ="Date" type="text" class="form-control form-control-sm"><br> 
	Buyer Name: <input name="BuyerName" id ="BuyerName" type="text" class="form-control form-control-sm"><br>
	
	<input name="btnSave" id ="btnSave" type="button" value="Save" class="btn btn-outline-primary"> 
	<input type ="hidden" id="hidOrderIDSave" name="hidOrderIDSave" value = "">
	</div>
	</form>
	
	<div class="alert alert-light">
 		<% 
 		out.print(session.getAttribute("statusMsg"));
 		%>
	</div>
	
	<br>
	
	<%
	//Read Oeders
	 Order orderObj = new Order(); 
	 out.print(orderObj.readOrders()); 
	%>
	
	</div>
 </div>
</div>
	
	
</body>
</html>