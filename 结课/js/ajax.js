/**
 * Created by Administrator on 2017/12/6 0006.
 */
$(function(){
    btn.onclick = function(){
        ajax({
            url:'http://localhost:8000/user/login',
            type:'post',
            data:{
                user:user.value,
                pass:pass.value
            },
            success:function(da){
                console.log(da)
//			if(user.value==''){
//				alert('请输入用户名')
//			}
//			if( pass.value){
//				console.log('登陆成功')
//			}
            },
            error:function(){

            }
        })
    }
    btn1.onclick = function(){
        ajax({
            url:'http://localhost:8000/user/login2',
            type:'post',
            data:{
                user:user.value,
                pass:pass.value
            },
            success:function(da){
                console.log(da)

            },
            error:function(){

            }
        })
    }

    function ajax(req){
//	console.log(req.data)
        if(window.XMLHttpRequest){
            var ajax = new XMLHttpRequest()
        }else{
            var ajax = new ActiveXObject( "Microsoft.XMLHTTP" );
        }
        if(req.type == 'get'){
            ajax.open('get',req.url+'?'+strdata(req.data),true)
            ajax.send()
        }else{
            ajax.open('post',req.url,true)
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            ajax.send(strdata(req.data))
        }
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4){
                if(ajax.status>=200 && ajax.status<300 || ajax.status == 304){
                    req.success(ajax.responseText)
//					console.log(ajax.responseText)
                }else{
                    req.error(ajax.status)
                }

            }
        }

        function strdata(da){
            var arr = []
            for(var i in da){
                arr.push(i+'='+da[i])
            }
            var strurl = arr.join('&')
            return strurl
        }
    }

})