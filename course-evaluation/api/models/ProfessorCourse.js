module.exports = {
	tableName:'professor_course',
	connection: 'evaluation',

	//primaryKey: 'email',
 	autocreatedAt : false,
	autoupdatedAt : false,
	migrate: 'create',
	attributes:{
		course_id:{
			type:'int'
		},
		email:{
			type:'string',
		},
	},

}

