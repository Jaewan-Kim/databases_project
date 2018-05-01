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
		var blank = ''
		if(req.param('reporttype','')== "comments"){

			
			if(week == 0){
				StudentReport.query('SELECT r.comments FROM student_report sr, reports r WHERE sr.course_id = ? AND sr.report_id = r.report_id AND r.comments<> ?',[courseid, blank],function(err,comments){
					comments= JSON.parse(JSON.stringify(comments))
					if(comments.length==0){

						req.flash('error', 'There are no comments available for this course/week')
						res.view('pages/adminpage', {courses:req.session.courses})
						return;
					}

					res.view('pages/commentspage',{comments:comments})

				})
			}
			else{
				StudentReport.query('SELECT r.comments FROM student_report sr, reports r WHERE sr.course_id = ? AND sr.report_id = r.report_id AND sr.week= ? AND r.comments<> ?',[courseid, week, blank],function(err,comments){
					comments= JSON.parse(JSON.stringify(comments))
					if(comments.length==0){

						req.flash('error', 'There are no comments available for this course/week')
						res.view('pages/adminpage', {courses:req.session.courses})
						return;
					}
					res.view('pages/commentspage',{comments:comments})


				})
			}
		}
		else{
			if(week==0){
				StudentReport.query('SELECT r.* FROM student_report sr,reports r WHERE sr.course_id = ? AND r.report_id = sr.report_id',[courseid],function(err, reports){
					reports= JSON.parse(JSON.stringify(reports))
					if (reports.length == 0){
						req.flash('error', 'There are no reports available for this course/week')
						res.view('pages/adminpage', {courses:req.session.courses})

					}
					let reportslist = new Promise(function(resolve, reject){
						var r1=0
						var r2=0
						var r3=0
						var r4=0
						var r5=0
						var x=0
						for (i = 0; i < reports.length;i++){
							r1 = r1+reports[i].response_1
							r2 = r2+reports[i].response_2
							r3 = r3+reports[i].response_3
							r4 = r4+reports[i].response_4
							r5 = r5+reports[i].response_5

							x++;
							if(reports.length == x){
								
								var total =reports.length
								var raw={
									response1:r1,									
									response2:r2,									
									response3:r3,									
									response4:r4,									
									response5:r5,									
								}
								var ratio = [
								r1/total,
								r2/total,
								r3/total,
								r4/total,
								r5/total,
								]
								var response={
									raw:raw,
									ratio:ratio,
									total:reports.length
								}
								
								resolve(response)
							}
						}

					})

					reportslist.then(function(response){
						
						Question.find({},function(err, questions){
							question_details = [
								questions[0]["question_detail"],
								questions[1]["question_detail"],
								questions[2]["question_detail"],
								questions[3]["question_detail"],
								questions[4]["question_detail"],
							]

							res.view('pages/oneclass', {response:response, questions:question_details})

						})


					

					})


				})
			}
			else{
				StudentReport.query('SELECT r.* FROM student_report sr,reports r WHERE sr.course_id = ? AND r.report_id = sr.report_id AND sr.week = ?',[courseid, week],function(err, reports){
					reports= JSON.parse(JSON.stringify(reports))
					if (reports.length == 0){
						req.flash('error', 'There are no reports available for this course/week')
						res.view('pages/adminpage', {courses:req.session.courses})

					}
					let reportslist = new Promise(function(resolve, reject){
						var r1=0
						var r2=0
						var r3=0
						var r4=0
						var r5=0
						var x=0
						for (i = 0; i < reports.length;i++){
							r1 = r1+reports[i].response_1
							r2 = r2+reports[i].response_2
							r3 = r3+reports[i].response_3
							r4 = r4+reports[i].response_4
							r5 = r5+reports[i].response_5

							x++;
							if(reports.length == x){
								
								var total =reports.length
								var raw={
									response1:r1,									
									response2:r2,									
									response3:r3,									
									response4:r4,									
									response5:r5,									
								}
								var ratio = [
								r1/total,
								r2/total,
								r3/total,
								r4/total,
								r5/total,
								]
								var response={
									raw:raw,
									ratio:ratio,
									total:reports.length
								}
								
								resolve(response)
							}
						}

					})

					reportslist.then(function(response){
						
						Question.find({},function(err, questions){
							question_details = [
								questions[0]["question_detail"],
								questions[1]["question_detail"],
								questions[2]["question_detail"],
								questions[3]["question_detail"],
								questions[4]["question_detail"],
							]

							res.view('pages/oneclass', {response:response, questions:question_details})

						})


					

					})


				})
			}

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

		if (w1==0){
			//both are all weeks!
			if(w2==0){

			}
			//only the first course is all weeks
			else{

			}
		}
		else{
			//only week 2 is all weeks!
			if(w2==0){

			}
			//neither are all weeks
			else{

			}

		}
	}
};