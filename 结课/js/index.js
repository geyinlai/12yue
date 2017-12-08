var mysql = require('mysql')
var express = require('express')
var bodyParser = require('body-parser')
var jade = require('jade')
var app = express()
var user = express.Router()

app.use(bodyParser.urlencoded({}))
app.use('/user',user)

var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"220118",
    database:"item"
})

user.post('/login',function(req,res){

    var user = req.body.user
    var pass = req.body.pass
    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection::'+err)
            return
        }
        connection.query('select * from login where user=?',[user],function(err,data){
            if(err){
                console.log('mysql::'+err)
                return
            }
            if(data == ''){
                res.send('用户名不存在')
            }else{
                if(data[0].pass == pass){
                    res.send('登录成功')
                }else{
                    res.send('用户名或密码不对')
                }
            }

        })
    })

})

user.post('/login2',function(req,res){
    var user = req.body.user
    var pass = req.body.pass
    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection::'+err)
            return
        }

        connection.query('select * from login where user=?',[user],function(err,data){
            if(err){
                console.log('mysql::'+err)
                return
            }
            if(data == ''){
                connection.query('insert into login(user,pass) values(?,?)',[user,pass],function(err,data){
                    if(err){
                        console.log('mysql::'+err)
                        return
                    }
                    res.send('注册成功')
                })
            }else{
                res.send('用户名以存在')
            }

        })
    })

})

 
app.use(express.static('../'))
app.listen(8000,function(){
    console.log('ok')
})




