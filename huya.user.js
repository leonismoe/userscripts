// ==UserScript==
// @name         Fuck Huya
// @namespace    huya
// @description  Bypass Huya's enforceLowestBitRate restriction
// @version      0.1
// @match        http://www.huya.com/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

GM_addStyle('.player-banner-gift, .player-banner-enter, #player-marquee-bg { display: none !important; visibility: hidden !important; opacity: 0 !important; }');

const __Function = unsafeWindow.Function;
const fakeFunction = function() {
    var args = Array.from(arguments);
    var body = args.pop();
    var keyword_offset = body.indexOf('enforceLowestBitRate');
    if (keyword_offset > -1) {
        var declare_begin = body.lastIndexOf('var ', keyword_offset);
        var declare_end   = body.indexOf('];', keyword_offset) + 2;
        var declare_str   = body.slice(declare_begin, declare_end);
        var declare_equal = declare_str.indexOf('=');
        var declare_name  = declare_str.slice(4, declare_equal);
        var declare_body  = declare_str.slice(declare_equal + 1);
        var table = (new Function('return ' + declare_body))();
        var offset = table.indexOf('enforceLowestBitRate');
        table = null;
        var str = '[' + declare_name + '[' + offset + ']]';
        var regex_str = str.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        var regex_assignment = new RegExp(regex_str + '\\s*=\\s*(\\!\\d|true|false)', 'g');
        body = body.replace(regex_assignment, '.enforceLowestBitRate = false');
        body = body.replace(new RegExp('if\\s*\\(' + regex_str + '\\)', 'g'), 'if (false)');
        unsafeWindow.Function = __Function;
    }
    return __Function.apply(this, args.concat(body));
};
fakeFunction.__proto__ = __Function;
fakeFunction.prototype = Object.create(__Function.prototype);
fakeFunction.prototype.constructor = __Function;
unsafeWindow.Function = fakeFunction;
