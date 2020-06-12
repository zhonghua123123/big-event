// 封装函数，页面一进来，发送ajax获取tr信息
function getTrMessage() {
    $.ajax({
        url: '/my/article/cates',
        success: function (backdata) {
            // console.log(backdata);

            var str = template('tem_category', backdata);
            // console.log(str);
            if (backdata.status == 0) {
                $('tbody').html(str);
            }
        }
    })
}

$(function () {
    var addIndex;
    var editIndex;
    // 引入form模块
    var form =layui.form;
    getTrMessage();

    //删除类别,委托注册
    $('tbody').on('click', '.del', function () {
        //获取id
        var id = $(this).attr('data-id');
        layer.confirm('确认要删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //根据id发送ajax
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (backdata) {
                    if (backdata.status == 0) {
                        layer.msg(backdata.message);
                        getTrMessage();

                    }
                }
            })
            layer.close(index);
        });

    })

    //添加类别
    $('.add-cate').on('click', function () {
        // 出来个弹出层
        addIndex = layer.open({
            type: 1,
            title: '添加文字分类',
            content: $('#tem_addCategory').html(),
            area: ['500px', '300px']
        });

    })

    //确认添加，获取内容，发送ajax请求，动态注册
    $('body').on('submit', '#form_add', function (e) {
        //**************************这里this为form
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.ajax({
            type: 'post',
            data:data,
            url: '/my/article/addcates',
            success: function (backdata) {
                layer.msg(backdata.message);
                if (backdata.status == 0) {
                    getTrMessage();
                    //关闭弹出层
                    layer.close(addIndex);
                }
            }
        })
    })


    //委托注册，点击编辑按钮，出现弹出层,获取内容渲染在页面上
    $('tbody').on('click','.edit',function(){
        //给编辑添加自定义属性
        var id=$(this).attr('data-id');
        var name=$(this).attr('data-name');
        var alias=$(this).attr('data-alias');
        editIndex=layer.open({
            type: 1,
            title: '修改文字分类',
            content: $('#tem_editCategory').html(),
            area: ['500px', '300px'],
            success:function(){
                //成功出现弹出层后，渲染在表单上
                //layui的表单赋值方法  form.val('filter', object);
                // filter即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                form.val('abc',{
                    id:id,
                    name:name,
                    alias:alias
                })
               
            }
        });
    })

    //点击确认修改，获取内容。发送ajax
    $('body').on('submit','#form_edit',function(e){
        e.preventDefault();
        // var data=$(this).serialize();
        // data=data.replace('id=','Id=');
        // console.log(data);
        var data=$(this).serializeArray();
        data[0].name='Id';
        console.log(data);//id name alias
        // 根据 Id 更新文章分类数据        
        $.ajax({
            type:'post',
            url:'/my/article/updatecate',
            data:data,
            success:function(backdata){
                layer.msg(backdata.message);
                if(backdata.status==0){
                    getTrMessage();
                     //关闭弹出层
                     layer.close(editIndex);

                }
            }
        })
        
    })

})