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
    addToItemTable();//Initial loading of the table.

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


/*Functionalities.*/
/*Customer management - Start.*/
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
        swal("DONE!", "Local storage cleared successfully!💡", "success");
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
        if (custArray[i].customer_id == $(value).val()) {
            return i;
        }
    }
    return -1;
}
const findCustName = (value) => {
    for (let i = 0; i < custArray.length; i++) {
        if (custArray[i].customer_name == $(value).val()) {
            return i;
        }
    }
    return -1;
}

$("#cUpdateButton").on("click", function () {
    updateCustomer();

});

function updateCustomer() {
    var updatedCustomerData = {
        customer_id: $("#uCId").val(),
        customer_name: $("#uCName").val(),
        customer_address: $("#uCAddress").val(),
        customer_salary: $("#uCSalary").val()
    }
    //Updating the customer array.
    let elementNo = findId("#uCId");
    if (elementNo != -1) {
        custArray[elementNo] = updatedCustomerData;
        //Updating the local storage.
        updateLocalStorage(custArray);
        //Updating the local storage.
        addToTable();
        swal("DONE!", "Customer updated successfully!💡", "success");
    } else {
        invalidData();
    }

}

function updateLocalStorage(customerArray) {
    localStorage.setItem(data, JSON.stringify(customerArray));//Saving the customer array to the local storage.
}

$("#deleteCustomer").on("click", function () {
    //Deleting the customer from the array.
    let elementNo = findId("#dCId");
    if (elementNo != -1) {
        custArray.splice(findId("#dCId"), 1);
        //Updating the local storage.
        updateLocalStorage(custArray);
        //Updating the table.
        addToTable();
        swal("Done!", "🚨 Customer deleted successfully!", "success");

    } else {
        invalidData();
    }


});

function fetchData() {
    swal("DONE!", "🚀 Successfully fetched the data!", "success").then(() => {
        window.location.reload();
    });


}

$("#getAllCustomersButton").on("click", () => {
    fetchData();

});
$("#csButton").on("click", function () {
    $("#infoBody").empty();//Clearing the info modal.
    event.preventDefault();//Prevents refreshing.
    //Finding the customer object from the custArray and appending to the #infoBody div.
    let elementNo = findId("#cidField");
    if (elementNo != -1) {
        $("#exampleModal").modal("show"); //Triggering the bootstrap modal.
        $("#exampleModalLabel").text("Customer Details.");
        $("#infoBody").append($("<h3></h3>").text("CUSTOMER ID : " + custArray[findId("#cidField")].customer_id));
        $("#infoBody").append($("<h3></h3>").text("CUSTOMER NAME : " + custArray[findId("#cidField")].customer_name));
        $("#infoBody").append($("<h3></h3>").text("CUSTOMER ADDRESS : " + custArray[findId("#cidField")].customer_address));
        $("#infoBody").append($("<h3></h3>").text("CUSTOMER SALARY : " + custArray[findId("#cidField")].customer_salary));
    } else {
        invalidData();
    }


});


/*Hiding the info modal.*/
$("#showInfo").css("display", "none");

/*Customer Management -  End.*/
/*Item Management -Start.*/
var itemArray = [];
const itemData = "ItemData";

function clearItemTable() {
    $("#itemTable tbody").empty();
}

addToItemTable();//Initial loading of the table.
function addToItemTable() {
    clearItemTable();
    if (localStorage.getItem(itemData)) {
        itemArray = JSON.parse(localStorage.getItem(itemData));
        for (let i = 0; i < itemArray.length; i++) {
            $("#itemTable tbody").append("<tr><td>" + itemArray[i].item_Id + "</td><td>" + itemArray[i].item_Name + "</td><td>" + itemArray[i].item_qty + "</td><td>" + itemArray[i].item_price + "</td></tr>");
        }
    }
}

function updateItemLocalStorage(itemArray) {
    localStorage.setItem(itemData, JSON.stringify(itemArray));//Saving the customer array to the local storage.

}

$("#itemAddButton").on("click", function () {
    var itemData = {
        item_Id: $("#iId").val(),
        item_Name: $("#iName").val(),
        item_price: $("#iPrice").val(),
        item_qty: $("#iQty").val()
    }
    itemArray.push(itemData);//Adding the item to the array.
    updateItemLocalStorage(itemArray);//Updating the local storage.
    addToItemTable();//Updating the table.
    swal("DONE!", "Item added successfully!💡", "success");


});
$("#itemTable").on("click", "tbody tr", function () {
    var itemData = {
        item_id: $(this).find("td:eq(0)").text(),
        item_name: $(this).find("td:eq(1)").text(),
        item_price: $(this).find("td:eq(3)").text(),
        item_qty: $(this).find("td:eq(2)").text()

    };
    $("#updateItemButton").trigger("click");
    $("#uIid").val(itemData.item_id);
    $("#uIname").val(itemData.item_name);
    $("#uIprice").val(itemData.item_price);
    $("#uIqty").val(itemData.item_qty);
    $(this).remove();//Removing the table row.


});


function findItemElementNo(value) {
    for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i].item_Id === $(value).val()) {
            return i;
        }
    }
    return -1;
}

$("#updatedItemsButton").on("click", function () {
    var updatedItemData = {
        item_Id: $("#uIid").val(),
        item_Name: $("#uIname").val(),
        item_price: $("#uIprice").val(),
        item_qty: $("#uIqty").val()
    }
    //Updating the item array.
    let elementNo = findItemElementNo("#uIid")
    if (elementNo != -1) {
        itemArray[elementNo] = updatedItemData;
        //Updating the local storage.
        updateItemLocalStorage(itemArray);
        //Updating the table.
        addToItemTable();
        swal("DONE!", "Item updated successfully!💡", "success");

    } else {
        invalidData();
    }


});

$("#deleteItemButton").on("click", () => {
    //Deleting the customer from the array.
    let elementNo = findItemElementNo("#iId2");
    if (elementNo != -1) {
        itemArray.splice(findItemElementNo("#iId2"), 1);
        //Updating the local storage.
        updateItemLocalStorage(itemArray);
        //Updating the table.
        addToItemTable();
        swal("Done!", "🚨 Item deleted successfully!", "success");

    } else {
        invalidData();
    }


});

$("#getAllItemsButton").on("click", () => {
    fetchData();
});

$("#itemSearchButton").on("click", function () {
    $("#infoBody").empty();//Clearing the info modal.
    //Finding the customer object from the custArray and appending to the #infoBody div.
    let elementNo = findItemElementNo("#itemIdField");
    if (elementNo != -1) {
        $("#exampleModal").modal("show"); //Triggering the bootstrap modal.
        $("#exampleModalLabel").text("Item Details.");
        $("#infoBody").append($("<h3></h3>").text("ITEM ID : " + itemArray[elementNo].item_Id));
        $("#infoBody").append($("<h3></h3>").text("ITEM NAME : " + itemArray[elementNo].item_Name));
        $("#infoBody").append($("<h3></h3>").text("ITEM PRICE  : " + itemArray[elementNo].item_price));
        $("#infoBody").append($("<h3></h3>").text("ITEM QTY : " + itemArray[elementNo].item_qty));
    } else {
        invalidData();
    }


});
/*Item Management -Start.*/
/*Order Management -Start.*/
var orderArray = [];
const orderData = "OrderData";

$("#aoButton").on("click", () => {
    $("#cIdDropdown").empty();
    //Loading necessary data to the dropdowns.
    custArray.forEach(function (c) {
        $("#cIdDropdown").append("<li><a class='dropdown-item'>" + c.customer_id + "</a></li>")
    })
    $("#iIdDropDown").empty();
    $("#iNameDropDown").empty();
    itemArray.forEach(function (i) {
        $("#iIdDropDown").append("<li><a class='dropdown-item'>" + i.item_Id + "</a></li>");
        $("#iNameDropDown").append("<li><a class='dropdown-item'>" + i.item_Name + "</a></li>");

    });

});
$("#cIdDropdown ").on("click", "li", function () {
    $("#cIdButton").empty();
    $("#cIdButton").text($(this).text());

});

$("#iIdDropDown").on("click", "li", function () {
    $("#iIdButton").empty();
    $("#iIdButton").text($(this).text());

});
$("#iNameDropDown").on("click", "li", function () {
    $("#iNameButton").empty();
    $("#iNameButton").text($(this).text());


});
$("#addOrderButton").on("click", () => {
    /*Collecting the order details from the modal.*/
    var orderDetails = {
        oId: $("#oId").val(),
        cId: $("#cIdButton").text(),
        iId: $("#iIdButton").text(),
        iName: $("#iNameButton").text(),
        iPrice: $("#iPriceField").val(),
        iQty: $("#iQtyField").val(),
        total: parseFloat($("#iPriceField").val()) * parseFloat($("#iQtyField").val())


    }

    //Updating the order array.
    orderArray.push(orderDetails);
    //Updating the local storage.
    localStorage.setItem(orderData, JSON.stringify(orderArray));
    //Updating the table.
    addOrdersToTable();
    swal("Done!", "Order added successfully!💡", "success");


});

function clearOrderTable() {
    $("#orderTable tbody").empty();
}

function addOrdersToTable() {
    clearOrderTable();
    if (localStorage.getItem(orderData)) {
        orderArray = JSON.parse(localStorage.getItem(orderData));
        for (let i = 0; i < orderArray.length; i++) {
            $("#orderTable tbody").append("<tr><td>" + orderArray[i].oId + "</td><td>" + orderArray[i].cId + "</td><td>" + orderArray[i].iId + "</td><td>" + orderArray[i].iName + "</td><td>" + orderArray[i].iPrice + "</td><td>" + orderArray[i].iQty + "</td><td>" + orderArray[i].total + "</td></tr>");
        }
    }
}

$("#orderTable").on("click", "tbody tr", function () {
    //Getting the order data from the table.
    var orderData = {
        oId: $(this).children("td:eq(0)").text(),
        cId: $(this).children("td:eq(1)").text(),
        iId: $(this).children("td:eq(2)").text(),
        iName: $(this).children("td:eq(3)").text(),
        iPrice: $(this).children("td:eq(4)").text(),
        iQty: $(this).children("td:eq(5)").text(),
        total: $(this).children("td:eq(6)").text()
    }
    $("#updateOrderButton").trigger("click");
    $("#uOId").val(orderData.oId);

    $("#uCidDropDown").empty();
    custArray.forEach(function (c) {

        $("#uCidDropDown").append("<li><a class='dropdown-item'>" + c.customer_id + "</a></li>")

    });
    $("#uIidDropDown").empty();
    $("#uInDropDown").empty();
    itemArray.forEach(function (i) {

        $("#uIidDropDown").append("<li><a class='dropdown-item'>" + i.item_Id + "</a></li>")
        $("#uInDropDown").append("<li><a class='dropdown-item'>" + i.item_Name + "</a></li>")
    });
    $("#upriceField").val(orderData.iPrice);
    $("#uqtyField").val(orderData.iQty);
    $("#uTotal").val(orderData.total);


});
$("#updateOrdersButton").on("click", () => {
    var updatedOrderDetails = {
        oId: $("#uOId").val(),
        cId: $("#uCustomerIds").text(),
        iId: $("#uItemIds").text(),
        iName: $("#uItemNames").text(),
        iPrice: $("#upriceField").val(),
        iQty: $("#uqtyField").val(),
        total: parseFloat($("#upriceField").val()) * parseFloat($("#uqtyField").val())


    }
    //show and alert using above object data
    let index = findOrderIds("#uOId");
    if (index != -1) {
        //Updating the order array.
        orderArray[index] = updatedOrderDetails;
        //Updating the local storage.
        localStorage.setItem(orderData, JSON.stringify(orderArray));
        //Updating the table.
        addOrdersToTable();
        swal("Done!", "Order updated successfully!💡", "success");
    } else {
        invalidData();
    }

});
$("#uCidDropDown").on("click", "li", function () {
    //Updating the customer id according to the selected value.
    $("#uCustomerIds").text($(this).text());

});
$("#uIidDropDown").on("click", "li", function () {
    //Updating the item id according to the selected value.
    $("#uItemIds").text($(this).text());

});
$("#uInDropDown").on("click", "li", function () {
    //Updating the item name according to the selected value.
    $("#uItemNames").text($(this).text());

});

function findOrderIds(value) {
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i].oId == $(value).val()) {
            return i;

        }
    }
    return -1;

}

$("#deleteOrderButton").on("click", () => {
    let index = findOrderIds("#oId2");
    if (index != -1) {
        //Deleting the order from the array.
        orderArray.splice(index, 1);
        //Updating the local storage.
        localStorage.setItem(orderData, JSON.stringify(orderArray));
        //Updating the table.
        addOrdersToTable();
        swal("Done!", "Order deleted successfully!💡", "success");

    } else {
        invalidData();
    }
});
$("#getAllOrdersButton").on("click", () => {
    fetchData();
})
$("#searchOrderButton").on("click", () => {
    let index = findOrderIds("#oidField")

    if (index != -1) {
        //Clearing the modal before new data added.
        $("#infoBody").empty();
        $("#exampleModal").modal("show"); //Triggering the bootstrap modal.
        $("#modalHeading").empty();
        $("#exampleModalLabel").text("Order Details.");
        $("#infoBody").append($("<h3></h3>").text("ORDER ID : " + orderArray[index].oId));
        $("#infoBody").append($("<h3></h3>").text("CUSTOMER ID  : " + orderArray[index].cId));
        $("#infoBody").append($("<h3></h3>").text("ITEM ID  : " + orderArray[index].iPrice));
        $("#infoBody").append($("<h3></h3>").text("ITEM NAME  : " + orderArray[index].iName));
        $("#infoBody").append($("<h3></h3>").text("ITEM PRICE (LKR)  : " + orderArray[index].iPrice));
        $("#infoBody").append($("<h3></h3>").text("ITEM QTY  : " + orderArray[index].iQty));
        $("#infoBody").append($("<h3></h3>").text("ITEM TOTAL (LKR)  : " + orderArray[index].total));

    } else {
        invalidData();
    }
});
addOrdersToTable();//Initializing the order table.
/*Order Management - End.*/
function invalidData(message) {
    if (message) {
        swal("OOPS!", message, "error");
    } else {
        swal("OOPS!", "Enter a valid ID.🚨", "error");
    }
}

/*Invoice Manager - Start.*/
$("#manageInvoices").on("click", () => {
    $("#infoBody").empty();
    $("#exampleModal").modal("show");
    $("#exampleModalLabel").text("Invoice Manager.");
    $("#infoBody").append("<input placeholder='Enter customer name...' id='csBar' type='text'>" + "<br>" + "<br>")
    $("#infoBody").append("<input placeholder='Enter customer email...' id='emailBar' type='email' >" + "<br>" + "<br>")
    $("#infoBody").append("<button class='btn btn-primary' id='searchCustomers'>Search</button>")
});
/*Invoice Manager - End.*/
$("#infoBody").on("click", "#searchCustomers", () => {
    let index = findCustName("#csBar");
    if (index != -1) {
        $("#infoBody").append("<h4 id='cidInvoice'>Customer ID : " + custArray[index].customer_id + "</h4>");
        var orders = getOrderArray(custArray[index].customer_id);
        if (orders.length != 0) {
            $("#infoBody").append("<h4>Order ID's as per below : </h4>");
            orders.forEach(function (o) {
                $("#infoBody").append("<h4>ORDER ID : " + orderArray[o].oId + "</h4>");
            });
            $("#infoBody").append("<h4>Total payment details as per below : </h4>");
            var total = 0;
            orders.forEach(function (od) {
                total += orderArray[od].total;
            });
            $("#infoBody").append("<h4 id='totalInInvoice'>Total (LKR) : </h4>" + total);
            sendEmail(custArray[index].customer_id,custArray[index].customer_name,total);
        } else {
            swal("OOPS!", "No orders found for this customer.🚨", "error");
        }

    } else {
        invalidData("Invalid customer name.🚨");
    }
});

function getOrderArray(cId) {
    var indexes = [];
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i].cId == cId) {
            indexes.push(i)

        }
    }
    return indexes;
}
/*Sending the email.*/
function sendEmail(customerId,customerName, totalInInvoice) {
    // Prepare the email parameters
    const templateParams = {
        message: "Your order summary as per below : ",
        customer_id: customerId,
        owner : "orderCloud",
        customer_name: customerName,
        total_in_invoice: totalInInvoice,
        customer_email : $("#emailBar").val(),
        reply_to: "drpeiris3@gmail.com"
    };

    // Send the email using EmailJS
    emailjs.send('service_kvc2vmj', 'template_k5h2r7h', templateParams)
        .then(function(response) {
            swal("Done!", "Email sent successfully!💡", "success");
        }, function(error) {
            swal("OOPS!", "Email sending failed!🚨", "error");
        });
}

