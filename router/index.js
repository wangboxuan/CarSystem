var user = require("../models/user.js");
var Student = require("../models/find.js");
var car = require("../models/car.js");
var type = require("../models/type.js");
var gui = require("../models/gui.js");
var gh = require("../models/gh.js");
var url = require("url");
var formidable = require("formidable");
//加密模块
var crypto = require('crypto');
// 显示登录页面
exports.showLogin = function (req, res, next) {
    res.render("login");
}
// 检查登录
exports.checklogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fileds, files) {
        var yonghuming = fileds.yonghuming;
        var mima = fileds.mima;
        user.findUserByName(yonghuming, function (err, doc) {
            if (!doc) {
                res.json({ "result": -1 })
                return;
            }
            if (crypto.createHmac("sha256", mima).digest("hex") == doc.mima) {
                req.session.login = 1;
                req.session.yonghuming = yonghuming;
                res.json({ "result": 1 });
                return;
            } else {
                res.json({ "result": -2 });
                return;
            }
        })
    })
}
// 注册页面
exports.showReg = function (req, res, next) {
    res.render("reg");
}
// 用户名是否存在
exports.checkuserexist = function (req, res, next) {
    var queryobj = url.parse(req.url, true).query;
    if (!queryobj.yonghuming) {
        res.send("请提供用户名参数");
        return;
    }
    user.findUserByName(queryobj.yonghuming, function (err, doc) {
        if (doc) {
            res.json({ "result": -1 })
        } else {
            res.json({ "result": 1 })
        }
    })

}
// 注册
exports.doreg = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fileds, files) {
        var yonghuming = fileds.yonghuming;
        var mima = fileds.mima;
        user.findUserByName(yonghuming, function (err, doc) {
            if (doc) {
                res.json({ "result": -1 });
                return;
            }
            user.adduser(yonghuming, mima, function (err, doc) {
                if (err) {
                    res.json({ "result": -2 })
                    return;
                }
                req.session.login = 1;
                req.session.yonghuming = yonghuming;
                res.json({ "result": 1 })
            });
        });
    })
}

// 首页
exports.showIndex = function (req, res, next) {
    res.render("index");
}
// 客人查询
exports.showFind = function (req, res, next) {
    res.render("find");
}
// 获取所有
exports.getAllStudent = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    Student.count({}, function (err, count) {
        Student.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, results) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "results": results
            })
        })
    })
}
// 添加
exports.doAddStudent = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        Student.addStudent(fields, function (result) {
            res.json({ "result": result });
        })
    })
}
// 删除
exports.deleteStudent = function (req, res) {
    var id = req.params.id;
    Student.find({ "id": id }, function (err, results) {
        if (err || results.length == 0) {
            res.json({ "result": -1 });
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({ "result": -1 });
                return;
            }
            res.json({ "result": 1 });
        })
    })
}
// 更新
exports.updateStudent = function (req, res) {
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //更改学生
        Student.update({ "id": id }, { $set: { "id": fields.id, "yonghuming": fields.yonghuming, "dianhua": fields.dianhua, "dizhi": fields.dizhi, "impid": fields.impid, "jiazhao": fields.jiazhao } }, function (err) {
            if (err) {
                res.json({ "result": -1 });
            } else {
                res.json({ "result": 1 });
            }
        })
    });
}
exports.showUpdate = function (req, res) {
    var id = req.params.id;
    Student.find({ "id": id }, function (err, results) {
        if (results.length == 0) {
            res.json({ "result": -1 });
            return;
        } else {
            res.json({ "result": results[0] });
        }
    });
}

// 汽车档案
exports.showCar = function (req, res, next) {
    res.render("car");
}
// 获取所有
exports.getAllCar = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    car.count({}, function (err, count) {
        car.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, results) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "results": results
            })
        })
    })
}
// 添加car
exports.doAddCar = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        car.addcar(fields, function (result) {
            res.json({ "result": result });
        })
    })
}
// 删除
exports.deleteCar = function (req, res) {
    var id = req.params.id;
    car.find({ "id": id }, function (err, results) {
        if (err || results.length == 0) {
            res.json({ "result": -1 });
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({ "result": -1 });
                return;
            }
            res.json({ "result": 1 });
        })
    })
}
// 更新
exports.updateCar = function (req, res) {
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //更改学生
        car.update({ "id": id }, { $set: { "id": fields.id, "name": fields.name, "type": fields.type, "price": fields.price, "zhuangtai": fields.zhuangtai } }, function (err) {
            if (err) {
                res.json({ "result": -1 });
            } else {
                res.json({ "result": 1 });
            }
        })
    });
}
exports.showUpdateCar = function (req, res) {
    var id = req.params.id;
    car.find({ "id": id }, function (err, results) {
        if (results.length == 0) {
            res.json({ "result": -1 });
            return;
        } else {
            res.json({ "result": results[0] });
        }
    });
}

// 类别档案
exports.showType = function (req, res, next) {
    res.render("type");
}
// 所有
exports.getAllType = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    type.count({}, function (err, count) {
        type.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, results) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "results": results
            })
        })
    })
}
// 添加
exports.doAddType = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        type.addtype(fields, function (result) {
            res.json({ "result": result });
        })
    })
}
// 删除
exports.deleteType = function (req, res) {
    var id = req.params.id;
    type.find({ "id": id }, function (err, results) {
        if (err || results.length == 0) {
            res.json({ "result": -1 });
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({ "result": -1 });
                return;
            }
            res.json({ "result": 1 });
        })
    })
}

// 租赁登记
exports.showZulin = function (req, res) {
    res.render("zulin")
}
// 所有车
exports.zulinType = function (req, res) {
    type.find({}).exec(function (err, results) {
        res.json({ "results": results })
    })
}
// 右边
exports.zulinTypeall = function (req, res) {
    car.find({}).exec(function (err, results) {
        res.json({ "results": results })
    })
}
// 已租
exports.showYizu = function (req, res) {
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        car.update({ "id": id }, { $set: { "zhuangtai": fields.zhuangtai } }, function (err) {
            if (err) {
                res.json({ "result": -1 });
            } else {
                res.json({ "result": 1 });
            }
        })
    });
}
// 已经租的存数组
exports.doAddYizu = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        gui.addgui(fields, function (result) {
            res.json({ "result": result });
        })
    });
}
// 归还登记
exports.showGui = function (req, res) {
    res.render("gui")
}
// 获取已经租的存数组
exports.quyizu = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    gui.count({}, function (err, count) {
        gui.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, results) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "results": results
            })
        })
    })
}
exports.deleteGui = function (req, res) {
    var id = req.params.id;
    gui.find({ "id": id }, function (err, results) {
        if (err || results.length == 0) {
            res.json({ "result": -1 });
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({ "result": -1 });
                return;
            }
            res.json({ "result": 1 });
        })
    })
}
// 统计分析
exports.showFenxi = function (req, res) {
    res.render("fenxi")
}
// 归还的内容加入数组
exports.Guihuan = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        gh.addhuan(fields, function (result) {
            res.json({ "result": result });
        })
    });
}
// 归还数据
exports.showGuihuan = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    gh.count({}, function (err, count) {
        gh.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, results) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "results": results
            })
        })
    })
}
// 图表分析
exports.showTu = function (req, res) {
    gh.find({}, function (err, result) {
        var arr = result;
        console.log(arr);
        var map = {}, dest = [];
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i];
            if (!map[a.type]) {
                dest.push({
                    cartype: a.type,
                    data: [a]
                })
                map[a.type] = a;
            } else {
                for (var k = 0; k < dest.length; k++) {
                    var dj = dest[k];
                    if (dj.cartype == a.type) {
                        dj.data.push(a);
                        break;
                    }
                }
            }
        }
        console.log(dest);
        var cartype = [];
        var carcount = [];
        for (var i = 0; i < dest.length; i++) {
            var d = dest[i];
            var dd = d.data;
            cartype.push(d.cartype);
            carcount.push(dd.length);
        }
        console.log(cartype, carcount);
        res.json({
            "cartype": cartype,
            "carcount": carcount
        })
    })
}
// 退出
exports.tui = function (req, res) {
    var login = req.session.login = 0;
    var yonghuming = req.session.yonghuming = '';
    if (yonghuming) {
        user.getK(yonghuming, 'touxiang', function (err, v) {
            res.render('index', {
                'login': login,
                'yonghuming': '',
                'touxiang': ''
            })
        })
    } else {
        res.render('index', {
            'login': login,
            'yonghuming': '',
            'touxiang': ''
        })
    }
}