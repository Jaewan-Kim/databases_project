module.exports = {
	tableName:'courses',
	connection: 'evaluation',

	primaryKey: 'course_id',
 	autocreatedAt : false,
	autoupdatedAt : false,
	migrate: 'create',
	attributes:{
		course_id:{
			type:'int',
			primaryKey:true,
		},
		course_name:{
			type:'string'
		},
	},



}