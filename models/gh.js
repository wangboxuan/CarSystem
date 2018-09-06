var mongoose = require("mongoose");
var HuanSchema = new mongoose.Schema({
	id: Number,
	yonghuming: String,
	type: String,
	name: String,
	time: String,
	price: Number,
	yajin: Number,
	he: Number
})
// 增加学生
HuanSchema.statics.addhuan = function (json, callback) {
	var s = new Huan(json);
	s.save(function (err) {
		if (err) {
			callback(-1);
			return;
		} else {
			callback(1);
		}
	})
}
// 类
var Huan = mongoose.model("huan", HuanSchema);
module.exports = Huan;