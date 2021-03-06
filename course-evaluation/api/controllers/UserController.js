module.exports = {

	redirectlogin: function(req, res){

		res.redirect('/loginpage');
	},
	logout: function(req,res){
		return res.view('pages/login')

	},	


	login: function(req, res){

		if (req.method == 'GET'){
			res.view('pages/login');
			return;
		}
		var email = req.param('email','');
		var password = req.param('pword', '');
		User.authenticate(email,password, function(err,userInfo){
			if (err==null){

				req.session.userEmail = userInfo.email;
				if (userInfo.isadmin){
					ProfessorCourse.query('SELECT c.course_id, c.course_name FROM professor_course p, courses c WHERE p.email = ? AND c.course_id = p.course_id', [userInfo.email], function(err, courses){
						courses=JSON.parse(JSON.stringify(courses))
						req.session.courses = courses
						return res.view('pages/adminpage', {courses:courses})

					})


				}
				var courses = [];
				Enrollment.find({email:email}, function(err,enrollInfo){

					let findcoursenames = new Promise(function(resolve, reject){
						for (i = 0; i < enrollInfo.length; i++){

							Course.findOne({course_id: enrollInfo[i].course_id}, function(err, course){
								courses.push(course);
								if(courses.length == enrollInfo.length){
									resolve(courses);
								}								
							})
						}

					})		

					findcoursenames.then(function(coursesin){
						Question.find({},function(err, questions){
							req.session.courses =coursesin
							req.session.questions = questions
							return res.view('pages/reportpage', {courses:coursesin, questions:questions})

						})
					})		
				


				});

			}else{
				req.flash('error', err)
				return res.view('pages/login')
			}
		});
	},

	

};