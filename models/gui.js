var mongoose = require("mongoose");
var GuiSchema = new mongoose.Schema({
	id: Number,
    yonghuming: String,
	name:String,
	type:String,
    time:String,
	price:Number,
	yajin:Number,
	he:Number,
})
// 增加学生
GuiSchema.statics.addgui= function (json, callback) {
	Gui.checkSid(json.id, function (torf) {
		if (torf) {
			var s = new Gui(json);
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
// 验证学号是否存在
GuiSchema.statics.checkSid = function (id, callback) {
	this.find({ "id": id }, function (err, results) {
		callback(results.length == 0);
	})
}

// 类
var Gui = mongoose.model("gui", GuiSchema);
module.exports = Gui;