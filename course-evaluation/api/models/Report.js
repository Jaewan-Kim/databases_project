module.exports = {
	tableName:'reports',
	connection: 'evaluation',
	migrate: 'create',

	primaryKey: 'report_id',
 	autocreatedAt : false,
	autoupdatedAt : false,
	attributes:{
		report_id:{
			type:'int',
			primaryKey:true,
		},
		response_1:{
			type:'int'
		},
		response_2:{
			type:'int'
		},
		response_3:{
			type:'int'
		},
		response_4:{
			type:'int'
		},
		response_5:{
			type:'int'
		},
		comments:{
			type:'string'
		}
	},



}