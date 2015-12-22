Template.details.events({
	'click .btn_addtocard': function (e, tpl) {  
		var d = new Date();
		var dateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();
		alert(dateTime);
		var idproduct=this._id;
		  //alert(idproduct);  
		  var result=products.findOne({_id:idproduct});
		  var  subtotal=parseInt(result.price);
		  //alert(subtotal);                        
        if (Session.get('userIdSession')) { 
				//alert();                                                                                      //
					var obj = {                                                         
						id_product: idproduct,                                            
						userId: Session.get('userIdSession'),                                     
						quantity: 1,  
						subtotal: subtotal,
						status:'0',
						date:dateTime                                                    
						//shop: shop,                                                        
						//attribute: attribute                                               
					};                                                                                                                           //
					Meteor.call('addtocart', obj);   
					
					//Router.go('/checkout');                      
				} else {                                                            
					var newId = Random.id();                                           
					Session.setPersistent('userIdSession', newId);                             
					//var ses=Session.get('userId');                                   
		                                                                      
					var obj = {                                                         
						id_product: idproduct,                                            
						userId: Session.get('userIdSession'),                                     
						quantity: 1,  
						subtotal: subtotal,
						status:'0',
						date:dateTime                                                    
						//shop: shop,                                                        
						//attribute: attribute                                               
					};                                                               
		                                                                 
					Meteor.call('addtocart', obj);
					  
					//Router.go('/checkout');                    
				}                                                            
	},
	                                             
});
Template.headermobile.helpers({
	getCartshow:function(){
		if(Meteor.userId()){
			id=Meteor.userId();
		}else{
			id=Session.get('userIdSession');
		}
		console.log('Myconsole:'+cart.find({userId:id},{status:'0'}).count());
		return cart.find({userId:id},{status:'0'});
	},
	getProduct: function(id){
		return products.findOne({"_id":id});
	},
	getproductimage:function(id){
		var idimage=products.findOne({_id:id}).image;
		//console.log('IMG:'+idimage);
		return idimage;
		
	},
	getNameproduct: function(id_product){
		return products.findOne({"_id":id_product}).title;
	}
});