// ==UserScript==
// @name         城通网盘
// @namespace    ctfile
// @description  使城通网盘的下载按钮可通过右键获取到下载链接
// @version      0.1
// @match        http://*.ctfile.com/downhtml/*
// @match        https://*.ctfile.com/downhtml/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function() {

    'use strict';

    if (unsafeWindow.free_down_action) {
        rewrite_donwload_button('#free_guest_down_link');
        rewrite_donwload_button('#free_down_link');
    }

    function rewrite_donwload_button(node) {
        if (typeof node == 'string') {
            node = document.querySelectorAll(node);
        }
        if (!node) {
            return false;
        }
        var nodes = 'length' in node ? Array.from(node) : [node];
        nodes.forEach(function(v, k) {
            if (!v) {
                return;
            }
            var str = v.getAttribute('onclick');
            var matches = str.match(/free_down_action\(["']([^"']+)["'],\s*['"]([^"']+)["']\)/);
            var url = matches[1];
            var chunkId = matches[2];
            v.onclick = null;
            v.setAttribute('href', url + '&mtd=1');
        });
    }

})();
