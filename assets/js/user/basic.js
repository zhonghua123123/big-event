// 封装全局函数
function getBasic(){
    $.ajax({
        url:'http://www.liulongbin.top:3007/my/userinfo',
        headers:{
            'Authorization':localStorage.getItem('token')
        },
        success:function(backdata){
            // console.log(backdata);
            if(backdata.status==0){
                $('#login').val(backdata.data.username);
                $('#nicheng').val(backdata.data.nickname);
                $('#email').val(backdata.data.email);
                $('#hidden').val(backdata.data.id);//获取id********
                //一个个获取很麻烦
                
            }
            
        },
        complete:function(xhr){
            // console.log(xhr);
            if(xhr.responseJSON.status==1){
                localStorage.removeItem('token');
                window.parent.location.href='/login.html';
            }
        }
    })
}

$(function(){
    // 刚进来页面，获取ajax请求
    getBasic();

    //给form注册提交事件
    $('form').on('submit',function(e){
        e.preventDefault();
        var data=$(this).serialize();
        console.log(data);
        $.ajax({
            type:'post',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data:data,
            headers:{
                'Authorization':localStorage.getItem('token')
            },
            success:function(backdata){
                if(backdata.status==0){
                    layer.msg(backdata.message);
                    //重新获取用户信息
                    window.parent.getMessage ();
                }
                
            },
            complete:function(xhr){
                // console.log(xhr);
                if(xhr.responseJSON.status==1){
                    localStorage.removeItem('token');
                    window.parent.location.href='/login.html';
                }
            }
        })
        
      
    })

    //点击重置按钮，恢复未修改的
    $('button[type="reset"]').on('click',function(e){
        e.preventDefault();
        getBasic();
    })
})