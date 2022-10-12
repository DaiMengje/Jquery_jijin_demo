/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-30 09:14:38
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-30 09:14:53
 * @FilePath: \基金项目\没事.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use strict";
var userArr = [],
    currentUser = null,
    currentIndex = 0;
localStorage.users && (userArr = JSON.parse(localStorage.users), $.each(userArr, function(e, r) { if (r.isLogin) return currentUser = r, currentIndex = e, !1 })), validateLoginFlag(), getGrade(currentUser.grade), showFundList(), showHold(), currentUser.storeList = currentUser.storeList || [], 0 < currentUser.storeList.length && $(".main-r h2").hide();
var myChart = echarts.init(document.getElementById("store")),
    option = { tooltip: { trigger: "item" }, legend: { top: "5%", left: "center", textStyle: { color: "#fff" } }, series: [{ type: "pie", top: "100", radius: ["0%", "70%"], avoidLabelOverlap: !1, label: { show: !1, position: "center" }, labelLine: { show: !1 }, data: currentUser.storeList }] };
showStore(), currentUser.grade || $(".question").show(), $("#username").text(currentUser.username), $(".exit button").click(function() { userArr[currentIndex].isLogin = !1, localStorage.users = JSON.stringify(userArr), currentUser = null, validateLoginFlag() }), $(".question button").click(function() {
    var t = 0,
        e = 0;
    $(".question input:checked").length < $(".question li").length ? msg("请选择所有问题!") : ($.each($(".question input:checked"), function(e, r) { t += r.value - 0 }), 10 <= t && (e = 1), 15 <= t && (e = 2), 25 <= t && (e = 3), 35 <= t && (e = 4), 45 <= t && (e = 5), userArr[currentIndex].grade = e, localStorage.users = JSON.stringify(userArr), $(".question").hide(), getGrade(e), showFundList())
}), $(".close").click(function() { currentUser.grade ? $(this).parent().hide() : msg("请答卷!") }), $(".level button").click(function() { $(".question").show() }), $("#list-box").on("click", "li i", function() {
    var e = $(this).siblings("a").text();
    currentUser.disLikeArr ? userArr[currentIndex].disLikeArr.push(e) : userArr[currentIndex].disLikeArr = [e], localStorage.users = JSON.stringify(userArr), showFundList()
});
var currentAddFund = {};

function validateLoginFlag() { currentUser || msg("未登录，请去登录", "login.html") }

function getGrade(e) {
    var r = "";
    1 == e && (r = "很低"), 2 == e && (r = "一般"), 3 == e && (r = "中等"), 4 == e && (r = "较高"), 5 == e && (r = "最高"), $("#grade-text").text(r)
}

function showFundList() {
    $("#list-box").html(""), $.each(data, function(e, r) {
        if (r.grade == currentUser.grade) {
            if (currentUser.disLikeArr && -1 !== currentUser.disLikeArr.indexOf(r.name)) return;
            var t = $('<li><a href="' + r.link + '">' + r.name + "</a><span>$" + r.price + "</span><em>添加</em><i>不喜欢</i></li>");
            $("#list-box").append(t)
        }
    })
}

function showHold() {
    var e = currentUser.holdList;
    $("#hold-list").html("");
    var s = 0;
    $.each(e, function(e, r) { s += r.total }), $.each(e, function(e, r) {
        var t = (r.total / s * 100).toFixed(2) + "%",
            n = $('<li><em class="fl">' + r.name + '</em>  <span class="fr">$' + r.total.toFixed(2) + '</span> <i class="fr">' + t + "</i></li>");
        $("#hold-list").append(n)
    })
}

function showStore() { currentUser.storeList && myChart.setOption(option) }
$("#list-box").on("click", "li em", function() { $(".add-box").show(), currentAddFund.name = $(this).siblings("a").text(), currentAddFund.price = $(this).siblings("span").text() }), $(".add-box button").eq(1).click(function() { $(".add-box").hide() }), $(".add-box button").eq(0).click(function() {
    var e = $(".add-box input").val().trim();
    if (0 != e.length)
        if (-1 == e.indexOf(".")) {
            var r = $(".add-box input").val().trim() - 0,
                t = currentAddFund.name,
                n = currentAddFund.price.substr(1) - 0,
                s = { name: t, total: n * r };
            currentUser.holdList = currentUser.holdList || [];
            var i = !0;
            $.each(currentUser.holdList, function(e, r) { r.name == t && (r.total += s.total, i = !1) }), i && currentUser.holdList.push(s), localStorage.users = JSON.stringify(userArr), showHold(), $(".add-box").hide()
        } else msg("不能输入小数");
    else msg("请输入内容")
}), $(".main .btns button").eq(1).click(function() { delete userArr[currentIndex].disLikeArr, localStorage.users = JSON.stringify(userArr), showFundList() }), $("#buy-btn").click(function() {
    currentUser.storeList.length = 0, $.each(currentUser.holdList, function(e, r) {
        var t = { name: r.name, value: r.total };
        currentUser.storeList.push(t)
    }), option.series.data = currentUser.storeList, myChart.setOption(option), localStorage.users = JSON.stringify(userArr), 0 < currentUser.storeList.length && $(".main-r h2").hide()
});