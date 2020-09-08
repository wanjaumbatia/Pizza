
var order = new Order();
var deliveryCharge;
var netCharge;
var TotalCharge;

function Prices(large,regular,small){
    this.large = large;
    this.regular = regular;
    this.small = small;
}
function Toppings(onion,cheese,mashroom,salad){
    this.onion = onion;
    this.cheese = cheese;
    this.mashroom = mashroom;
    this.salad = salad;
}
function Order(name, size, crust, topping, deliver, qty,location){
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.deliver = deliver;
    this.qty = qty;
    this.location = location;
}

var price = new Prices(1000,800,600);
var topping = new Toppings(100,120,150,100);

$(document).ready(function(){
    $('#chickenPizza').click(function(){
        $('#optionTitle').text('Chicken Pizza');
        $('#options').modal('show');
        order.name = "Chicken Pizza";
    });
});

$(document).ready(function(){
    $('#beefPizza').click(function(){
        $('#optionTitle').text('Beef Pizza');
        $('#options').modal('show');
        order.name = "Beef Pizza";
    });
});

$(document).ready(function(){
    $('#vegetablePizza').click(function(){
        $('#optionTitle').text('Vegetable Pizza');
        $('#options').modal('show');
        order.name = "Vegetable Pizza";
    });
});

$(document).ready(function(){
    $('#mgPizza').click(function(){
        $('#optionTitle').text('Margheritta Pizza');
        $('#options').modal('show');
        order.name = "Margheritta Pizza";
    });
});

$(document).ready(function(){
    $('#bbq').click(function(){
        $('#optionTitle').text('BBQ Steak Pizza');
        $('#options').modal('show');
        order.name = "BBQ Steak Pizza";
    });
});

$(document).ready(function(){
    $('#tikka').click(function(){
        $('#optionTitle').text('Chiken Tikka Pizza');
        $('#options').modal('show');
        order.name = "Chiken Tikka Pizza";
    });
});

$(document).ready(function(){
    $('#gotoCheckout').click(function(){
        $('#options').modal('hide');
        $('#checkoutModal').modal('show');
        order.size=$('#size').val();;
        order.crust=$('#crust').val();;
        order.topping=$('#topping').val();

        //additems to table
        addRows(order.name,order.size,order.crust, order.topping)
    })
});

$(document).ready(function(){
    $('#delivery').change(function(){  
        if($('#delivery').is(':checked')){
            $('#locationText').show();
            order.deliver = 'yes';
        }else{
            $('#locationText').hide();            
            order.deliver = 'no';
        }
    })
});

$(document).ready(function(){
    $('#gotoLocation').click(function(){
        $('#checkoutModal').modal('hide');
        $('#locationModal').modal('show');
        order.qty = $('#qty').val();
    })
});

$(document).ready(function(){
    $('#gotoFinal').click(function(){
        order.location = $("#locationText").val();
        $('#locationModal').modal('hide');
        $('#nametxt').text(order.name);
        $('#toppingtxt').text(order.topping);
        $('#crusttxt').text(order.crust);
        $('#sizetxt').text(order.size);
        $('#qtytxt').text(order.qty);
        $('#finalModal').modal('show');
        if(order.deliver="yes"){
            $('#deltxt').text("100")
            deliveryCharge = 100;
        }else{
            $('#deltxt').text("0")
            
            deliveryCharge = 100;
        }
        var total = getTotal(order.size,order.topping,deliveryCharge,order.qty)
        $('#total').text(total);
        $('#discount').text('0');
        $('#netcost').text(netCost(order.size,order.topping,order.qty));

    });
});
$('#locationText').hide();

$(document).ready(function(){
    $('#finish').click(function(){
      location.reload();
    })
});

function netCost(size,top,qty){
     //get delivery charge
     switch(size){
        case "Large":
            sizePrice = price.large;
        break;
        case "Regular":
            sizePrice = price.regular;
        break;
        case "Small":
            sizePrice = price.small;
        break;
        default:
            sizePrice = 0;
            break;
    }
    //get size price
    //get topping price
    switch(top){
        case "Cheese":
            topPrice = topping.cheese;
        break;
        case "Mashrooms":
            topPrice = topping.mashroom;
        break;
        case "Salad":
            topPrice = topping.salad;
        break;
        case "Onions":
            topPrice = topping.onion;
        break;
        default:
            topPrice = 0;
            break;
    }
    cost = (topPrice+sizePrice)*qty;
    return cost;
}
//Get Total
function getTotal(size,top,deliveryFee,qty){
    //get delivery charge
    switch(size){
        case "Large":
            sizePrice = price.large;
        break;
        case "Regular":
            sizePrice = price.regular;
        break;
        case "Small":
            sizePrice = price.small;
        break;
        default:
            sizePrice = 0;
            break;
    }
    //get size price
    //get topping price
    switch(top){
        case "Cheese":
            topPrice = topping.cheese;
        break;
        case "Mashrooms":
            topPrice = topping.mashroom;
        break;
        case "Salad":
            topPrice = topping.salad;
        break;
        case "Onions":
            topPrice = topping.onion;
        break;
        default:
            topPrice = 0;
            break;
    }
    //get total
    var TotalCharge = (sizePrice + topPrice)*qty + deliveryFee;

    return TotalCharge;
    
}

function addRows(x,y,z,a) {
    var table = document.getElementById("orderTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML=x;
    cell2.innerHTML=y;
    cell3.innerHTML=z;
    cell4.innerHTML=a;
    cell5.innerHTML='<input type="number" value="1" id="qty" class="form-control">';
    
}
