$(document).ready(function(){function e(){var e=window.navigator.userAgent,o=e.indexOf("MSIE ");if(o>0)return parseInt(e.substring(o+5,e.indexOf(".",o)),10);var t=e.indexOf("Trident/");if(t>0){var i=e.indexOf("rv:");return parseInt(e.substring(i+3,e.indexOf(".",i)),10)}var n=e.indexOf("Edge/");return n>0&&parseInt(e.substring(n+5,e.indexOf(".",n)),10)}$(".main-section").vide({webm:"img/video.webm"},{muted:!0,loop:!0,posterType:"webm"}),$(".modal-content").click(function(e){e.stopPropagation()});var o=0,t=function(){return $(".modal-layer").hasClass("modal-layer-show")||$(".modal-layer").addClass("modal-layer-show"),o=$(window).scrollTop(),$("body").css({overflow:"hidden",position:"fixed",overflowY:"scroll",top:-o,width:"100%"}),o},i=function(){$(".modal-layer").removeClass("modal-layer-show"),$("body").removeClass("modal-fix"),$("body").css({overflow:"",position:"",top:""}),$(window).scrollTop(o),$(".modal").removeClass("modal__show"),$(".enter").removeClass("enter--open"),$(".basket").removeClass("basket--open")},n=function(e){t(),$(".modal").each(function(){$(this).data("modal")===e?$(this).addClass("modal__show"):$(this).removeClass("modal__show")});var o=$(window).height();$(".modal-filter").height(o),$(".modal-wrap").css("height",o),$(".modal-wrap").css("minHeight",o)};$(".modal-get").click(function(){var e=$(this).data("modal");n(e)}),$(".modal-layer , .modal-close").click(function(){i()}),$(".config__stat").add(".config__toggle-slide").click(function(e){if($(".config__tip").removeClass("config__tip--show"),!$(this).closest(".config-el").find(".config__toggle-pin").hasClass("config__toggle-pin--active")){$(this).find(".config__tip").toggleClass("config__tip--show").click(function(e){e.stopPropagation()}),e.stopPropagation(),$(this).hasClass(".config__stat")?$(".tooltip-filter").addClass("tooltip-filter--show"):($(".config__toggle-slide").is(":visible")&&$(this).closest(".config-el").find(".config-content").slideToggle(),$(this).toggleClass("config__toggle--active")),$(".progress-bar").circleProgress({animation:!0,size:150,startAngle:-1.6,lineCap:"round",thickness:10,fill:"#F0383E",emptyFill:"#7476E3"});var o=$(".progress-bar").data("percent");$(".value-chart").text("-"+o+"%")}}),$(".tooltip-filter").click(function(){$(".tooltip-filter").removeClass("tooltip-filter--show")}),$(document).on("click",function(){$(".config__tip").removeClass("config__tip--show")}),$(".header-info__toggle").click(function(e){e.stopPropagation(),$(this).find(".header-info__sub").slideToggle("fast")}),$(".header-info__sub").on("click",function(e){e.stopPropagation()}),$(document).on("click",function(){$(".header-info__sub").slideUp()}),$(".header-info__sub-el").click(function(){$(".header-info__sub-el").removeClass("header-info__sub-el--active"),$(this).addClass("header-info__sub-el--active"),$(".header-info__sub").slideUp();var e=$(this).text();$(".header-info__text span").text(e)}),$(".client-slider-container").slick({slidesToShow:1,autoplay:!1,speed:500,vertical:!1,prevArrow:$(".client-slider__nav-el-left"),nextArrow:$(".client-slider__nav-el-right")}),$(".main-section-slider").slick({slidesToShow:1,speed:1e3,vertical:!1,prevArrow:$(".slider-control__el--left"),nextArrow:$(".slider-control__el--right")});var a=function(e){$(e+" .tab-head").click(function(){var o=$(this).index();$(e+" .tab-head").removeClass("tab-head--active"),$(this).addClass("tab-head--active"),$(e+" .tab-cont").each(function(){$(this).index()==o?$(this).addClass("tab-cont--active"):$(this).removeClass("tab-cont--active")})})};a(".solution"),a(".footer-tab"),$(".main-chart-bar").circleProgress({value:0,size:380,startAngle:-1.6,lineCap:"round",thickness:20,fill:{gradient:["#6972da","#a076dd"]},animation:{duration:3e3,easing:"circleProgressEasing"}});var s;$(".config__toggle-pin").click(function(){$(this).closest(".config-el").hasClass("config-content--active")||$(this).closest(".config-el").find(".config__toggle-slide").removeClass("config__toggle--active"),$(".config__toggle-slide").is(":visible")&&$(this).closest(".config-el").find(".config-content").slideUp(),$(this).toggleClass("config__toggle-pin--active"),$(this).closest(".config-el").toggleClass("config-content--active");var e=0;$(".config__stat ").each(function(){if(!$(this).closest(".config-el").hasClass("config-content--active"))return s=100*$(this).find(".progress-bar").data("value"),e+=s/3.5,console.log("currentPercent",s),e}),$(".main-chart-bar").circleProgress("value",e/100);var o=$(".chart-percent-val").text();return $({numberValue:o}).animate({numberValue:3.5*e},{duration:2e3,easing:"linear",step:function(e){$(".chart-percent-val").text(e.toFixed(0))}}),e}),console.log(e()),e()<=14&&e()&&($("body").empty(),$("body").prepend('<div class="old-browser"><div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br><div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br></div>')),svg4everybody(),localStorage.clear(),sessionStorage.clear(),$(window).unload(function(){localStorage.clear()});var r=function(e,o,i){$(e).click(function(e){e.stopPropagation(),$(o).addClass(i),t()}),$(o).on("click",function(e){e.stopPropagation()}),$(document).on("click",function(){$(o).removeClass(i)})};r(".header-toggle",".nav","nav--open"),r(".header-mobile__icon",".nav","nav--open"),$(".header-mobile__icon").click(function(){$("body").addClass("body-window")}),$(".nav-close").click(function(){$(".nav").removeClass("nav--open"),$("body").removeClass("body-window"),i()});var l=$(window).width(),c=function(){l<1025&&l>640?$(".main-chart-wrap").stick_in_parent({offset_top:100}):$(".main-chart-wrap").trigger("sticky_kit:detach")},d=function(){l<641&&$(".tools-wrap, .facts-wrap").not(".slick-initialized").slick({responsive:[{breakpoint:9999,settings:"unslick"},{breakpoint:640,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0,prevArrow:!1,nextArrow:!1,dots:!0}}]})},g=function(){};c(),d(),g(),$(window).resize(function(){var e=$(window).width();return d(),c(),g(),e})}),function(e,o){"use strict";var t="img/pack.html",i=1;if(!o.createElementNS||!o.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)return!0;var n,a,s="localStorage"in e&&null!==e.localStorage,r=function(){o.body.insertAdjacentHTML("afterbegin",a)},l=function(){o.body?r():o.addEventListener("DOMContentLoaded",r)};if(s&&localStorage.getItem("inlineSVGrev")==i&&(a=localStorage.getItem("inlineSVGdata")))return l(),!0;try{n=new XMLHttpRequest,n.open("GET",t,!0),n.onload=function(){n.status>=200&&n.status<400&&(a=n.responseText,l(),s&&(localStorage.setItem("inlineSVGdata",a),localStorage.setItem("inlineSVGrev",i)))},n.send()}catch(c){}}(window,document),function(e){e.fn.loading=function(){var o={percent:75,duration:1e3};e(this).each(function(){var t=e(this),i={backgroundColor:t.data("color")?t.data("color").split(",")[0]:o.backgroundColor,progressColor:t.data("color")?t.data("color").split(",")[1]:o.progressColor,percent:t.data("percent")?t.data("percent"):o.percent,duration:t.data("duration")?t.data("duration"):o.duration};t.append('<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span class="value-chart"></span></div>'),t.find(".background").css("background-color",i.backgroundColor),t.find(".left").css("background-color",i.backgroundColor),t.find(".rotate").css("background-color",i.progressColor),t.find(".right").css("background-color",i.progressColor);var n=t.find(".rotate");if(setTimeout(function(){n.css({transition:"transform "+i.duration+"ms linear",transform:"rotate("+3.6*i.percent+"deg)"})},1),i.percent>50){var a="toggle "+i.duration/i.percent*50+"ms step-end",s="toggle "+i.duration/i.percent*50+"ms step-start";t.find(".right").css({animation:a,opacity:1}),t.find(".left").css({animation:s,opacity:0})}})}}(jQuery);