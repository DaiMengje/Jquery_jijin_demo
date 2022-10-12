/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-23 15:29:54
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-30 11:10:10
 * @FilePath: \基金项目\JS\commen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 星空背景
var shadowBox = $('<div class="shadowBox"></div>')
    // $('body').append(shadowBox)
$(shadowBox).insertBefore('.starbox')
var arr = new Array(300)
var shadowStr = ''
$.each(arr, function(i, item) {
        var randx = Math.floor(Math.random() * 2000);
        var randy = Math.floor(Math.random() * 1000);
        var randAh = Math.random();
        if (i == arr.length - 1) {
            shadowStr += randx + 'px ' + randy + 'px 1px 0px rgba(200,200,200,' + randAh + ')'
        } else {
            shadowStr += randx + 'px ' + randy + 'px 1px 0px rgba(200,200,200,' + randAh + '),'

        }

        shadowBox.css({
            boxShadow: shadowStr
        })
    })
    // 星空背景


// 遮罩层封装
function dialog(text, callback) {
    var box = $('<div class="shadowbody"></div>');
    var html = '<div class="shadowbox"><p class="shadowtitle">' + text + '</p><div class="commonbtn" id="dialogbtn">确定</div></div>';
    box.html(html);
    $('body').append(box);
    $('#dialogbtn').click(function() {
        box.remove();
        callback && callback();
    })
}