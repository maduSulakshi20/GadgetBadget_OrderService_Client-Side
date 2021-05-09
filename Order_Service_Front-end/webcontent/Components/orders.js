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
 $("#formOrder").submit(); 
}); 

// UPDATE========================================================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
 $("#hidOrderIDSave").val($(this).closest("tr").find('#hidOrderIDUpdate').val()); 
 $("#ProductID").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#ProductName").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#Date").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#BuyerName").val($(this).closest("tr").find('td:eq(3)').text()); 
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