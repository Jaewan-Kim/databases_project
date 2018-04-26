module.exports = {
	tableName:'login_info',
	connection: 'evaluation',
	migrate: 'create',
	attributes:{
		email:{
			type:'string'
		},
		password:{
			type:'string'
		},
		isadmin:{
			type:'boolean'
		}
	},

	authenticate: function(email, password, cb){

		User.findOne({email:email}, function(err,userInfo){
			if (err != null) {
                return cb("Something went wrong.", null);
            } else if (userInfo == null) {
                return cb("User does not exist.", null);
            } else {
                if (userInfo.password != password) {
                    return cb("Password does not match.", null);
                } else {
                    return cb(null, userInfo);
                }
            }
		});
	}

}