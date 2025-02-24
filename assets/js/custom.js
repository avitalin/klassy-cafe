(function ($) {
	
	"use strict";

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	
	$('.input-group.date').datepicker({format: "dd.mm.yyyy"});
	

	$('.filters ul li').click(function(){
	  $('.filters ul li').removeClass('active');
	  $(this).addClass('active');
	  
	  var data = $(this).attr('data-filter');
	  $grid.isotope({
	    filter: data
	  })
	});

	var $grid = $(".grid").isotope({
	  itemSelector: ".all",
	  percentPosition: true,
	  masonry: {
	    columnWidth: ".all"
	  }
	})

	$(".Modern-Slider").slick({
	    autoplay:true,
	    autoplaySpeed:10000,
	    speed:600,
	    slidesToShow:1,
	    slidesToScroll:1,
	    pauseOnHover:false,
	    dots:true,
	    pauseOnDotsHover:true,
	    cssEase:'linear',
	   // fade:true,
	    draggable:false,
	    prevArrow:'<button class="PrevArrow"></button>',
	    nextArrow:'<button class="NextArrow"></button>', 
	  });

	$('.search-icon a').on("click", function(event) {
	    event.preventDefault();
	    $("#search").addClass("open");
	    $('#search > form > input[type="search"]').focus();
	  });

	  $("#search, #search button.close").on("click keyup", function(event) {
	    if (
	      event.target == this ||
	      event.target.className == "close" ||
	      event.keyCode == 27
	    ) {
	      $(this).removeClass("open");
	    }
	  });

	  $("#search-box").submit(function(event) {
	    event.preventDefault();
	    return false;
	  });


	$(function() {
        $("#tabs").tabs();
    });


	$('.owl-menu-item').owlCarousel({
		items:5,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:5
			  }
		  }
	  })

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");
			
			$('.scroll-to-section a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');
		  
			var target = this.hash,
			menu = target;
			var target = $(this.hash);
			$('html, body').stop().animate({
				scrollTop: (target.offset().top) - 79
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
	        
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);

// 使用現代的 JavaScript 語法
document.addEventListener('DOMContentLoaded', () => {
  // 替換 jQuery 選擇器
  const portfolio = document.getElementById('portfolio');
  const paragraphs = document.querySelectorAll('p[data-rel]');
  
  paragraphs.forEach(p => {
    p.addEventListener('click', () => {
      const selectedClass = p.getAttribute('data-rel');
      
      // 使用現代的動畫 API
      portfolio.animate([
        { opacity: 1 },
        { opacity: 0.1 }
      ], {
        duration: 50,
        fill: 'forwards'
      });
      
      // 使用更有效率的 DOM 操作
      document.querySelectorAll(`#portfolio div:not(.${selectedClass})`)
        .forEach(div => div.style.display = 'none');
        
      setTimeout(() => {
        document.querySelectorAll(`#portfolio .${selectedClass}`)
          .forEach(div => div.style.display = 'block');
          
        portfolio.animate([
          { opacity: 0.1 },
          { opacity: 1 }
        ], {
          duration: 50,
          fill: 'forwards'
        });
      }, 500);
    });
  });
});

// 預約表單處理
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservation-form');
  const notification = document.getElementById('notification');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    try {
      // Add actual form submission logic here
      // await fetch('/api/reservation', {
      //   method: 'POST',
      //   body: formData
      // });
      
      showNotification('Reservation successful! We look forward to serving you ✨');
      
      form.reset();
      
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 1000);
      
    } catch (error) {
      console.error('Reservation submission failed:', error);
      showNotification('Sorry, reservation failed. Please try again later', true);
    }
  });

  // Show notification with custom message
  function showNotification(message, isError = false) {
    notification.textContent = message;
    if (isError) {
      notification.style.background = '#ef4444';
    } else {
      notification.style.background = 'var(--primary-light)';
    }
    
    notification.classList.add('show');
    
    notification.animate([
      { transform: 'translate(-50%, 20px) scale(0.95)', opacity: 0 },
      { transform: 'translate(-50%, 0) scale(1)', opacity: 1 }
    ], {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });

    setTimeout(() => {
      notification.animate([
        { transform: 'translate(-50%, 0) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -20px) scale(0.95)', opacity: 0 }
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }).onfinish = () => {
        notification.classList.remove('show');
      };
    }, 3000);
  }

  // 添加提示框關閉按鈕事件
  const closeButtons = document.querySelectorAll('.notification .close-btn');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.notification').classList.remove('show');
    });
  });
});

// 平滑滾動功能優化
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});