Session.set("total", 0);

Template.checkout.helpers({/*
	getCart: function(){
		var mycart = '';
		if(Meteor.userId()){
			userid = Meteor.userId();
			if( userid ){
				mycart = cart.find({userId:userid});
			}
		}else{
			userid = Session.get('userId');
			if( userid ){
				mycart = cart.find({userId:userid});
			}
		}
		var total = 0;
		
		mycart.forEach( function(value,index){
			total = total + value.subtotal;
		})
		Session.set("total", total);
		console.log(mycart);
		return mycart;
	},
	
	getProductInfo: function(productid , quantity, item_id, subtotal, shop){
		var pro = products.findOne({_id:productid});
	
		if( pro ){
			//var subtotal = parseInt(pro.price) * parseInt(quantity);
			
			var image = "";
			if(pro.image){
				var img = images.findOne({_id:pro.image});
				image = img.copies.images.key;
			}
			var shop = shops.findOne({_id:shop})
			
			/*var oldtotal = total;//Session.get("total");
			var total = Session.get("total") + subtotal;
			
			
			//console.log("sub:"+subtotal);
			
			return {product:pro, qty:quantity, subtotal:subtotal,image:image, item_id:item_id,shop:shop.name}
		}
	},
	getTotal: function(){
		return Session.get("total");
	}*/
});
Template.checkout.events({
	"change .qty":function(e,tmp){
		
		var qty = $(e.currentTarget).val();
		var id = $(e.currentTarget).attr("data-id");
		var productid = $(e.currentTarget).attr("pro-id");
		var pro = products.findOne({_id:productid});
		var subtotal = 0;
		if( pro ){
			subtotal = parseInt(pro.price) * parseInt(qty);
		}
		cart.update(id, {$set: {quantity: qty, subtotal:subtotal}})
		
		var mycart = '';
		if(Meteor.userId()){
			userid = Meteor.userId();
			if( userid ){
				mycart = cart.find({userId:userid});
			}
		}else{
			userid = Session.get('userId');
			if( userid ){
				mycart = cart.find({userId:userid});
			}
		}
		var total = 0;
		
		mycart.forEach( function(value,index){
			total = total + value.subtotal;
		})
		Session.set("total", total);
		//Meteor._reload.reload();
	},
	"click .remove":function(e,tmp){
		var itemid = $(e.currentTarget).attr("data-remove");
		cart.remove(itemid);
	}
});