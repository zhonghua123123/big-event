$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比,设置剪裁容器的比例
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);



    //点击上传按钮，拉取文件，显示在裁剪区
    $('.btn1').on('click', function (e) {
        e.preventDefault();
        $('#file').trigger('click');

    })

    //给input注册值改变事件
    $('#file').on('change', function () {
        var file1 = this.files[0];
        // console.log(file1);
        var url = URL.createObjectURL(file1);
        // $image.attr('src', url);//直接显示不出来,要先清除之前的，在添加属性，在创建裁剪区域
        $image.cropper('destroy').attr('src', url).cropper(options);//更换裁剪区图片
    })

    //点击确认
    $('button:contains("确定")').on('click',function(e){
        e.preventDefault();
        
        // 创建一个 Canvas 画布
        var i = $image.cropper('getCroppedCanvas', { 
          width: 100,
          height: 100
        });
        var str=i.toDataURL()       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log(str);

        $.ajax({
            type:'post',
            url:'/my/update/avatar',
            data:{
                avatar:str
            },
            success:function(backdata){
                // console.log(backdata);
                layer.msg(backdata.message);
                if(backdata.status==0){
                    window.parent.getMessage ();
                }
                
            }
        })
        

    })


})