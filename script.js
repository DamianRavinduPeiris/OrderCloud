clearAll();
showCustomers();

function clearAll() {
    /*Hid the heading Item Manager.*/
    $("#heading2").css("display", "none");

    /*Hid the heading Item Manager - buttons.*/
    $(".buttonContainer2").css("display", "none");

    /*Hid the heading Item Manager - Table.*/
    $("#itemTable").css("display", "none");

    /*Hid the heading Order Manager.*/
    $("#heading3").css("display", "none");

    /*Hid the heading Order Manager - buttons.*/
    $(".buttonContainer3").css("display", "none");

    /*Hid the heading Item Manager - Table.*/
    $("#orderTable").css("display", "none");

    /*Hid the heading Invoice Manager.*/
    $("#heading4").css("display", "none");

    /*Hid the Invoice container.*/
    $(".invoiceContainer").css("display", "none");


    /*Hid the heading Invoice Manager.*/
    $("#heading1").css("display", "none");

    /*Hid the Invoice container.*/
    $(".buttonContainer").css("display", "none");

    /*Hid the Customer table.*/
    $("#customerTable").css("display", "none");

}


/*Button actions.*/

/*Home Button.*/
$("#homeButton").on("click", function () {
    window.location.reload();
});

/*Managing Customers.*/
$("#manageCustomers").on("click", function () {
    clearAll()
    showCustomers();
});
/*Managing Items.*/

$("#manageItems").on("click", function () {
    clearAll();
    showItems();


});

function showCustomers() {
    /*Shows the heading Item Manager.*/
    $("#heading1").css("display", "block");

    /*Shows the heading Item Manager - buttons.*/
    $(".buttonContainer").css("display", "flex");

    /*Shows the heading Item Manager - Table.*/
    $("#customerTable").css("display", "inline-table");

}

function showItems() {
    /*Shows the heading Item Manager.*/
    $("#heading2").css("display", "block");

    /*Shows the heading Item Manager - buttons.*/
    $(".buttonContainer2").css("display", "flex");

    /*Shows the heading Item Manager - Table.*/
    $("#itemTable").css("display", "inline-table");
    /*Adjusting the CSS.*/
    $("#heading2").position("position", "relative");
    $("#heading2").css("top", "150px");
    $(".buttonContainer2").css("position", "relative");
    $(".buttonContainer2").css("top", "150px");
    $("#itemTable").css("position", "relative");
    $("#itemTable").css("top", "200px");

}

function showOrders() {
    /*Shows the heading Item Manager.*/
    $("#heading3").css("display", "block");

    /*Shows the heading Item Manager - buttons.*/
    $(".buttonContainer3").css("display", "flex");

    /*Shows the heading Item Manager - Table.*/
    $("#orderTable").css("display", "inline-table");
    /*Adjusting the CSS.*/
    $("#heading3").position("position", "relative");
    $("#heading3").css("top", "100px");
    $(".buttonContainer3").css("position", "relative");
    $(".buttonContainer3").css("top", "150px");
    $("#orderTable").css("position", "relative");
    $("#orderTable").css("top", "200px");

}

$("#manageOrders").on("click", function () {
    clearAll();
    showOrders();

});

function showInvoices() {
    /*Shows the heading Item Manager.*/
    $("#heading4").css("display", "block");

    /*Shows the heading Item Manager - Table.*/
    $(".invoiceContainer").css("display", "flex");
    /*Adjusting the CSS.*/
    $("#heading4").position("position", "relative");
    $("#heading4").css("top", "100px");
    $(".buttonContainer4").css("position", "relative");
    $(".buttonContainer4").css("top", "150px");
    $(".invoiceContainer").css("position", "relative");
    $(".invoiceContainer").css("top", "200px");
}

$("#manageInvoices").on("click", function () {
    clearAll();
    showInvoices();

});

/*Functionalities.*/

const data = "CustomerData"; //This is the key value for local storage.
let custArray = [];
const clearTable = () => {
    $("#customerTable tbody").empty();
}

function addToTable() {
    clearTable();
    if (JSON.parse(localStorage.getItem(data))) {
        custArray = JSON.parse(localStorage.getItem(data));
        for (let i = 0; i < custArray.length; i++) {
            $("#customerTable tbody").append("<tr><td>" + custArray[i].customer_id + "</td><td>" + custArray[i].customer_name + "</td><td>" + custArray[i].customer_address + "</td><td>" + "Rs." + custArray[i].customer_salary + "</td></tr>");
        }
    } else {
        swal("OOPS!", "No data to display!", "warning");
    }

}

$("#customerAddButton").on("click", function () {
    var customer = {
        customer_id: $("#cId").val(),
        customer_name: $("#cName").val(),
        customer_address: $("#cAddress").val(),
        customer_salary: $("#cSalary").val()
    }

    custArray.push(customer);
    updateLocalStorage(custArray);
    addToTable();
    swal("DONE!", "Customer added successfully!💡", "success");
});

addToTable(); //Initial loading of the table.

//Clears the local storage when the user presses the "ctrl+d".👇
$(document).on('keydown', function (event) {
    if (event.ctrlKey && event.which === 68) {
        localStorage.clear();
        alert("Local storage cleared!");
        window.location.reload();
    }

});

$("#customerTable tbody tr").on("click", function () {
    //Collecting the data to an object.
    var customerData = {
        customer_id: $(this).find("td:eq(0)").text(),
        customer_name: $(this).find("td:eq(1)").text(),
        customer_address: $(this).find("td:eq(2)").text(),
        customer_salary: $(this).find("td:eq(3)").text()
    }

    //Triggering the update button and setting the values.
    $("#updateCustomerButton").trigger("click");
    //Setting the data to the input fields.
    $("#uCId").val(customerData.customer_id);
    $("#uCName").val(customerData.customer_name);
    $("#uCAddress").val(customerData.customer_address);
    $("#uCSalary").val(customerData.customer_salary);

    //Removing the table row.
    $(this).remove();


});

//Finding the array element number of the customer object.
const findId = (value) => {
    for (let i = 0; i < custArray.length; i++) {
        if (custArray[i].customer_id === $(value).val()) {
            return i;
        }
    }
}
$("#updateCustomerButton").on("click",function (){
    updateCustomer();

});
$("#cUpdateButton").on("click", function() {
    updateCustomer();

});
function updateCustomer(){
    var updatedCustomerData = {
        customer_id: $("#uCId").val(),
        customer_name: $("#uCName").val(),
        customer_address: $("#uCAddress").val(),
        customer_salary: $("#uCSalary").val()
    }
    //Updating the customer array.
    custArray[findId("#uCId")] = updatedCustomerData;
    //Updating the local storage.
    updateLocalStorage(custArray);
    //Updating the local storage.
    addToTable();
    swal("DONE!", "Customer updated successfully!💡", "success");

}
function updateLocalStorage(customerArray){
    localStorage.setItem(data, JSON.stringify(customerArray));//Saving the customer array to the local storage.
}
$("#deleteCustomer").on("click",function (){
    //Deleting the customer from the array.
   custArray.splice(findId("#dCId"),1);
   //Updating the local storage.
    updateLocalStorage(custArray);
    //Updating the table.
    addToTable();
    swal("Done!", "🚨 Customer deleted successfully!", "success");

});
$("#getAllCustomersButton").on("click", () => {
    swal("DONE!", "🚀 Successfully fetched the data!", "success").then(() => {
        window.location.reload();
    });
});

