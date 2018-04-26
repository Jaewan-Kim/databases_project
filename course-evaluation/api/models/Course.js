module.exports = {
	tableName:'courses',
	connection: 'evaluation',
	migrate: 'create',
	attributes:{
		course_id:{
			type:'int'
		},
		course_name:{
			type:'string'
		},
	},



}