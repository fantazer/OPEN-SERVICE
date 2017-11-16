
$(document).ready(function(){

	//$(".progress-bar").loading();
	

	
	//video bg
	$('.main-section').vide(
	{
		webm:'img/video.webm'
	},
	{
		muted: true,
		loop: true,
		posterType:"webm"
	});
	//video bg end

	//modal
	$('.modal-content').click(function(event){
		event.stopPropagation();
	});
	var scrollPos = 0;

	var openModal = function () {
	if(!$('.modal-layer').hasClass('modal-layer-show')){
		$('.modal-layer').addClass('modal-layer-show');
	}
	 scrollPos = $(window).scrollTop();
		$('body').css({
			overflow: 'hidden',
			position: 'fixed',
			overflowY: 'scroll',
			top : -scrollPos,
			width:'100%'
		});
		return scrollPos;
	};

	var closeModal = function () {
  	$('.modal-layer').removeClass('modal-layer-show');
  	$("body").removeClass("modal-fix");
  	$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
    $(window).scrollTop(scrollPos);
    $('.modal').removeClass('modal__show');
		$('.enter').removeClass('enter--open');
		$('.basket').removeClass('basket--open');
	};

	var initModal = function(el){
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal')===el){
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
		$('.modal-wrap').css('height',modalHeightCont );
		$('.modal-wrap').css('minHeight',modalHeightCont );
	}

	$('.modal-get').click(function (){
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function (){
		closeModal();
	});
	//modal




	//toggle pin
		$('.config__toggle-pin').click(function(){
			$(this).toggleClass("config__toggle-pin--active");
			$(this).closest('.config-el').toggleClass("config-content--active");
		});
	//toggle pin==edn



	$('.config__stat').click(function(e){
			$('.config__tip').removeClass("config__tip--show");
			if(
				!$(this)
				.closest('.config-el')
				.find('.config__toggle-pin')
				.hasClass("config__toggle-pin--active")
				)
			{
				$(this).find('.config__tip').toggleClass("config__tip--show").click(function(e){
						e.stopPropagation();
				});
				e.stopPropagation();

				$('.tooltip-filter').addClass('tooltip-filter--show');
				//init progress bar
				$(".progress-bar").circleProgress({
					animation:true,
					size: 150,
					startAngle:-1.6,
					lineCap: 'round',
					thickness:10,
					fill:'#F0383E',
					emptyFill:"#7476E3"
				});
				var valueChart = $('.progress-bar').data('percent');
				$('.value-chart').text("-" + valueChart + "%");
				//init progress bar
			}
		});

		$('.tooltip-filter').click(function(){
			$('.tooltip-filter').removeClass('tooltip-filter--show');
		});
		$(document).on("click", function () {
				$('.config__tip').removeClass("config__tip--show");
		});
	// tooltip === end


	//town-list
	$('.header-info__toggle').click(function(event){
				event.stopPropagation();
				$(".header-info__sub").slideToggle("fast");
		});
		$(".header-info__sub").on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(".header-info__sub").slideUp();
		});

		$('.header-info__sub-el').click(function(){
			$('.header-info__sub-el').removeClass('header-info__sub-el--active');
			$(this).addClass('header-info__sub-el--active');
			$(".header-info__sub").slideUp();

			var curentTxt = $(this).text();
			$('.header-info__text span').text(curentTxt);
		});
	//town-list===end

	//slider clients
	$('.client-slider-container').slick({
			slidesToShow: 1,
			autoplay: true,
			speed: 500,
			vertical:false,
			prevArrow: $('.client-slider__nav-el-left'),
			nextArrow: $('.client-slider__nav-el-right')
	});
	//slider===end

	//slider clients
	$('.main-section-slider').slick({
			slidesToShow: 1,
			//autoplay: true,
			speed: 500,
			vertical:false,
			prevArrow: $('.slider-control__el--left'),
			nextArrow: $('.slider-control__el--right')
	});
	//slider===end

	//Tab
	var initTab = function(el){
		$(el+' .tab-head').click(function(){
		var currentTab = $(this).index();
			$(el+' .tab-head').removeClass('tab-head--active');
			$(this).addClass('tab-head--active');
			$(el+' .tab-cont').each(function(){
				if($(this).index()==currentTab){
					$(this).addClass('tab-cont--active')
				}else{
					$(this).removeClass('tab-cont--active')
				}
			})
		});
	};
	initTab('.solution');
	initTab('.footer-tab');
	//Tab===end


	//animate values percent charts
		//chart
	$(".main-chart-bar").circleProgress({
    value: 0,
    size: 380,
    startAngle:-1.6,
    lineCap: 'round',
    thickness:20,
    fill: {
      gradient: ["#6972da", "#a076dd"]
    },
    animation: {
					duration: 3000,
					easing: 'circleProgressEasing'
			}
  });
	//chart===end

	var mainChartConst = 3.5;
	var currentPercent;
	$('.config__toggle-pin').click(function(){
		var mainChartVal = 0;
		$('.config__stat').each(function(){
			if(!$(this).closest('.config-el').hasClass('config-content--active')){
				currentPercent = $(this).find('.progress-bar').data('value')*100;
				mainChartVal += currentPercent/3.5;
				console.log('currentPercent',currentPercent);

				return mainChartVal;
			}
		});
		console.log('mainChartVal',mainChartVal);
		$('.main-chart-bar').circleProgress(
			'value', mainChartVal/100
		);
		var currentNumber = $('.chart-percent-val').text();
		$({numberValue: currentNumber}).animate({numberValue: mainChartVal*3.5}, {
				duration: 2000,
				easing: 'linear',
				step: function (now) {
								$('.chart-percent-val').text(now.toFixed(0));
				}
		});


		return mainChartVal;
	});
	//animate values percent charts=== end


	function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

	console.log(detectIE());
	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
		 '<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
		'</div>');
	}

	//for init SVG 
	svg4everybody();
	// ==== clear storage =====
	 localStorage.clear();
	 sessionStorage.clear();
	 $(window).unload(function(){
		 localStorage.clear();
	 });
	// ==== clear storage end =====

	
	/* ###### For SlideToggle Elements  ######*/
	/*var hideToggle = function(targetClick,toggleEl) {
		$(targetClick).click(function(event){
				event.stopPropagation();
				$(toggleEl).slideToggle("fast");
		});
		$(toggleEl).on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(toggleEl).hide();
		});
	}
	hideToggle('.icon-bars','.top-menu_link');*/

})

//cash SVG

;( function( window, document )
{
	'use strict';

	var file  = 'img/pack.html',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );


;
(function ($) {
	$.fn.loading = function () {
		var DEFAULTS = {
			percent: 75,
			duration: 1000
		};

		$(this).each(function () {
			var $target = $(this);

			var opts = {
				backgroundColor: $target.data('color') ? $target.data('color').split(',')[0] : DEFAULTS.backgroundColor,
				progressColor: $target.data('color') ? $target.data('color').split(',')[1] : DEFAULTS.progressColor,
				percent: $target.data('percent') ? $target.data('percent') : DEFAULTS.percent,
				duration: $target.data('duration') ? $target.data('duration') : DEFAULTS.duration
			};
			// console.log(opts);

			$target.append('<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span class="value-chart"></span></div>');

			$target.find('.background').css('background-color', opts.backgroundColor);
			$target.find('.left').css('background-color', opts.backgroundColor);
			$target.find('.rotate').css('background-color', opts.progressColor);
			$target.find('.right').css('background-color', opts.progressColor);

			var $rotate = $target.find('.rotate');
			setTimeout(function () {
				$rotate.css({
					'transition': 'transform ' + opts.duration + 'ms linear',
					'transform': 'rotate(' + opts.percent * 3.6 + 'deg)'
				});
			}, 1);

			if (opts.percent > 50) {
				var animationRight = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-end';
				var animationLeft = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-start';
				$target.find('.right').css({
					animation: animationRight,
					opacity: 1
				});
				$target.find('.left').css({
					animation: animationLeft,
					opacity: 0
				});
			}
		});
	}
})(jQuery);