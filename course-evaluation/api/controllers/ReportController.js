module.exports = {
	submit:function(req,res){
		
		var week = req.param('week','')
		var email = req.session.userEmail;
		var course_id = req.param('course_id','')
		var report_id;

		StudentReport.find({},function(err,r){
			report_id = r.length
		})

		StudentReport.find({email:email, course_id:course_id, week:week},function(err, result){
			if (result.length== 0){
				var student_report_input = {
					email: email,
					week: week,
					course_id: course_id,
					report_id: report_id
				}
				StudentReport.create(student_report_input, function(err,created){})

				var report_input={
					report_id:report_id,
				}
				x = 0;

				Question.find({}, function(err,result){
					let questionslist = new Promise(function(resolve, reject){
						for (i = 0; i < result.length;i++){
							var answer = req.param(result[i].question_id,'')
							report_input["response_"+result[i].question_id] = answer
							x++;
							if(result.length == x){
								report_input["comments"]=req.param('comments');
								resolve(report_input)
							}
						}

					})

					questionslist.then(function(answers){
						Report.create(answers, function(err,created){})
						req.flash('error', 'Successfully submitted the evalutatoin!')
						res.view('pages/reportpage', {courses:req.session.courses, questions:req.session.questions})

					})
				})

			}else{
				req.flash('error', 'You have already submitted an evaluation for this course/week!')
				res.view('pages/reportpage', {courses:req.session.courses, questions:req.session.questions})

			}

		})

		
	},
	generatereport:function(req,res){

		var courseid = req.param('courseid','')
		var email = req.session.userEmail
		var week = req.param('week','')
		if(req.param('reporttype','')== "comments"){

			
			if(week == 0){
				StudentReport.query('SELECT r.comments FROM student_report sr, reports r WHERE sr.course_id = ? AND sr.report_id = r.report_id',[courseid],function(err,comments){
					comments= JSON.parse(JSON.stringify(comments))

					res.view('pages/commentspage',{comments:comments})

				})
			}
			else{
				StudentReport.query('SELECT r.comments FROM student_report sr, reports r WHERE sr.course_id = ? AND sr.report_id = r.report_id AND sr.week= ?',[courseid, week],function(err,comments){
					comments= JSON.parse(JSON.stringify(comments))

					res.view('pages/commentspage',{comments:comments})


				})
			}
		}
		else{

		}
	},
	totwoclasses:function(req,res){
		res.view('pages/twoclasses',{courses:req.session.courses})
	},

	twoclasses:function(req,res){
		var c1 = req.param('courseid1','')
		var c2 = req.param('courseid2','')
		var w1 = req.param('week1','')
		var w2 = req.param('week2','')
		
		if(c1==c2 && w1 == w2){
				req.flash('error', 'You cannot choose the same exact course and week!')
				res.redirect('back')
		}
	}
};