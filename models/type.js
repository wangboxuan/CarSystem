var mongoose = require("mongoose");
var TypeSchema = new mongoose.Schema({
	id: Number,
	type: String,
})
// 验证学号是否存在
TypeSchema.statics.checkSid = function (id, callback) {
	this.find({ "id": id }, function (err, results) {
		callback(results.length == 0);
	})
}
// 增加学生
TypeSchema.statics.addtype= function (json, callback) {
	Type.checkSid(json.id, function (torf) {
		if (torf) {
			var s = new Type(json);
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
var Type = mongoose.model("type", TypeSchema);
module.exports = Type;