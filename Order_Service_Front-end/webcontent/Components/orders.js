/** orders.js **/
$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 		$("#alertSuccess").hide(); 
    } 
 	$("#alertError").hide(); 
});
 
// SAVE =========================================================================
$(document).on("click", "#btnSave", function(event) 
{ 
 // Clear alerts------------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 

// Form validation-------------------
var status = validateOrderForm(); 
if (status != true) 
 { 
 	$("#alertError").text(status); 
 	$("#alertError").show(); 
 	return; 
 } 
 
 // If valid------------------------
 var type = ($("#hidOrderIDSave").val() == "") ? "POST" : "PUT"; 
 
 $.ajax( 
 { 
	 url : "OrdersAPI", 
	 type : type, 
	 data : $("#formOrder").serialize(), 
	 dataType : "text", 
	 complete : function(response, status) 
 	{ 
 		onOrderSaveComplete(response.responseText, status); 
 	} 
 }); 
 });
 // CLIENT-MODEL=================================================================
function validateOrderForm() 
{ 
	// Product ID
	if ($("#ProductID").val().trim() == "") 
 	{ 
 		return "Insert Product ID."; 
 	} 

	// Product NAME
	if ($("#ProductName").val().trim() == "") 
    { 
 		return "Insert Product Name."; 
 	} 

	// Date-------------------------------
	if ($("#Date").val().trim() == "") 
	{ 
		return "Insert Date."; 
	} 
	
	// BuyerName------------------------
	if ($("#BuyerName").val().trim() == "") 
	{ 
		return "Insert Buyer Name."; 
	}
return true; 
}

  //onOrderSaveComplete function
 function onOrderSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		if (resultSet.status.trim() == "success") 
		{ 
			 $("#alertSuccess").text("Successfully saved."); 
			 $("#alertSuccess").show(); 
			 $("#divOrdersGrid").html(resultSet.data); 
			 
 		} else if (resultSet.status.trim() == "error") 
 		{ 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
 		} 
 	} else if (status == "error") 
 	{ 
		 $("#alertError").text("Error while saving."); 
		 $("#alertError").show(); 
 	} else
 	{ 
		 $("#alertError").text("Unknown error while saving.."); 
		 $("#alertError").show(); 
 	} 
		 $("#hidOrderIDSave").val(""); 
		 $("#formItem")[0].reset(); 
} 

// UPDATE========================================================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
 //$("#hidOrderIDSave").val($(this).closest("tr").find('#hidOrderIDUpdate').val());
 $("#hidOrderIDSave").val($(this).data("OrderID")); 
 $("#ProductID").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#ProductName").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#Date").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#BuyerName").val($(this).closest("tr").find('td:eq(3)').text()); 
});

// Delete========================================================================
$(document).on("click", ".btnRemove", function(event)
{ 
	 $.ajax( 
	 { 
 		url : "OrdersAPI", 
 		type : "DELETE", 
 		data : "OrderID=" + $(this).data("OrderID"),
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
			 onOrderDeleteComplete(response.responseText, status); 
 		} 
 	}); 
});

function onOrderDeleteComplete(response, status)
{ 
	if (status == "success") 
 	{ 
		 var resultSet = JSON.parse(response); 
		 if (resultSet.status.trim() == "success") 
 		 { 
			 $("#alertSuccess").text("Successfully deleted."); 
			 $("#alertSuccess").show(); 
			 $("#divOrdersGrid").html(resultSet.data); 
 		} else if (resultSet.status.trim() == "error") 
 		{ 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
 		} 
 	} else if (status == "error") 
 	{ 
		 $("#alertError").text("Error while deleting."); 
		 $("#alertError").show(); 
 	} else
 	{ 
		 $("#alertError").text("Unknown error while deleting.."); 
		 $("#alertError").show(); 
 	} 
 }