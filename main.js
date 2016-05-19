$(function(){
var LIST = $(".form-container");
var LIST_LEFT = $(".items-left");
var LIST_BOUGHT = $(".items-bought");

var ITEM_TEMPLATE = $(".-item").html();
var LABEL_TEMPLATE = $(".-label").html();


//Function for changing name for product
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

//Function for adding new product list with fixed name
function addItem(title){
	var node = $(ITEM_TEMPLATE);
	node.attr("style","");


	//add product names in main-box
	node.find(".product-name").text(title);

	//add product names with mark(number) in second-box
	var sideLabel = $(LABEL_TEMPLATE);
	sideLabel.find(".label-text").text(title);
	sideLabel.find(".mark").text(1);
	LIST_LEFT.append(sideLabel);

	var label = node.find(".label");

	//adding function to delete product when delete button pressed
	node.find(".delete").click(function(){
		node.remove();
		sideLabel.remove();
	});


	//adding function to edit the name of product when you press on it
	var editMode = false;
	node.find(".product-name").click(function(){
		if (!editMode){
			editMode = true;
			var _this = $(this);
			var prev = _this.html();
			var _field = $("<input  type=\"text\" value=\"" + _this.html() + "\" />");
			_this.html(_field);
			_field.select().focus();
			_field.focusout(function(){
				editMode = false;
				if (isBlank(_field.val())){
					_this.html(prev);
					return;
				}
				sideLabel.find(".label-text").html(_field.val());
				_this.html(_field.val());
			});
		}
	});


	//adding the ability to decrease number of product by pressin red button
	node.find(".red-button").attr("disabled","disabled");
	node.find(".red-button").click(function(){
		var count = parseInt(label.html());
		count--;
		label.html(count);
		sideLabel.find(".mark").html(count);
		if (count < 2){
			node.find(".red-button").attr("disabled","disabled");
		}
	});

	//adding the ability to increase number of product by pressin green button
	node.find(".green-button").click(function(){
		var count = parseInt(label.html());
		count++;
		label.html(count);
		sideLabel.find(".mark").html(count);
		if (count > 1){
			node.find(".red-button").removeAttr("disabled","disabled");
		}
	});

	//adding the ability to mark product as bought by presssing bought button
	node.find(".bought").click(function(){
		sideLabel.remove();
		sideLabel.addClass("strike");
		LIST_BOUGHT.append(sideLabel);
		node.find(".green-red-buttons").addClass("hidden");
		node.find(".buy-del-buttons").addClass("hidden");
		node.find(".unbuy-buttons").removeClass("hidden");
	});


	//adding the ability to mark product as not bought by presssing unbuy button
	node.find(".unbuy").click(function(){
		sideLabel.remove();
		sideLabel.removeClass("strike");
		LIST_LEFT.append(sideLabel);
		node.find(".green-red-buttons").removeClass("hidden");
		node.find(".buy-del-buttons").removeClass("hidden");
		node.find(".unbuy-buttons").addClass("hidden");		
	});


	LIST.append(node);
}


//adding three products which must be at the begining
addItem("Помідори");
addItem("Печиво");
addItem("Сир");



//Function which adding new product with name which you choose
$(".add-button").click(function(){
	var itemName = $(".item-name-field").val();
	if (!isBlank(itemName))
		addItem(itemName);
})
});