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
		  //var userId=Session.get('userId');
		  	var userId=Meteor.userId();
		  
		  //alert(subtotal);                        
        if (userId) { 
        	
        		var arraypush=[];
        		var existRow=cart.find().count();

        		if(existRow>0){
        			var carts=cart.find({$and:[{order_status:0},{userId:userId}]})
        			carts.forEach(function(index){
        				arraypush.push(index.id_product);
        			});
        			
        			var search= arraypush.indexOf(this._id);
        			if(search>=0){
        				var objCart=cart.find({$and:[{order_status:0},{userId:userId},{id_product:this._id}]});
        				alert(objCart.count());
        				//alert(JSON.stringify(objCart));
        				objCart.forEach(function(value){
        					var obj={
							quantity : 1+parseInt(value.quantity),  
							subtotal : subtotal+parseInt(value.subtotal),
							date     : dateTime 
	        				}
        				Meteor.call('updatCart',value._id,obj);
        				});
        				
        			}
        			else {
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
						alert('Add to cart successully!');   
        			}
        		}
        		else {
        			//alert('insert');
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
						alert('Add to cart successully!');    
        		}
        			
                     
		}else{
			Router.go('login');
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
		// if(Meteor.userId()){
		// 	id=Meteor.userId();
		// }else{
		// 	id=Session.get('userIdSession');
		// }
		// console.log('Myconsole:'+cart.find({userId:id},{order_status:0}).count());
		// return cart.find({$and:[{order_status:0},{userId:id}]});
		var	userId=Meteor.userId();
		console.log('Myconsole:'+cart.find({$and:[{order_status:0},{userId:userId}]}).count());
		Session.set('cartcount',cart.find({$and:[{order_status:0},{userId:userId}]}).count());
		return cart.find({$and:[{order_status:0},{userId:userId}]},{limit:2});
	},
	getProduct: function(id){
		return products.findOne({"_id":id});
	},
	getproductimage:function(id){
		var idimage=products.findOne({_id:id}).image;
		if(idimage.indexOf("uploads")>-1 || idimage.indexOf("http://")>-1){
			return idimage;
		}else{
			var img = images.findOne({_id:idimage});
            //console.log("current img="+img);
                    //console.log("LAST="+id);
            if(img){
                        //console.log(img.copies.images.key);
                return '/uploads/'+img.copies.images.key;
            }else{
                return;
            } 
		}
		
		
	},
	getNameproduct: function(id_product){
		return products.findOne({"_id":id_product}).title;
	},
	getTotol:function(){
		var total=0;
		var userId=Meteor.userId();
		var result=cart.find({$and:[{order_status:0},{userId:userId}]});
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
});