package com;

import java.sql.*;

public class Order {
	
	public Connection connect() 
	{ 
		 Connection con = null; 
		 
		 try 
		 { 
			 Class.forName("com.mysql.jdbc.Driver"); 
			 con= DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/order_service", "root", "12345"); 
			 //For testing
			 System.out.print("Successfully connected"); 
		 } 
		 catch(Exception e) 
		 { 
			 e.printStackTrace(); 
		 } 
		 
		 return con; 
	}
	
	public String insertOrders(String pid, String pname, String date, String bname)
	{ 
		String output = ""; 
		try
		{ 
			Connection con = connect(); 
			if (con == null) 
			{ 
				return "Error while connecting to the database"; 
			} 
			// create a prepared statement
			String query = " insert into orders (`OrderID`,`ProductID`,`ProductName`,`Date`,`BuyerName`)"
					 + " values (?, ?, ?, ?, ?)"; 
			 PreparedStatement preparedStmt = con.prepareStatement(query); 
			 // binding values
			 preparedStmt.setInt(1, 0); 
			 preparedStmt.setString(2, pid); 
			 preparedStmt.setString(3, pname); 
			 preparedStmt.setString(4, date); 
			 preparedStmt.setString(5, bname); 
			 //execute the statement
			 preparedStmt.execute(); 
			 con.close(); 
			 
			 String newOrders = readOrders(); 
			 output = "{\"status\":\"success\", \"data\": \""
					 + newOrders + "\"}";
			 
		} 
		catch (Exception e) 
		{ 
		 output =  "{\"status\":\"error\", \"data\":  \"Error while inserting the order.\"}";  
		 System.err.println(e.getMessage()); 
		} 
	return output; 
	}
	
	public String readOrders()
	{ 
		String output = ""; 
		try
		{ 
			Connection con = connect(); 
			if (con == null) 
			{ 
				return "Error while connecting to the database for reading."; 
			} 
			
	 // Prepare the html table to be displayed
	 output = "<table border='1' class= 'table table-striped'><tr class= 'table-primary' ><th>Product ID</th>" 
	 +"<th>Product Name</th><th>Date</th>"
	 + "<th>Buyer Name</th>" 
	 + "<th>Update</th><th>Remove</th></tr>"; 
	 
	 String query = "select * from orders"; 
	 Statement stmt = con.createStatement(); 
	 ResultSet rs = stmt.executeQuery(query); 
	 // iterate through the rows in the result set
	 while (rs.next()) 
	 { 
		 String OrderID = Integer.toString(rs.getInt("OrderID")); 
		 String ProductID = rs.getString("ProductID"); 
		 String ProductName = rs.getString("ProductName"); 
		 String Date = rs.getString("Date"); 
		 String BuyerName = rs.getString("BuyerName"); 
		 
		 // Add a row into the html table
		 // changed
		 output += "<tr><td><input id='hidOrderIDUpdate' name= 'hidOrderIDUpdate' type ='hidden' value ='" + OrderID + "'>" + ProductID +"</td>";
		 //output += "<tr><td>" + ProductID + "</td>";
		 output += "<td>" + ProductName + "</td>"; 
		 output += "<td>" + Date + "</td>"; 
		 output += "<td>" + BuyerName + "</td>";
		 
		 // buttons
		 output  += "<td><input name='btnUpdate' type='button' value='Update' "
				 + "class='btnUpdate btn btn-danger' data-OrderID='" + OrderID + "'></td>"
				 + "<td><input name = 'btnRemove' type ='button' value ='Remove' "
				 + "class ='btnRemove btn btn-danger' date-OrderID ='" + OrderID + "'>"
				 + "</td></tr>"; 
	 } 
	 con.close(); 
	 
	 // Complete the html table
	 output += "</table>"; 
	 } 
	catch (Exception e) 
	{ 
		output = "Error while reading the orders."; 
		System.err.println(e.getMessage()); 
	} 
	return output; 
}
	

	public String deleteOrders(String ID)
	{ 
		String output = ""; 
		try
		{ 
			Connection con = connect(); 
			if (con == null) 
			{ 
				return "Error while connecting to the database for deleting."; 
			} 
			 // create a prepared statement
			 String query = "delete from orders where OrderID=?"; 
			 PreparedStatement preparedStmt = con.prepareStatement(query); 
			 // binding values
			 preparedStmt.setInt(1, Integer.parseInt(ID)); 
			 
			 // execute the statement
			 preparedStmt.execute(); 
			 con.close(); 
			
			 String newOrders = readOrders(); 
			 output = "{\"status\":\"success\", \"data\": \"" + 
					 newOrders + "\"}"; 
			 
		} 
		catch (Exception e) 
		{ 
			 output = "{\"status\":\"error\", \"data\": \"Error while deleting the order.\"}";
			 System.err.println(e.getMessage()); 
		} 
	return output; 
	}
	
	public String updateOrders(String oid, String pid, String pname, String date, String bname) 
	{ 
		String output = ""; 
		try
		{ 
			Connection con = connect(); 
			if (con == null) 
			{ 
				return "Error while connecting to the database for updating."; 
			} 
			
			// create a prepared statement
			String query = "UPDATE orders SET ProductID=?,ProductName=?,Date=?,BuyerName=? WHERE OrderID=?"; 
			PreparedStatement preparedStmt = con.prepareStatement(query); 
			 
			// binding values
			preparedStmt.setString(1, pid); 
			preparedStmt.setString(2, pname); 
			preparedStmt.setString(3, date); 
			preparedStmt.setString(4, bname); 
			preparedStmt.setInt(5, Integer.parseInt(oid)); 
			 
			// execute the statement
			preparedStmt.execute(); 
			con.close();  
			String newOrders = readOrders(); 
			 output = "{\"status\":\"success\", \"data\": \"" + 
					 newOrders + "\"}"; 
		} 
		
		catch (Exception e) 
		{ 
			output = "{\"status\":\"error\", \"data\": \"Error while updating the order.\"}"; 
			System.err.println(e.getMessage()); 
		} 
		return output; 
	}

}
