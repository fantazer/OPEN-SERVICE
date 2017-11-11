$(document).ready(function(){

	//toggle pin
		$('.config__toggle-pin').click(function(){
			$(this).toggleClass("config__toggle-pin--active");
			$(this).closest('.config-el').find('.config-content').toggleClass("config-content--active");
		});
	//toggle pin==edn

	// tooltip
	$('.config__stat ').click(function(e){
			$(this).find('.config__tip').toggleClass("config__tip--show").click(function(e){
					e.stopPropagation();
			});
			e.stopPropagation();
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