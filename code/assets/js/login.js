$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 去登录
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取 layui 中的 form 对象
    var form = layui.form
    var layer = layui.layer
    // 自定义 form 表单的验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if(pwd != value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 发起 Ajax 的 post 请求
        $.post('/api/reguser', data, function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('账号注册成功！')
            $('#link_login').click()
            
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将获取到的 token 存储到 localStorage 中
                localStorage.setItem('token', res.token)
                // 重定向到 index.html
                location.href = 'index.html'
            }
        })
    })
})