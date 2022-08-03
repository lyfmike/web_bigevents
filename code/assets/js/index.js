$(function() {
    // 调用 getInfo() 获取用户基本信息
    getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // header 头部信息配置对象
        // headers: {Authorization: localStorage.getItem('token') || ''},
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用 renderAvatar()  渲染用户头像
            renderAvatar(res.data)

            var layer = layui.layer

            // 点击按钮，实现退出功能
            $('#btnLogout').on('click', function () {
                layer.confirm('是否确认退出页面?', { icon: 3, title: '提示' }, function (index) {
                    localStorage.removeItem('token')

                    location.href = '/code/login.html'

                    layer.close(index);
                });
            })
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        /* complete: function(res) {
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空 token
                localStorage.removeItem('token')
                // 强制跳转到登录页面
                location.href = '/code/login.html'
            }
        } */
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if(user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}