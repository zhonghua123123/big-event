$(function(){
    // 刚进入index页面就发送ajax获取用户信息，渲染到页面
    // http://www.liulongbin.top:3007
    getMessage ();


    //退出登录,移出token，跳转到登录页面
    $('#exit').on('click',function(){
        // 弹出是否是退出登录
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            window.location.href='/login.html';
            //关闭弹窗
            layer.close(index);
          });
     
    })
})

// 在入口函数里封装个全局函数
function getMessage (){
    $.ajax({
        url:'http://www.liulongbin.top:3007/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token')
        },
        success:function(backdata){
            console.log(backdata);
            if(backdata.status==0){
                var myname=backdata.data.nickname || backdata.data.username;
                $('.my-name').text(myname);
                // 新用户头像为null，文字首字母，，，老用户就是获取的值
                if(backdata.data.user_pic==null){
                    var initial=backdata.data.username.substr(0,1).toUpperCase();
                    $('.bigName').text(initial).css('display','inline-block');
                    $('.layui-nav-img').hide();
                }else{
                    $('.layui-nav-img').attr('src',backdata.data.user_pic).show().next().hide();
                }
            }
          
            
        },
        // 有token，但是是假的
        // complete请求不管成功还是失败，都执行下面函数
        complete:function(xhr){
            console.log(xhr);
            if(xhr.responseJSON.status==1){
                localStorage.removeItem('token');
                window.location.href='/login.html';
            }
        }

    })
}