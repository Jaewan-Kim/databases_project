module.exports = {
	tableName:'questions',
	connection: 'evaluation',
	migrate: 'create',
	attributes:{
		question_id:{
			type:'int'
		},
		question_detail:{
			type:'string'
		},
	},



}