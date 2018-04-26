module.exports = {
	tableName:'student_report',
	connection: 'evaluation',
	migrate: 'create',
	attributes:{
		course_id:{
			type:'int'
		},
		week:{
			type:'int'
		},
		email:{
			type:'string'
		},
		report_id:{
			type:'int'
		}
	},



}