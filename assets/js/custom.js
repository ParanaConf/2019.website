/**	
	* Template Name: ParanaConf
	* Version: 1.0	
	* Template Scripts
	* Author: chinosoliard
	* Author URI: http://www.chinosoliard.com

	Custom JS
	
	1. FIXED MENU
	2. EVENT TIME COUNTER
	3. MENU SMOOTH SCROLLING
	4. VIDEO POPUP
	5. SPEAKERS SLIDEER ( SLICK SLIDER )
	6. BOOTSTRAP ACCORDION 
	7. MOBILE MENU CLOSE  
	
	
**/



(function( $ ){



	/* ----------------------------------------------------------- */
	/*  1. FIXED MENU
	/* ----------------------------------------------------------- */


	jQuery(window).bind('scroll', function () {
    if ($(window).scrollTop() > 150) {
        $('.navbar').addClass('nav-show');
        
	    } else {
	        $('.navbar').removeClass('nav-show');
	    }
	});

	/* ----------------------------------------------------------- */
	/*  2. EVENT TIME COUNTER
	/* ----------------------------------------------------------- */
	
	$('#event-counter').countdown('2018/03/29 9:00:00').on('update.countdown', function(event) {
	  var $this = $(this).html(event.strftime(''
	    + '<span class="event-counter-block"><span>%D</span> DIAS</span> '
	    + '<span class="event-counter-block"><span>%H</span> HORAS</span> '
	    + '<span class="event-counter-block"><span>%M</span> MINUTOS</span> '
	    + '<span class="event-counter-block"><span>%S</span> SEGUNDOS</span>'));
	});

	
    /* ----------------------------------------------------------- */
	/*  3. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */ 

	 //MENU SCROLLING WITH ACTIVE ITEM SELECTED

	// Cache selectors
	var lastId,
	topMenu = $(".menu"),
	topMenuHeight = topMenu.outerHeight()+13,
	// All list items
	menuItems = topMenu.find('a[href^=\\#]'),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function(){
	  var item = $($(this).attr("href"));
	  if (item.length) { return item; }
	});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+22;
	  jQuery('html, body').stop().animate({ 
	      scrollTop: offsetTop
	  }, 1500);
	  e.preventDefault();
	});

	// Bind to scroll
	jQuery(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href=\\#"+id+"]").parent().addClass("active");
	   }           
	})


	
	/* ----------------------------------------------------------- */
	/*  4. VIDEO POPUP
	/* ----------------------------------------------------------- */

   $('.video-play-btn').on('click', function(event) {
	   
        event.preventDefault();
        
        $('.video-iframe-area').addClass('video-iframe-display');
       
    });
   
    // when click the close btn

    // disappear iframe window
    
    $('.video-close-btn').on('click', function(event) {
	    
	    event.preventDefault();
	    
		$('.video-iframe-area').removeClass('video-iframe-display');
		
    });

    // stop iframe if it is play while close the iframe window

    $('.video-close-btn').click(function(){

        $('.video-iframe').attr('src', $('.video-iframe').attr('src'));

    });

    // when click overlay area

     $('.video-iframe-area').on('click', function(event) {
	    
	    event.preventDefault();
	    
		$('.video-iframe-area').removeClass('video-iframe-display');
		
    });

	$('.video-iframe-area, .video-iframe').on('click', function(e){
	    e.stopPropagation();
	});

		
	/* ----------------------------------------------------------- */
	/*  5. SPEAKERS SLIDEER ( SLICK SLIDER )
	/* ----------------------------------------------------------- */

		$('.speakers-slider').slick({
		  slidesToShow: 4,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: true,
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: true,
		        slidesToShow: 1
		      }
		    }
		  ]
		});

		



	/* ----------------------------------------------------------- */
	/*  6. BOOTSTRAP ACCORDION 
	/* ----------------------------------------------------------- */ 

		/* Start for accordion #1*/
		$('#accordion .panel-collapse').on('shown.bs.collapse', function () {
		$(this).prev().find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
		});
		
		//The reverse of the above on hidden event:
		
		$('#accordion .panel-collapse').on('hidden.bs.collapse', function () {
		$(this).prev().find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
		});


	/* ----------------------------------------------------------- */
	/*  7. MOBILE MENU CLOSE 
	/* ----------------------------------------------------------- */ 

	jQuery('.menu').on('click', 'li a', function() {
	  $('.navbar .in').collapse('hide');
	});





	
	
})( jQuery );



  
	
