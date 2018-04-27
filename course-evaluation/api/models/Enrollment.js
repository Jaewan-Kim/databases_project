module.exports = {
	tableName:'enrollment',
	connection: 'evaluation',

	primaryKey: 'email',
 	autocreatedAt : false,
	autoupdatedAt : false,
	migrate: 'create',
	attributes:{
		course_id:{
			type:'int'
		},
		email:{
			type:'string',
			primaryKey:true,
		},
	},


}