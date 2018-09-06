var mongoose = require("mongoose");
var CarSchema = new mongoose.Schema({
	id: Number,
	name: String,
	type: String,
	price: String,
	zhuangtai:String,
})
// 验证学号是否存在
CarSchema.statics.checkSid = function (id, callback) {
	this.find({ "id": id }, function (err, results) {
		callback(results.length == 0);
	})
}
// 增加学生
CarSchema.statics.addcar= function (json, callback) {
	Car.checkSid(json.id, function (torf) {
		if (torf) {
			var s = new Car(json);
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
var Car = mongoose.model("cars", CarSchema);
module.exports = Car;