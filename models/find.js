var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
	id: Number,
	yonghuming: String,
	dianhua: String,
	dizhi: String,
	impid: String,
	jiazhao: String,
})
// 验证学号是否存在
StudentSchema.statics.checkSid = function (id, callback) {
	this.find({ "id": id }, function (err, results) {
		callback(results.length == 0);
	})
}
// 增加学生
StudentSchema.statics.addStudent = function (json, callback) {
	Student.checkSid(json.id, function (torf) {
		if (torf) {
			var s = new Student(json);
			s.save(function (err) {
				if (err) {
					callback(-2);
					return;
				}
				callback(1);
			})
		} else {
			callabck(-1);
		}
	})
}
// 类
var Student = mongoose.model("yuangongs", StudentSchema);
module.exports = Student;