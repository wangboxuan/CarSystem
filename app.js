var express = require("express");
var router = require("./router");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zulin');
var app = express();
//设置views
app.set("view engine","ejs");
//使用session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('static'));
app.use("/uploads",express.static('uploads'));
// 登录
app.get("/",router.showLogin);
// 检查登录是否成功
app.post("/checklogin",router.checklogin);
// 没有用户名显示注册页面
app.get("/reg",router.showReg);
// 验证用户名是否被占用
app.get("/checkuserexist",router.checkuserexist);
// 注册成功
app.post("/doreg",router.doreg);

// 首页
app.get("/index",router.showIndex);

// 客人查询
app.get("/find",router.showFind);
// 得到所有的客人
app.get ('/student', router.getAllStudent);
// 添加
app.post('/student', router.doAddStudent);
// 显示更新
app.get('/student/:id', router.showUpdate);	
// 更新
app.post('/student/:id', router.updateStudent);
// 删除
app.delete('/student/:id', router.deleteStudent);


// 汽车档案
app.get("/showcar",router.showCar);
// 得到所有的
app.get ('/car', router.getAllCar);
// 添加
app.post('/car', router.doAddCar);
// 显示更新
app.get('/car/:id', router.showUpdateCar);	
// 更新
app.post('/car/:id', router.updateCar);
// 删除
app.delete('/car/:id', router.deleteCar);


// 类别档案
app.get("/showtype",router.showType);
// 得到所有的
app.get ('/type', router.getAllType);
// 添加
app.post('/type', router.doAddType);
// 删除
app.delete('/type/:id', router.deleteType);


// 租赁登记
app.get('/zulin', router.showZulin);
// 所有车
app.get('/zulinall', router.zulinType);
// 右边
app.get('/zulinallr', router.zulinTypeall);
// 已租
app.post('/yizu/:id', router.showYizu);
// 把已经租的存数据库
app.post('/yizus', router.doAddYizu);
// 归还登记
app.get('/gui', router.showGui);
// 取出来cun的数据
app.get('/quyizu', router.quyizu);
app.delete("/gui/:id",router.deleteGui);

// 统计分析
app.get('/fenxi', router.showFenxi);
app.post('/gh', router.Guihuan);
// 获取数据
app.get('/guihuan', router.showGuihuan);

// 图表分析
app.get("/tu",router.showTu);
// 退出登录
app.get("/tui",router.tui);

app.listen(3000);