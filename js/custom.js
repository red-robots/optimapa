$(document).ready(function () {
	

	/*
	*
	*	Equal Heights Divs
	*
	------------------------------------*/
	$('.js-blocks').matchHeight();
	
	  // Print events 


function printSelection(node){

  var content=node.innerHTML
  var pwin=window.open('','print_content','width=100,height=100');

  pwin.document.open();
  pwin.document.write('<html><body onload="window.print()">'+content+'</body></html>');
  pwin.document.close();
 
  setTimeout(function(){pwin.close();},1000);

}
	
		
	$("[href]").each(function() {
    			if (this.href == window.location.href) {
        	$(this).addClass("active");
        	}
    		});
			
		/*	if(window.location.href.indexOf("expertise") > -1) {
       $('#main-nav .tree-of-life a').addClass("active");
	        }
	*/
	
	
			// transition effect
		style = 'easeOutQuart';

		// top home row
		$('.home-square-1, .home-square-2, .home-square-3, .home-square-4').hover(
			function() {
				//display heading and caption
				$(this).children('.square-info-1, .square-info-2, .square-info-3, .square-info-4').stop(false,true).animate({top:-100},{duration:200, easing: style});
				$(this).children('.seemore1, .seemore2, .seemore3, .seemore4').stop(true).animate({right:15},{duration:200, easing: style});
				$(this).find('.home-h3').filter(':header').css({display: 'block'});
				//$(this).find('.featuredproject').css({display: 'block'});
			},

			function() {
				//hide heading and caption
				$(this).children('.square-info-1, .square-info-2, .square-info-3, .square-info-4').stop(false,true).animate({top:0},{duration:200, easing: style});
				$(this).children('.seemore1, .seemore2, .seemore3, .seemore4').stop(true).animate({right:125},{duration:200, easing: style});
				$('.home-h3').css({display: 'none'});
			}
		);
		
		// bottom home row
		$('.home-square-5, .home-square-6, .home-square-7, .home-square-8').hover(
			function() {
				//display heading and caption
				$(this).children('.square-info-5, .square-info-6, .square-info-7, .square-info-8').stop(false,true).animate({top:100},{duration:200, easing: style});
				$(this).children('.seemore5, .seemore6, .seemore7, .seemore8').stop(true).animate({right:15},{duration:200, easing: style});
				$(this).find('.home-bottom-h3').filter(':header').css({display: 'block'});
				$(this).find('.featureproject-bottom').css({display: 'block'});
			},

			function() {
				//hide heading and caption
				$(this).children('.square-info-5, .square-info-6, .square-info-7, .square-info-8').stop(false,true).animate({top:0},{duration:200, easing: style});
				$(this).children('.seemore5, .seemore6, .seemore7, .seemore8').stop(true).animate({right:125},{duration:200, easing: style});
				$('.home-bottom-h3').css({display: 'none'});
				$(this).find('.featureproject-bottom').css({display: 'none'});
			}
		);
		
		// Adding an anchor to the pagination
		$('.pavigation a').each(function(i,a){$(a).attr('href',$(a).attr('href')+'#blog')});
		$('.viewall a').each(function(i,a){$(a).attr('href',$(a).attr('href')+'#blog')});
		
		// For the license page columnizer. IF I CAN GET IT BLODDY WORKING!!!!
		$(function(){
			$('.aboutcol1').columnize({width:50});
			
			});

  // this is dfor the isotope jquery for the blog roll
  // we load it int eh alpha container and spit it out in the beta container
  var $alpha = $('#alpha');
  var $container = $('#beta');
  var $checkboxes = $('#filters input');
  
  // init isotope, then insert all items from hidden #alpha
  $container.isotope({
  	itemSelector: '.blog-square',
	animationEngine: 'best-available',
  }).isotope( 'insert', $alpha.find('.blog-square') );
  
  
  
  


	
		
		
	
	
	
				// We only want these styles applied when javascript is enabled
				$('div.content').css('display', 'block');

				// Initially set opacity on thumbs and add
				// additional styling for hover effect on thumbs
				var onMouseOutOpacity = 0.67;
				$('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
					mouseOutOpacity:   onMouseOutOpacity,
					mouseOverOpacity:  1.0,
					fadeSpeed:         'fast',
					exemptionSelector: '.selected'
				});
				
				// Initialize Advanced Galleriffic Gallery
				var gallery = $('#thumbs').galleriffic({
					delay:                     2500,
					numThumbs:                 6,
					preloadAhead:              6,
					enableTopPager:            false,
					enableBottomPager:         false,
					imageContainerSel:         '#slideshow',
					controlsContainerSel:      '#controls',
					captionContainerSel:       '#caption',
					loadingContainerSel:       '#loading',
					renderSSControls:          true,
					renderNavControls:         true,
					playLinkText:              '',
					pauseLinkText:             'Pause Slideshow',
					prevLinkText:              '&lsaquo; Previous Photo',
					nextLinkText:              'Next Photo &rsaquo;',
					nextPageLinkText:          'Next &rsaquo;',
					prevPageLinkText:          '&lsaquo; Prev',
					enableHistory:             true,
					autoStart:                 false,
					syncTransitions:           true,
					defaultTransitionDuration: 900,
					onSlideChange:             function(prevIndex, nextIndex) {
						// 'this' refers to the gallery, which is an extension of $('#thumbs')
						this.find('ul.thumbs').children()
							.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
							.eq(nextIndex).fadeTo('fast', 1.0);

						// Update the photo index display
						this.$captionContainer.find('div.photo-index')
							.html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
					},
					onPageTransitionOut:       function(callback) {
						this.fadeTo('fast', 0.0, callback);
					},
					onPageTransitionIn:        function() {
						var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
						var nextPageLink = this.find('a.next').css('visibility', 'hidden');
						
						// Show appropriate next / prev page links
						if (this.displayedPage > 0)
							prevPageLink.css('visibility', 'visible');

						var lastPage = this.getNumPages() - 1;
						if (this.displayedPage < lastPage)
							nextPageLink.css('visibility', 'visible');

						this.fadeTo('fast', 1.0);
					}
				});

				/**************** Event handlers for custom next / prev page links **********************/

				gallery.find('a.prev').click(function(e) {
					gallery.previousPage();
					e.preventDefault();
				});

				gallery.find('a.next').click(function(e) {
					gallery.nextPage();
					e.preventDefault();
				});

				/****************************************************************************************/

				/**** Functions to support integration of galleriffic with the jquery.history plugin ****/

				// PageLoad function
				// This function is called when:
				// 1. after calling $.historyInit();
				// 2. after calling $.historyLoad();
				// 3. after pushing "Go Back" button of a browser
				function pageload(hash) {
					// alert("pageload: " + hash);
					// hash doesn't contain the first # character.
					if(hash) {
						$.galleriffic.gotoImage(hash);
					} else {
						gallery.gotoIndex(0);
					}
				}

				// Initialize history plugin.
				// The callback is called at once by present location.hash. 
				$.historyInit(pageload, "advanced.html");

				// set onlick event for buttons using the jQuery 1.3 live method
				$("a[rel='history']").live('click', function(e) {
					if (e.button != 0) return true;

					var hash = this.href;
					hash = hash.replace(/^.*#/, '');

					// moves to a new page. 
					// pageload is called at once. 
					// hash don't contain "#", "?"
					$.historyLoad(hash);

					return false;
				});

				/****************************************************************************************/
			});