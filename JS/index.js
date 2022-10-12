// ***************************************************
// 取出所有用户  查找谁在登陆
// 查找后如果没有任何一个用户的isLogin为 true  那么首页将无法访问
// $$前面为true  把后面赋值过去,    前面为false    直接停止
var userList = localStorage.userList && JSON.parse(localStorage.userList)

var ishaslogin = false
var currentIndex = ''
if (userList) {
    $.each(userList, function(index, item) {
        if (item.isLogin) {
            // 本地存储中的item.isLogin查找
            ishaslogin = true;
            currentIndex = index;
            // 登陆状态 ishaslogin = true    currentIndex就是所在登陆的索引号
        }
    })
};

// 封装存储函数
function saveDate() {
    localStorage.userList = JSON.stringify(userList)
}

//立即执行函数 判断是否登陆,没有的话直接跳转登录页
(function() {
    if (!ishaslogin) return dialog('请先登陆!', function() {
        location.href = './HTML/login.html'
    })
})();



// 获取当前登陆的用户名
var currentUser = userList[currentIndex];
// 渲染用户名
$('#username').html(currentUser.username);
// 渲染用户等级
$('#level').html(currentUser.level);


// 判断是否做过问卷
if (!currentUser.level) {
    $('.questionbox').fadeIn()
}

// 关闭问卷
$('#closequestion').click(function() {
    if (currentUser.level) {
        $('.questionbox').fadeOut()
    } else {
        dialog('首次登陆必须填写问卷')
    }
})

// 提交问卷
$('#submitquestion').click(function() {
    var checkedRadious = $('.questionbox input:checked')
    if (checkedRadious.length < 6) return dialog('请选择所有选项')
        // 计算分数
    var sum = 0;
    $.each(checkedRadious, function(index, item) {
            sum += item.value - 0;
        })
        // console.log(sum)
    var level = ''
    switch (true) {
        case sum >= 45:
            level = '最高'
            break
        case sum >= 35:
            level = '较高'
            break
        case sum >= 25:
            level = '中等'
            break
        case sum >= 15:
            level = '一般'
            break
        default:
            level = '很低'

    }

    // 更新用户等级
    userList[currentIndex].level = level;
    saveDate()
        // 重新答卷后,等级更新了,页面也得更新
    $('#level').html(level);

    $('.questionbox').fadeOut()
})

// 重新答卷
$('#resetQuestion').click(function() {
    $('.questionbox').fadeIn();
})

// 退出登陆
$(".outBtn").click(function() {
    // 只有改了userList,就必须保存到本地
    userList[currentIndex].isLogin = false
    saveDate()
    dialog('退出登陆成功', function() {
        location.href = './HTML/login.html'
    })
})


renderList()

renderRatioList()
    // 渲染推荐基金的数据
function renderList() {
    // 渲染之前先清空父容器
    $('#recommend').html('')
        // 得到当前用户的等级(数字代表)
    var grade = 0;
    switch (currentUser.level) {
        case '最高':
            grade = 5
            break
        case '较高':
            grade = 4
            break
        case '中等':
            grade = 3
            break
        case '一般':
            grade = 2
            break
        default:
            grade = 1

    }
    console.log(userList[currentIndex]);
    // 得到当前用户不喜欢列表   
    var noLikeList = userList[currentIndex].noLikeList
        // 遍历数据
        // 后台JS引入的date数据
    $.each(data, function(index, item) {
            if (item.grade == grade) {
                // 判断该基金名字是否在不喜欢列表中
                if (true) {
                    // if (noLikeList.indexOf(item.name) === -1) {
                    // 等于-1表示没有   再进行渲染
                    var itemDom = $('<div class="item"></div>')
                    var html = '<p class="fl"><a target="_blank" href="' + item.link + '">' + item.name + '</a></p><b class="fl">$' + item.price + '</b><span class="fr" id="addBtn">添加</span><em class="fr noLikeBtn">不喜欢</em>'
                    itemDom.html(html)
                    $('#recommend').append(itemDom)
                }

            }
        })
        // noLikeBtn()
}

// 清空基金配比列表
// userList[currentIndex].addedFundList = []
// saveDate()



// 渲染基金配比的函数
function renderRatioList() {
    $('#ratioList').html('')
    var addedFundList = currentUser.addedFundList || []
    var totalAll = 0
    $.each(addedFundList, function(index, item) {
        totalAll += item.total
    })

    $.each(addedFundList, function(index, item) {
        var ratio = ((item.total / totalAll) * 100).toFixed(2) + '%'
        var div = $('<div class="item"></div>')
        var html = '<p class="fl">' + item.name + '</p><strong class="fr">' + item.total + '</strong><i class="fr">' + ratio + '</i>'
        div.html(html)
        $('#ratioList').append(div)
    })

}

// 事件委托效果更好
// 采用事件委托,可以给动态创建的元素绑定事件
// 事件委托
$('#recommend').on('click', '.noLikeBtn', function() {
        var name = $(this).siblings('p').text()
            // 判断当前currentUser有没有noLikeList,没有就添加
        if (currentUser.noLikeList) {
            userList[currentIndex].noLikeList.push(name)
        } else {
            userList[currentIndex].noLikeList = [name]
        }
        saveDate()
        renderList()
    })
    // *************************************************************
    // 采用封装不喜欢按钮功能
    // 封装不喜欢功能
    // function noLikeBtn() {

//     // 不喜欢功能
$(".noLikeBtn").click(function() {
        var name = $(this).siblings('p').text()
        if (currentUser.noLikeList) {
            userList[currentIndex].noLikeList.push(name)
        } else {
            userList[currentIndex].noLikeList = [name]

        }
        saveDate()
        renderList()
    })
    // }
    // **********************************************************

// 添加功能
// 事件委托方法
var currentAddFund = null
$('#recommend').on('click', '#addBtn', function() {
    $('.addBox').fadeIn()
    currentAddFund = {
        name: $(this).siblings('p').text(),
        price: $(this).siblings('b').text().substr(1) - 0
    }
})


// 关闭添加盒子
$('#cannotBtn').click(function() {
    $('.addBox').fadeOut()
})



// 确认添加
$('#couseBtn').click(function() {
    // 添加份数
    var count = $(this).parent().siblings('input').val()
        // 判断当前currentUser有没有addedFundList,没有就添加
    if (currentUser.addedFundList) {
        // 判断当前添加的基金是否存在
        // userList[currentIndex].addedFundList.push({
        //     name: currentAddFund.name,
        //     total: (currentAddFund.price * count).toFixed(1)
        // })

        // 立即执行函数
        (function() {
            for (var i = 0; i < userList[currentIndex].addedFundList.length; i++) {
                if (userList[currentIndex].addedFundList[i].name === currentAddFund.name) {
                    userList[currentIndex].addedFundList[i].total += currentAddFund.price * count
                    return
                }
            }

            userList[currentIndex].addedFundList.push({
                name: currentAddFund.name,
                total: (currentAddFund.price * count).toFixed(1)
            })

        })()

    } else {
        userList[currentIndex].addedFundList = [{
            name: currentAddFund.name,
            total: (currentAddFund.price * count).toFixed(1)
        }]
    }
    saveDate()
    $('.addBox').fadeOut()
    renderRatioList()
})


// 重置按钮
$('#resetList').click(function() {
    userList[currentIndex].noLikeList = []
    saveDate()
    renderList()
})