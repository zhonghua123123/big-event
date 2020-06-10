$(function(){
    //表单验证
// 1.密码6-12位
// 2.新密码不能与原密码一样
// 3.新密码与确认密码一样
var form=layui.form;
form.verify({
    pass:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],//3个都有
    new:function(val){//给新密码，val代表新密码
        var oldPwd=$('#oldPwd').val();
        if(oldPwd==val){
            return '新密码不能与原密码一样'
        }
    },
    same:function(val){//给确认密码，val代表确认密码
        var newPwd=$('#newPwd').val();
        if(val!=newPwd){
            return '新密码与确认密码不一样'
        }
    }

})

//点击修改密码
$('form').on('submit',function(e){
    e.preventDefault();
    var data=$(this).serialize();
    console.log(data);
    
    $.ajax({
        type:'post',
        url:'http://www.liulongbin.top:3007/my/updatepwd',
        data:data,
        headers:{
            'Authorization':localStorage.getItem('token')
        },
        success:function(backdata){
            layer.msg(backdata.message); 
            if(backdata.status==0){//成功
                //重置表单 reset(),dom对象 $('form')[0]转成dom对象
                $('form')[0].reset();
            }
        },
        //下面验证token假的或失效
        complete:function(xhr){
            if(xhr.responseJSON.status==1){
                localStorage.removeItem('token');
                window.parentlocation.href='/login.html';
            }
            
        }

        
    })
})


})