$(function(){
    //每次发送ajax，会被$.ajaxPrefilter()拦截
    $.ajaxPrefilter(function(option){
        console.log(option);
        option.url='http://www.liulongbin.top:3007'+option.url;
        option.headers={
            Authorization:localStorage.getItem('token')
        };
          // 有token，但是是假的
        // complete请求不管成功还是失败，都执行下面函数
        option.complete=function(xhr){
            if(xhr.responseJSON.status==1){
                localStorage.removeItem('token');
                window.partent.location.href='/login.html';
            }
        }

    })


})