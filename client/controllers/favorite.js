
Template.listproducts.events({
    'click #unlike':function(e){
        
            
             e.preventDefault();
             var like="#like"+this._id;
             var unlike="#unlike"+this._id;
             $(like).removeClass('hidelike');
             $(unlike).addClass('hidelike');
             //console.log('id'+Session.get('userId'));
             if(Meteor.userId()){
                var userId=Meteor.userId();
             }else{
                var userId=Session.get('userId');
                if(!userId){
                    var newId=Random.id();
                    Session.setPersistent('userId',newId);
                }
                
             }
             
            var obj={
                proId:id,
                userId:userId
            }

            Meteor.call('insertFavorite',obj);
            alert('Product successfully append to favorite!'); 
                

            
    },
    'click #like':function(e){
        e.preventDefault();
        var like="#like"+this._id;
        var unlike="#unlike"+this._id;
        $(like).addClass('hidelike');
        $(unlike).removeClass('hidelike');
        if(Meteor.userId()){
                var userId=Meteor.userId();
        }else{
            var userId=Session.get('userId');
                
        }
        alert(userId);
        var obj=favorite.findOne({userId:userId},{proId:this._id});
        //alert(obj._id);
       
        favorite.remove(obj._id);
       
        
    }
});
Template.listpro.helpers({
    favoriteList:function(){
    	if(Session.get('userId')){
    		var ses=Session.get('userId');
          var data=  favorite.find({userId:ses});
          var object=[];
          var obj={};
          data.forEach(function(entry) {
            var proid=entry.proId;
              obj=products.findOne({_id:proid})
              object.push(obj);
                
           });
          console.log(object);
        return object;
    	}
        
        
        
    },
    getProduct:function(){
    	console.log('abc');
		var result=products.find();
		//console.log(result.fetch.count());
		return result;
	}
});