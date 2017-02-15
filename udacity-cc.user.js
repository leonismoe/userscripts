// ==UserScript==
// @name         Udacity CC Fix
// @namespace    Udacity
// @version      0.1
// @description  Auto show English subtitles for Udacity
// @match        https://classroom.udacity.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {

  'use strict';

  function exec(func) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.textContent = '(' + func.toString() + ')();';
    document.body.appendChild(script);
  }

  exec(function() {
    var __yt_hack_interval = 1;
    var __yt_hack_maxcount = 10000;
    var __yt_hack_counter = 0;
    function __yt_hack() {
      if(!window.YT) return false;
      YT.ready(function() {
        YT.__Player = YT.Player;
        YT.Player = function(id, options) {
          if(options && options.playerVars) {
            options.playerVars.cc_lang_pref = 'en';
            options.playerVars.cc_load_policy = 1;
          }
          return new YT.__Player(id, options);
        };
      });
      console.log('Udacity CC Hacked');
      return true;
    }
    function __yt_hack_timer() {
      if(__yt_hack_counter > __yt_hack_maxcount || __yt_hack()) {
          console.info('Udacity CC Hacked or Failed.');
          return;
      }
      __yt_hack_counter++;
      setTimeout(__yt_hack_timer, __yt_hack_interval);
    }
    __yt_hack_timer();
  });

})();
