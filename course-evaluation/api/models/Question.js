module.exports = {
	tableName:'questions',
	connection: 'evaluation',
	primaryKey: 'question_id',
 	autocreatedAt : false,
	autoupdatedAt : false,
	migrate: 'create',
	attributes:{
		question_id:{
			type:'int',
			primaryKey:true,
		},
		question_detail:{
			type:'string'
		},
	},



}