$(document).ready(function () {

	"use strict";
	
	// $("#sidebar").mCustomScrollbar({
 //        theme: "minimal"
 //    });

 //    $('#sidebarCollapse').on('click', function () {
 //        $('#sidebar, #content').toggleClass('active');
 //        $('.collapse.in').toggleClass('in');
 //        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
 //        $(this).toggleClass('sidebar-Collapse');
 //    });

 //    if( $(window).width() <= 576 ){
 //      $('#sidebarCollapse').removeClass('sidebar-Collapse');
 //    }


    $(window).each(function() {
        $('#content').innerHeight( $(window).height() - 60 );
    });


	$('input, textarea').on('keyup', function(){

		if( $(this).val().charCodeAt(0) < 200 ) {
			$(this).attr('dir', 'ltr');
		}else {
			$(this).attr('dir', 'rtl');
		}

	});


    // Show Btn Scroll Top
    $(window).on('scroll', function() {
        if( $(window).scrollTop() >= 250 ) {
            $('.go-up-page').fadeIn();
        }else {
            $('.go-up-page').fadeOut();
        }
    });

    // Click Btn To Scroll Top
    $('.go-up-page').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });


    // Open Menu 
    $('#main-menu .menu-drop').on('click', function() {
        $(this).toggleClass('open').find('ul').slideToggle(300);
    });

    $('#toggle-menu').on('click', function() {
        $('#sidebar').css('right', 0);
        $('#wrapper #overlay').fadeIn();
    });

    $('#wrapper #overlay').on('click', function() {
        $('#sidebar').css('right', '-250px');
        $('#wrapper #overlay').fadeOut();
    });




});