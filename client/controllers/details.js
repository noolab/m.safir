Template.details.events({
	'submit #cart': function (e, tpl) { 
		e.preventDefault();
		var subtotal=0; 
		var shopId=e.target.shop.value;
		var d = new Date();
		var dateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();
		//alert(dateTime);
		var idproduct=this._id;
		  //alert(idproduct);  
		  var result=products.findOne({_id:idproduct});
		  if(result.price!==''){
		  	 subtotal=parseInt(result.price);
		  }
		  
		  //alert(subtotal);                        
        if (Session.get('userIdSession')) { 
        		var arraypush=[];
        		
        		if(Meteor.userId()){
        			var userId=Meteor.userId();
        		}else{
        			var userId=Session.get('userIdSession');
        		}
        		//alert();
        		//mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
        		var carts=cart.find({$and:[{order_status:0},{userId:userid}]})
        			carts.forEach(function(index){
        				arraypush.push(index.id_product);
        			});
        			//alert('makara');
        			var search= arraypush.indexOf(this._id);
        			if(search>=0){
        				//alert('have already');
        				var objCart=cart.find({$and:[{order_status:0},{userId:userid}]})
        				
        				
        				var obj={
							quantity : 1+objCart.quantity,  
							subtotal : subtotal+objCart.subtotal,
							date     : dateTime 
	        				}
        				Meteor.call('updatCart',objCart._id,obj);
        			}else{
        				//alert('not have');
        				var obj = {                                                         
						id_product: idproduct,                                            
						userId: userId,
						shopId:shopId,                                     
						quantity: 1,  
						subtotal: subtotal,
						order_status:0,
						date:dateTime                                                    
						//shop: shop,                                                        
						//attribute: attribute                                               
						};                                                                                                                           //
						Meteor.call('addtocart', obj);   
        			}
                     
		} else { 
			if(Meteor.userId()){
				var userId=Meteor.userId();
			}else{
				var newId = Random.id();                                           
					Session.setPersistent('userIdSession', newId); 
					var userId=Session.get('userIdSession');
			}                                                          
					                            
					//var ses=Session.get('userId');                                   
		                                                                      
			var obj = {                                                         
					id_product: idproduct,                                            
					userId:userId , 
					shopId:shopId,                                     
					quantity: 1,  
					subtotal: subtotal,
					order_status:0,
					date:dateTime                                                    
						                                            
					};                                                               
		                                                                 
					Meteor.call('addtocart', obj);  
					                  
		}                                                            
	},
	'click #btn_color':function(e){
    	if(Session.get('count_color')){
    		var count=1+Session.get('count_color');
    	}else{
    		var count=1;
    	}
    	if(count%2!==0){
    		//alert('fadein');
    		$('#ul_color').fadeIn();
    	}else{
    		//alert('fadeout');
    		$('#ul_color').fadeOut();
    	}
    	Session.set('count_color',count);
    	
    	
    },
    'click #btn_size':function(e){
    	if(Session.get('count_size')){
    		var count=1+Session.get('count_size');
    	}else{
    		var count=1;
    	}
    	if(count%2!==0){
    		$('#ul_size').fadeIn();
    	}else{
    		$('#ul_size').fadeOut();
    	}
    	Session.set('count_size',count);
    	
    	
    }
	                                             
});
Template.details.helpers({
	getShop:function(shop){
		var arr=[];
		//alert(JSON.stringify(shop));
		for(var i=0;i<shop.length;i++){
			var result=shops.findOne({_id:shop[i].shopid});
			arr.push(result);
		}
		return arr;

	},
	getSizeColor:function(code){
		var attributes=attribute.findOne({product:code});
		
		var image=attributes.productImage;
		var color = image.replace("uploads", "upload");
		var attr_value=attribute_value.find({parentId:attributes.parent});
		var obj={
			color:color,
			size:attr_value
		}
		return obj;
	}
})
Template.headermobile.helpers({
	getCartshow:function(){
		if(Meteor.userId()){
			id=Meteor.userId();
		}else{
			id=Session.get('userIdSession');
		}
		console.log('Myconsole:'+cart.find({userId:id},{order_status:0}).count());
		return cart.find({$and:[{order_status:0},{userId:userid}]});
	},
	getProduct: function(id){
		return products.findOne({"_id":id});
	},
	getproductimage:function(id){
		var idimage=products.findOne({_id:id}).image;
		var image = idimage.replace("uploads", "upload");
		//console.log('IMG:'+idimage);
		return image;
		
	},
	getNameproduct: function(id_product){
		return products.findOne({"_id":id_product}).title;
	},
	getTotol:function(){
		var total=0;
		if(Meteor.userId()){
			var userId=Meteor.userId();
		}else{
			var userId=Session.get('userIdSession');
		}
		var result=cart.find({$and:[{order_status:0},{userId:userid}]});
		result.forEach(function(value){
			 total+=value.subtotal;
		})
		return total;
	},

});
Template.headermobile.events({
	'click #removeCart':function(e){
		e.preventDefault();
		cart.remove(this._id);
	}
})

