$('.submitBtn').click(function() {
    dialog('请输入用户名');
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    if (username.length == 0) return alert('请输入用户名')
    if (password.length == 0) return alert('请输入密码')
    if ($('#truepassword').val().trim() !== password) return alert('两次输入密码不一致')
    if ($('#agree').prop('checked') !== true) return alert('请阅读声明并勾选')
        // ***************************************************************************


    // trim()去除获得val()数据中的空白数值
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    if (username.length == 0) return dialog('请输入用户名');
    if (password.length == 0) return dialog('请输入密码');
    if ($('#truepassword').val().trim() !== password) return dialog('两次输入密码不一致');
    if ($('#agree').prop('checked') !== true) return dialog('请阅读声明并勾选');

    // 拿到数据,保存到本地
    // 一个用户就是一个对象,所有用户列表是一个数组
    // 数组包对象
    var user = {
            username: username,
            password: password
        }
        // 保存到本地
        // 判断本地是否有userList这个数组
        // 有的话 取出来把新用户加进去
        // 没有的话,创建一个数组再把新用户加进去
    if (localStorage.userList) {
        var arr = JSON.parse(localStorage.userList)
        arr.push(user)
        localStorage.userList = JSON.stringify(arr)
    } else {
        localStorage.userList = JSON.stringify([user])
    }
     location.href = './login.html'
})
