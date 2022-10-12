$('.submitBtn').click(function() {
    var username = $('#username').val().trim()
    var password = $('#password').val().trim()
    if (username === '' || password === '') return dialog('请输入用户名或密码')

    // 取出本地数据并核对
    if (!localStorage.userList) return dialog('当前没有任何用户注册过', function() {
        location.href = './register.html'
    })
    var userList = JSON.parse(localStorage.userList)
        // 查找用户名
    var ishave = false
    var isSuccess = false
    $.each(userList, function(index, item) {

        // if (username === item.username) {
        //     ishave = true
        //     if (password === item.password) {
        //         dialog('登陆成功', function() {
        //             item.isLogin = true
        //             localStorage.userList = JSON.stringify(userList)
        //             location.href = './index.html'
        //         })
        //     } else {
        //         dialog('密码错误')
        //     }
        // }

        item.isLogin = false;
        // item.isLogin为 index.html做登陆状态判断
        if (username === item.username) {
            ishave = true
            if (password === item.password) {
                item.isLogin = true
                isSuccess = true
            } else {
                return dialog('密码错误')
            }
        }
    })

    if (isSuccess) {
        // 改完状态后,重新保存到本地

        localStorage.userList = JSON.stringify(userList)

        dialog('登陆成功', function() {
            // localStorage.userList = JSON.stringify(userList)
            location.href = '../index.html'
        })
    }
    if (ishave === false) {
        dialog('账号不存在')
    }








})