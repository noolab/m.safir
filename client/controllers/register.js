Template.register.events({
    'submit form': function(event){
    	event.preventDefault();
    	console.log('Register in progress...');
    	var username=$('[name=username]').val();
    	var firstname =$('[name=fname]').val();
		var lastname =$('[name=lname]').val();
		var email = $('[name=email]').val();
		var password =$('[name=password]').val();
		var country=$('[name=pays]').val();
		var city=$('[name=ville]').val();
		var shipcard = '';
		var point = 0;
		var rerole = 'member';
		var msg = "";

		console.log(username, firstname, lastname, email, password, country, city, shipcard, point, rerole, msg);

		console.log('register in progress 2...')
		if( firstname == '' || lastname == ''  || email=='' || password ==''){
			if( firstname == '' )
				msg += '<p>Firt Name is required.</p>';
			if( lastname == '' )
				msg += '<p>Last Name is required.</p>';
			if( email == '' )
				msg += '<p>email is required.</p>';
			if( password == '' )
				msg += '<p>password is required.</p>';
			
			$(".register_msg").html(msg);
			Session.set("registerError", msg );
		}
		else{
			
			Meteor.call('register',firstname, lastname, email, password, shipcard, point, rerole,country,city,username,function(err){
				if(err){
					console.log(err.reason);
					Session.set("registerError",err.reason);
				}else{
					Session.set("registerError","");
					Router.go('registerSuccess'); 
				}
			});
		}
    	
    }
});

