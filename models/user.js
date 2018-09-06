var mongoose = require('mongoose');
var crypto = require('crypto');
var userSchema = mongoose.Schema({
    yonghuming: String,
    mima : String,
});
var user = mongoose.model('user', userSchema);
// 得到某个属性
exports.getK=function(yonghuming,k,callback){
    user.findOne({"yonghuming":yonghuming},function(err,doc){
        callback(err,doc[k]);
    })
}
// 通过名字寻找
exports.findUserByName=function(yonghuming,callback){
    user.findOne({"yonghuming":yonghuming},function(err,doc){
        callback(err,doc);
    })
}
// 添加user
exports.adduser=function(yonghuming,mima,callback){
    var jiamidemima=crypto.createHmac("sha256",mima).digest("hex");
    user.create({"yonghuming":yonghuming,"mima":jiamidemima},function(err,doc){
        callback(err,doc);
    })
}
// 增加属性
exports.addShuxing=function(yonghuming,k,v,callback){
    user.findOne({"yonghuming":yonghuming},function(err,doc){
        if(err){
            return;
        }
        if(!doc){
            return;
        }
        doc[k]=v;
        doc.save(callback);
    })
}