// ==UserScript==
// @name         英译中
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Xin
// @match        https://www.tampermonkey.net/faq.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    var div = document.createElement("div");
    div.id = "divOfBin";
    div.setAttribute("style", "height: 200px;width: 200px;background: gray;position: absolute;right: 0px;bottom: 0px;z-index:999");
    //-----------------标题-----------------------
    var title = document.createElement("h1");
    title.innerText = "英译中";
    title.setAttribute("align", "center");
    div.appendChild(title);
    //-----------------输入框---------------------
    var input = document.createElement("input");
    div.appendChild(input);
    //-----------------按钮-----------------------
    var button = document.createElement("button");
    button.innerText = "翻译";
    // 判断字符串是否是英文单词
    function engWord(tex) {
        tex = tex.trim();
        for (var i = 0; i < tex.length; i++) {
            var ch = tex.charAt(i);
            if (!(ch >= 'a' && ch <= 'z') && !(ch >= 'A' && ch <= 'Z')) {
                return false;
            }
        }
        return true;
    }
    // 按钮点击事件
    button.onclick = function () {
        var rawText = input.value;
        if (!rawText) { }
        else if (engWord(rawText)) {
            // 打开有道翻译
            var url = "https://www.youdao.com/w/eng/" + rawText.trim();
            window.open(url);
        }
        else {
            alert('"' + rawText + '"' + "不是纯英文");
        }
    };
    div.appendChild(button);
    // 插入到最前面
    document.body.insertBefore(div, document.body.firstElementChild);
    // 悬浮窗更新位置
    function updateDivPos() {
        div.style.left = document.documentElement.clientWidth - div.offsetWidth + 'px';
        var scollTop = document.documentElement.scrollTop || document.body.scrollTop;
        div.style.top = document.documentElement.clientHeight - div.offsetHeight + scollTop + 'px';
    }
    window.onscroll = window.onresize = updateDivPos; // 当滑动和窗口大小改变时触发
    // 识别鼠标划到的单词
    var show = true;
    document.onmouseup = function (e) {
        var selection = document.getSelection();
        var selectionText = selection.toString();
        if (selectionText) {
            if (!show) {
                show = true;
                div.style.display = "";
                updateDivPos();
            }
            input.value = selectionText;
        }
        else {
            if (show) {
                var x = e.clientX;
                var y = e.clientY;
                var left = div.offsetLeft;
                var right = left + div.offsetWidth;
                var down = document.documentElement.clientHeight;
                var top = down - div.offsetHeight;
                if (x < left || x > right || y < top || y > down) {
                    // 点击在英译中的div外面了
                    show = false;
                    div.style.display = "none";
                }
            }
        }
    }
})();