module.exports = {
	tableName:'student_report',
	connection: 'evaluation',
	migrate: 'create', 
	primaryKey: 'email',
 	autocreatedAt : false,
	autoupdatedAt : false,
	attributes:{
		course_id:{
			type:'int'
		},
		week:{
			type:'int'
		},
		email:{
			type:'string',
			primaryKey:true,
		},
		report_id:{
			type:'int'
		}
	},



}