module.exports = {
	tableName:'enrollment',
	connection: 'evaluation',
	migrate: 'create',
	attributes:{
		course_id:{
			type:'int'
		},
		email:{
			type:'string'
		},
	},


}