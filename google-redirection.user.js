// ==UserScript==
// @name         Google Redirection Removal
// @namespace    google.redirection
// @description  移除 Google 搜索结果的链接点击重定向/统计
// @version      0.1
// @match        https://www.google.com/search?*
// @match        https://www.google.com.jp/search?*
// @match        https://www.google.com.sg/search?*
// @match        https://www.google.com.co/search?*
// @match        https://www.google.com.hk/search?*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    var links = document.querySelectorAll('#ires a[onmousedown]');
    for(var i = 0; i < links.length; ++i) {
        links[i].removeAttribute('onmousedown');
    }

})();
