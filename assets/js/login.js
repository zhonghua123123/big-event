// 入口函数
$(function(){
    // 去注册
// 点击去注册，切到注册页面，登录页面隐藏
$('#goto-reg').on('click',function(){
    $('#login').hide().next().show();
}) 
// 点击去登录，切到登录页面，注册页面隐藏
$('#goto-login').on('click',function(){
    $('#login').show().next().hide();
}) 

//点击注册按钮
$('#register .layui-form').on('submit',function(e){
    //阻止默认行为
    e.preventDefault();
    //获取用户名，密码
    var data=$(this).serialize();
    // console.log(data);
    // 发送ajax请求
    $.ajax({
        type:'post',
        url:'http://www.liulongbin.top:3007/api/reguser',
        data:data,
        success:function(backdata){
            // console.log(backdata);
            // alert(backdata.message);
            // 弹出框
            layer.msg(backdata.message);
            if(backdata.status==0){
                $('#login').show().next().hide();
            }
        }
    })
})

// //点击登录按钮
$('#login .layui-form').on('submit',function(e){
//阻止默认行为
e.preventDefault();
//获取用户名，密码
var data=$(this).serialize();
$.ajax({
    type:'post',
    url:'http://www.liulongbin.top:3007/api/login',
    data:data,
    success:function(backdata){
        console.log(backdata);
        // alert(backdata.message);
        layer.msg(backdata.message);
        localStorage.setItem('token',backdata.token);
        if(backdata.status==0){
            // window.location.href='/index.html';
        }
    }
})
})


//表单验证,密码6-12位，2次密码一样
// 1.加载form模块
var form=layui.form;
form.verify({
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    same:function(val){
        console.log(val);
        var password=$('.layui-form-item .pass').val();
        console.log(password);
        
        if(val!=password){
            return '两次密码不一样';
        }
        
    }
})



})