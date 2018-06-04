// version 1.6.0
// http://welcome.totheinter.net/columnizer-jquery-plugin/
// created by: Adam Wulf @adamwulf, adam.wulf@gmail.com

(function($){

 $.fn.columnize = function(options) {


	var defaults = {
		// default width of columns
		width: 400,
		// optional # of columns instead of width
		columns : false,
		// true to build columns once regardless of window resize
		// false to rebuild when content box changes bounds
		buildOnce : false,
		// an object with options if the text should overflow
		// it's container if it can't fit within a specified height
		overflow : false,
		// this function is called after content is columnized
		doneFunc : function(){},
		// if the content should be columnized into a 
		// container node other than it's own node
		target : false,
		// re-columnizing when images reload might make things
		// run slow. so flip this to true if it's causing delays
		ignoreImageLoading : true,
		// should columns float left or right
		columnFloat : "left",
		// ensure the last column is never the tallest column
		lastNeverTallest : false,
		// (int) the minimum number of characters to jump when splitting
		// text nodes. smaller numbers will result in higher accuracy
		// column widths, but will take slightly longer
		accuracy : false,
		// don't automatically layout columns, only use manual columnbreak
		manualBreaks : false,
		// previx for all the CSS classes used by this plugin
		// default to empty string for backwards compatibility
		cssClassPrefix : ""
	};
	options = $.extend(defaults, options);

	if(typeof(options.width) == "string"){
		options.width = parseInt(options.width,10);
		if(isNaN(options.width)){
			options.width = defaults.width;
		}
	}

    return this.each(function() {
		var $inBox = options.target ? $(options.target) : $(this);
		var maxHeight = $(this).height();
		var $cache = $('<div></div>'); // this is where we'll put the real content
		var lastWidth = 0;
		var columnizing = false;
		var manualBreaks = options.manualBreaks;
		var cssClassPrefix = defaults.cssClassPrefix;
		if(typeof(options.cssClassPrefix) == "string"){
			cssClassPrefix = options.cssClassPrefix;
		}


		var adjustment = 0;

		$cache.append($(this).contents().clone(true));

		// images loading after dom load
		// can screw up the column heights,
		// so recolumnize after images load
		if(!options.ignoreImageLoading && !options.target){
			if(!$inBox.data("imageLoaded")){
				$inBox.data("imageLoaded", true);
				if($(this).find("img").length > 0){
					// only bother if there are
					// actually images...
					var func = function($inBox,$cache){ return function(){
							if(!$inBox.data("firstImageLoaded")){
								$inBox.data("firstImageLoaded", "true");
								$inBox.empty().append($cache.children().clone(true));
								$inBox.columnize(options);
							}
						};
					}($(this), $cache);
					$(this).find("img").one("load", func);
					$(this).find("img").one("abort", func);
					return;
				}
			}
		}

		$inBox.empty();

		columnizeIt();

		if(!options.buildOnce){
			$(window).resize(function() {
				if(!options.buildOnce){
					if($inBox.data("timeout")){
						clearTimeout($inBox.data("timeout"));
					}
					$inBox.data("timeout", setTimeout(columnizeIt, 200));
				}
			});
		}

		function prefixTheClassName(className, withDot){
			var dot = withDot ? "." : "";
			if(cssClassPrefix.length){
				return dot + cssClassPrefix + "-" + className;
			}
			return dot + className;
		}

		/**
		 * this fuction builds as much of a column as it can without
		 * splitting nodes in half. If the last node in the new column
		 * is a text node, then it will try to split that text node. otherwise
		 * it will leave the node in $pullOutHere and return with a height
		 * smaller than targetHeight.
		 * 
         * Returns a boolean on whether we did some splitting successfully at a text point
         * (so we know we don't need to split a real element). return false if the caller should
         * split a node if possible to end this column.
		 *
		 * @param putInHere, the jquery node to put elements into for the current column
		 * @param $pullOutHere, the jquery node to pull elements out of (uncolumnized html)
		 * @param $parentColumn, the jquery node for the currently column that's being added to
		 * @param targetHeight, the ideal height for the column, get as close as we can to this height
		 */
		function columnize($putInHere, $pullOutHere, $parentColumn, targetHeight){
			//
			// add as many nodes to the column as we can,
			// but stop once our height is too tall
			while((manualBreaks || $parentColumn.height() < targetHeight) &&
				$pullOutHere[0].childNodes.length){
				var node = $pullOutHere[0].childNodes[0];
				//
				// Because we're not cloning, jquery will actually move the element"
				// http://welcome.totheinter.net/2009/03/19/the-undocumented-life-of-jquerys-append/
				if($(node).find(prefixTheClassName("columnbreak", true)).length){
					//
					// our column is on a column break, so just end here
					return;
				}
				if($(node).hasClass(prefixTheClassName("columnbreak"))){
					//
					// our column is on a column break, so just end here
					return;
				}
				$putInHere.append(node);
			}
			if($putInHere[0].childNodes.length === 0) return;

			// now we're too tall, so undo the last one
			var kids = $putInHere[0].childNodes;
			var lastKid = kids[kids.length-1];
			$putInHere[0].removeChild(lastKid);
			var $item = $(lastKid);

			// now lets try to split that last node
			// to fit as much of it as we can into this column
			if($item[0].nodeType == 3){
				// it's a text node, split it up
				var oText = $item[0].nodeValue;
				var counter2 = options.width / 18;
				if(options.accuracy)
				counter2 = options.accuracy;
				var columnText;
				var latestTextNode = null;
				while($parentColumn.height() < targetHeight && oText.length){
					var indexOfSpace = oText.indexOf(' ', counter2);
					if (indexOfSpace != -1) {
						columnText = oText.substring(0, oText.indexOf(' ', counter2));
					} else {
						columnText = oText;
					}
					latestTextNode = document.createTextNode(columnText);
					$putInHere.append(latestTextNode);

					if(oText.length > counter2 && indexOfSpace != -1){
						oText = oText.substring(indexOfSpace);
					}else{
						oText = "";
					}
				}
				if($parentColumn.height() >= targetHeight && latestTextNode !== null){
					// too tall :(
					$putInHere[0].removeChild(latestTextNode);
					oText = latestTextNode.nodeValue + oText;
				}
				if(oText.length){
					$item[0].nodeValue = oText;
				}else{
					return false; // we ate the whole text node, move on to the next node
				}
			}

			if($pullOutHere.contents().length){
				$pullOutHere.prepend($item);
			}else{
				$pullOutHere.append($item);
			}

			return $item[0].nodeType == 3;
		}

		/**
		 * Split up an element, which is more complex than splitting text. We need to create 
		 * two copies of the element with it's contents divided between each
		 */
		function split($putInHere, $pullOutHere, $parentColumn, targetHeight){
			if($putInHere.contents(":last").find(prefixTheClassName("columnbreak", true)).length){
				//
				// our column is on a column break, so just end here
				return;
			}
			if($putInHere.contents(":last").hasClass(prefixTheClassName("columnbreak"))){
				//
				// our column is on a column break, so just end here
				return;
			}
			if($pullOutHere.contents().length){
				var $cloneMe = $pullOutHere.contents(":first");
				//
				// make sure we're splitting an element
				if($cloneMe.get(0).nodeType != 1) return;

				//
				// clone the node with all data and events
				var $clone = $cloneMe.clone(true);
				//
				// need to support both .prop and .attr if .prop doesn't exist.
				// this is for backwards compatibility with older versions of jquery.
				if($cloneMe.hasClass(prefixTheClassName("columnbreak"))){
					//
					// ok, we have a columnbreak, so add it into
					// the column and exit
					$putInHere.append($clone);
					$cloneMe.remove();
				}else if (manualBreaks){
					// keep adding until we hit a manual break
					$putInHere.append($clone);
					$cloneMe.remove();
				}else if($clone.get(0).nodeType == 1 && !$clone.hasClass(prefixTheClassName("dontend"))){
					$putInHere.append($clone);
					if($clone.is("img") && $parentColumn.height() < targetHeight + 20){
						//
						// we can't split an img in half, so just add it
						// to the column and remove it from the pullOutHere section
						$cloneMe.remove();
					}else if(!$cloneMe.hasClass(prefixTheClassName("dontsplit")) && $parentColumn.height() < targetHeight + 20){
						//
						// pretty close fit, and we're not allowed to split it, so just
						// add it to the column, remove from pullOutHere, and be done
						$cloneMe.remove();
					}else if($clone.is("img") || $cloneMe.hasClass(prefixTheClassName("dontsplit"))){
						//
						// it's either an image that's too tall, or an unsplittable node
						// that's too tall. leave it in the pullOutHere and we'll add it to the 
						// next column
						$clone.remove();
					}else{
						//
						// ok, we're allowed to split the node in half, so empty out
						// the node in the column we're building, and start splitting
						// it in half, leaving some of it in pullOutHere
						$clone.empty();
						if(!columnize($clone, $cloneMe, $parentColumn, targetHeight)){
							// this node still has non-text nodes to split
							// add the split class and then recur
							$cloneMe.addClass(prefixTheClassName("split"));
							if($cloneMe.children().length){
								split($clone, $cloneMe, $parentColumn, targetHeight);
							}
						}else{
							// this node only has text node children left, add the
							// split class and move on.
							$cloneMe.addClass(prefixTheClassName("split"));
						}
						if($clone.get(0).childNodes.length === 0){
							// it was split, but nothing is in it :(
							$clone.remove();
						}
					}
				}
			}
		}


		function singleColumnizeIt() {
			if ($inBox.data("columnized") && $inBox.children().length == 1) {
				return;
			}
			$inBox.data("columnized", true);
			$inBox.data("columnizing", true);

			$inBox.empty();
			$inBox.append($("<div class='"
				+ prefixTheClassName("first") + " "
				+ prefixTheClassName("last") + " "
				+ prefixTheClassName("column") + " "
				+ "' style='width:100%; float: " + options.columnFloat + ";'></div>")); //"
			$col = $inBox.children().eq($inBox.children().length-1);
			$destroyable = $cache.clone(true);
			if(options.overflow){
				targetHeight = options.overflow.height;
				columnize($col, $destroyable, $col, targetHeight);
				// make sure that the last item in the column isn't a "dontend"
				if(!$destroyable.contents().find(":first-child").hasClass(prefixTheClassName("dontend"))){
					split($col, $destroyable, $col, targetHeight);
				}

				while($col.contents(":last").length && checkDontEndColumn($col.contents(":last").get(0))){
					var $lastKid = $col.contents(":last");
					$lastKid.remove();
					$destroyable.prepend($lastKid);
				}

				var html = "";
				var div = document.createElement('DIV');
				while($destroyable[0].childNodes.length > 0){
					var kid = $destroyable[0].childNodes[0];
					if(kid.attributes){
						for(var i=0;i<kid.attributes.length;i++){
							if(kid.attributes[i].nodeName.indexOf("jQuery") === 0){
								kid.removeAttribute(kid.attributes[i].nodeName);
							}
						}
					}
					div.innerHTML = "";
					div.appendChild($destroyable[0].childNodes[0]);
					html += div.innerHTML;
				}
				var overflow = $(options.overflow.id)[0];
				overflow.innerHTML = html;

			}else{
				$col.append($destroyable);
			}
			$inBox.data("columnizing", false);

			if(options.overflow && options.overflow.doneFunc){
				options.overflow.doneFunc();
			}

		}

		/**
		 * returns true if the input dom node
		 * should not end a column.
		 * returns false otherwise
		 */
		function checkDontEndColumn(dom){
			if(dom.nodeType == 3){
				// text node. ensure that the text
				// is not 100% whitespace
				if(/^\s+$/.test(dom.nodeValue)){
						//
						// ok, it's 100% whitespace,
						// so we should return checkDontEndColumn
						// of the inputs previousSibling
						if(!dom.previousSibling) return false;
					return checkDontEndColumn(dom.previousSibling);
				}
				return false;
			}
			if(dom.nodeType != 1) return false;
			if($(dom).hasClass(prefixTheClassName("dontend"))) return true;
			if(dom.childNodes.length === 0) return false;
			return checkDontEndColumn(dom.childNodes[dom.childNodes.length-1]);
		}

		function columnizeIt() {
			//reset adjustment var
			adjustment = 0;
			if(lastWidth == $inBox.width()) return;
			lastWidth = $inBox.width();

			var numCols = Math.round($inBox.width() / options.width);
			var optionWidth = options.width;
			var optionHeight = options.height;
			if(options.columns) numCols = options.columns;
			if(manualBreaks){
				numCols = $cache.find(prefixTheClassName("columnbreak", true)).length + 1;
				optionWidth = false;
			}

//			if ($inBox.data("columnized") && numCols == $inBox.children().length) {
//				return;
//			}
			if(numCols <= 1){
				return singleColumnizeIt();
			}
			if($inBox.data("columnizing")) return;
			$inBox.data("columnized", true);
			$inBox.data("columnizing", true);

			$inBox.empty();
			$inBox.append($("<div style='width:" + (Math.floor(100 / numCols))+ "%; float: " + options.columnFloat + ";'></div>")); //"
			$col = $inBox.children(":last");
			$col.append($cache.clone());
			maxHeight = $col.height();
			$inBox.empty();

			var targetHeight = maxHeight / numCols;
			var firstTime = true;
			var maxLoops = 3;
			var scrollHorizontally = false;
			if(options.overflow){
				maxLoops = 1;
				targetHeight = options.overflow.height;
			}else if(optionHeight && optionWidth){
				maxLoops = 1;
				targetHeight = optionHeight;
				scrollHorizontally = true;
			}

			//
			// We loop as we try and workout a good height to use. We know it initially as an average 
			// but if the last column is higher than the first ones (which can happen, depending on split
			// points) we need to raise 'adjustment'. We try this over a few iterations until we're 'solid'.
			//
			// also, lets hard code the max loops to 20. that's /a lot/ of loops for columnizer,
			// and should keep run aways in check. if somehow someone has content combined with
			// options that would cause an infinite loop, then this'll definitely stop it.
			for(var loopCount=0;loopCount<maxLoops && loopCount<20;loopCount++){
				$inBox.empty();
				var $destroyable, className, $col, $lastKid;
				try{
					$destroyable = $cache.clone(true);
				}catch(e){
					// jquery in ie6 can't clone with true
					$destroyable = $cache.clone();
				}
				$destroyable.css("visibility", "hidden");
				// create the columns
				for (var i = 0; i < numCols; i++) {
					/* create column */
					className = (i === 0) ? prefixTheClassName("first") : "";
					className += " " + prefixTheClassName("column");
					className = (i == numCols - 1) ? (prefixTheClassName("last") + " " + className) : className;
					$inBox.append($("<div class='" + className + "' style='width:" + (Math.floor(100 / numCols))+ "%; float: " + options.columnFloat + ";'></div>")); //"
				}

				// fill all but the last column (unless overflowing)
				i = 0;
				while(i < numCols - (options.overflow ? 0 : 1) || scrollHorizontally && $destroyable.contents().length){
					if($inBox.children().length <= i){
						// we ran out of columns, make another
						$inBox.append($("<div class='" + className + "' style='width:" + (Math.floor(100 / numCols))+ "%; float: " + options.columnFloat + ";'></div>")); //"
					}
					$col = $inBox.children().eq(i);
					if(scrollHorizontally){
						$col.width(optionWidth + "px");
					}
					columnize($col, $destroyable, $col, targetHeight);
					// make sure that the last item in the column isn't a "dontend"
					split($col, $destroyable, $col, targetHeight);

					while($col.contents(":last").length && checkDontEndColumn($col.contents(":last").get(0))){
						$lastKid = $col.contents(":last");
						$lastKid.remove();
						$destroyable.prepend($lastKid);
					}
					i++;

					//
					// https://github.com/adamwulf/Columnizer-jQuery-Plugin/issues/47
					//
					// check for infinite loop.
					//
					// this could happen when a dontsplit or dontend item is taller than the column
					// we're trying to build, and its never actually added to a column.
					//
					// this results in empty columns being added with the dontsplit item
					// perpetually waiting to get put into a column. lets force the issue here
					if($col.contents().length === 0 && $destroyable.contents().length){
						//
						// ok, we're building zero content columns. this'll happen forever
						// since nothing can ever get taken out of destroyable.
						//
						// to fix, lets put 1 item from destroyable into the empty column
						// before we iterate
						$col.append($destroyable.contents(":first"));
					}else if(i == numCols - (options.overflow ? 0 : 1) && !options.overflow){
						//
						// ok, we're about to exit the while loop because we're done with all
						// columns except the last column.
						//
						// if $destroyable still has columnbreak nodes in it, then we need to keep
						// looping and creating more columns.
						if($destroyable.find(prefixTheClassName("columnbreak", true)).length){
							numCols ++;
						}
					}
				}
				if(options.overflow && !scrollHorizontally){
					var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
					var IE7 = (document.all) && (navigator.appVersion.indexOf("MSIE 7.") != -1);
					if(IE6 || IE7){
						var html = "";
						var div = document.createElement('DIV');
						while($destroyable[0].childNodes.length > 0){
							var kid = $destroyable[0].childNodes[0];
							for(i=0;i<kid.attributes.length;i++){
								if(kid.attributes[i].nodeName.indexOf("jQuery") === 0){
									kid.removeAttribute(kid.attributes[i].nodeName);
								}
							}
							div.innerHTML = "";
							div.appendChild($destroyable[0].childNodes[0]);
							html += div.innerHTML;
						}
						var overflow = $(options.overflow.id)[0];
						overflow.innerHTML = html;
					}else{
						$(options.overflow.id).empty().append($destroyable.contents().clone(true));
					}
				}else if(!scrollHorizontally){
					// the last column in the series
					$col = $inBox.children().eq($inBox.children().length-1);
					$destroyable.contents().each( function() {
						$col.append( $(this) );
					});
					var afterH = $col.height();
					var diff = afterH - targetHeight;
					var totalH = 0;
					var min = 10000000;
					var max = 0;
					var lastIsMax = false;
					var numberOfColumnsThatDontEndInAColumnBreak = 0;
					$inBox.children().each(function($inBox){ return function($item){
						var $col = $inBox.children().eq($item);
						var endsInBreak = $col.children(":last").find(prefixTheClassName("columnbreak", true)).length;
						if(!endsInBreak){
							var h = $col.height();
							lastIsMax = false;
							totalH += h;
							if(h > max) {
								max = h;
								lastIsMax = true;
							}
							if(h < min) min = h;
							numberOfColumnsThatDontEndInAColumnBreak++;
						}
					};
				}($inBox));

					var avgH = totalH / numberOfColumnsThatDontEndInAColumnBreak;
					if(totalH === 0){
						//
						// all columns end in a column break,
						// so we're done here
						loopCount = maxLoops;
					}else if(options.lastNeverTallest && lastIsMax){
						// the last column is the tallest
						// so allow columns to be taller
						// and retry
						//
						// hopefully this'll mean more content fits into
						// earlier columns, so that the last column
						// can be shorter than the rest
						adjustment += 30;

						targetHeight = targetHeight + 30;
						if(loopCount == maxLoops-1) maxLoops++;
					}else if(max - min > 30){
						// too much variation, try again
						targetHeight = avgH + 30;
					}else if(Math.abs(avgH-targetHeight) > 20){
						// too much variation, try again
						targetHeight = avgH;
					}else {
						// solid, we're done
						loopCount = maxLoops;
					}
				}else{
					// it's scrolling horizontally, fix the width/classes of the columns
					$inBox.children().each(function(i){
						$col = $inBox.children().eq(i);
						$col.width(optionWidth + "px");
						if(i === 0){
							$col.addClass(prefixTheClassName("first"));
						}else if(i==$inBox.children().length-1){
							$col.addClass(prefixTheClassName("last"));
						}else{
							$col.removeClass(prefixTheClassName("first"));
							$col.removeClass(prefixTheClassName("last"));
						}
					});
					$inBox.width($inBox.children().length * optionWidth + "px");
				}
				$inBox.append($("<br style='clear:both;'>"));
			}
			$inBox.find(prefixTheClassName("column", true)).find(":first" + prefixTheClassName("removeiffirst", true)).remove();
			$inBox.find(prefixTheClassName("column", true)).find(':last' + prefixTheClassName("removeiflast", true)).remove();
			$inBox.data("columnizing", false);

			if(options.overflow){
				options.overflow.doneFunc();
			}
			options.doneFunc();
		}
    });
 };
})(jQuery);

/**
 * jQuery Galleriffic plugin
 *
 * Copyright (c) 2008 Trent Foley (http://trentacular.com)
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Much thanks to primary contributer Ponticlaro (http://www.ponticlaro.com)
 */
;(function($) {
	// Globally keep track of all images by their unique hash.  Each item is an image data object.
	var allImages = {};
	var imageCounter = 0;

	// Galleriffic static class
	$.galleriffic = {
		version: '2.0.1',

		// Strips invalid characters and any leading # characters
		normalizeHash: function(hash) {
			return hash.replace(/^.*#/, '').replace(/\?.*$/, '');
		},

		getImage: function(hash) {
			if (!hash)
				return undefined;

			hash = $.galleriffic.normalizeHash(hash);
			return allImages[hash];
		},

		// Global function that looks up an image by its hash and displays the image.
		// Returns false when an image is not found for the specified hash.
		// @param {String} hash This is the unique hash value assigned to an image.
		gotoImage: function(hash) {
			var imageData = $.galleriffic.getImage(hash);
			if (!imageData)
				return false;

			var gallery = imageData.gallery;
			gallery.gotoImage(imageData);
			
			return true;
		},

		// Removes an image from its respective gallery by its hash.
		// Returns false when an image is not found for the specified hash or the
		// specified owner gallery does match the located images gallery.
		// @param {String} hash This is the unique hash value assigned to an image.
		// @param {Object} ownerGallery (Optional) When supplied, the located images
		// gallery is verified to be the same as the specified owning gallery before
		// performing the remove operation.
		removeImageByHash: function(hash, ownerGallery) {
			var imageData = $.galleriffic.getImage(hash);
			if (!imageData)
				return false;

			var gallery = imageData.gallery;
			if (ownerGallery && ownerGallery != gallery)
				return false;

			return gallery.removeImageByIndex(imageData.index);
		}
	};

	var defaults = {
		delay:                     3000,
		numThumbs:                 20,
		preloadAhead:              40, // Set to -1 to preload all images
		enableTopPager:            false,
		enableBottomPager:         true,
		maxPagesToShow:            7,
		imageContainerSel:         '',
		captionContainerSel:       '',
		controlsContainerSel:      '',
		loadingContainerSel:       '',
		renderSSControls:          true,
		renderNavControls:         true,
		playLinkText:              'Play',
		pauseLinkText:             'Pause',
		prevLinkText:              'Previous',
		nextLinkText:              'Next',
		nextPageLinkText:          'Next &rsaquo;',
		prevPageLinkText:          '&lsaquo; Prev',
		enableHistory:             false,
		enableKeyboardNavigation:  true,
		autoStart:                 false,
		syncTransitions:           false,
		defaultTransitionDuration: 1000,
		onSlideChange:             undefined, // accepts a delegate like such: function(prevIndex, nextIndex) { ... }
		onTransitionOut:           undefined, // accepts a delegate like such: function(slide, caption, isSync, callback) { ... }
		onTransitionIn:            undefined, // accepts a delegate like such: function(slide, caption, isSync) { ... }
		onPageTransitionOut:       undefined, // accepts a delegate like such: function(callback) { ... }
		onPageTransitionIn:        undefined, // accepts a delegate like such: function() { ... }
		onImageAdded:              undefined, // accepts a delegate like such: function(imageData, $li) { ... }
		onImageRemoved:            undefined  // accepts a delegate like such: function(imageData, $li) { ... }
	};

	// Primary Galleriffic initialization function that should be called on the thumbnail container.
	$.fn.galleriffic = function(settings) {
		//  Extend Gallery Object
		$.extend(this, {
			// Returns the version of the script
			version: $.galleriffic.version,

			// Current state of the slideshow
			isSlideshowRunning: false,
			slideshowTimeout: undefined,

			// This function is attached to the click event of generated hyperlinks within the gallery
			clickHandler: function(e, link) {
				this.pause();

				if (!this.enableHistory) {
					// The href attribute holds the unique hash for an image
					var hash = $.galleriffic.normalizeHash($(link).attr('href'));
					$.galleriffic.gotoImage(hash);
					e.preventDefault();
				}
			},

			// Appends an image to the end of the set of images.  Argument listItem can be either a jQuery DOM element or arbitrary html.
			// @param listItem Either a jQuery object or a string of html of the list item that is to be added to the gallery.
			appendImage: function(listItem) {
				this.addImage(listItem, false, false);
				return this;
			},

			// Inserts an image into the set of images.  Argument listItem can be either a jQuery DOM element or arbitrary html.
			// @param listItem Either a jQuery object or a string of html of the list item that is to be added to the gallery.
			// @param {Integer} position The index within the gallery where the item shouold be added.
			insertImage: function(listItem, position) {
				this.addImage(listItem, false, true, position);
				return this;
			},

			// Adds an image to the gallery and optionally inserts/appends it to the DOM (thumbExists)
			// @param listItem Either a jQuery object or a string of html of the list item that is to be added to the gallery.
			// @param {Boolean} thumbExists Specifies whether the thumbnail already exists in the DOM or if it needs to be added.
			// @param {Boolean} insert Specifies whether the the image is appended to the end or inserted into the gallery.
			// @param {Integer} position The index within the gallery where the item shouold be added.
			addImage: function(listItem, thumbExists, insert, position) {
				var $li = ( typeof listItem === "string" ) ? $(listItem) : listItem;				
				var $aThumb = $li.find('a.thumb');
				var slideUrl = $aThumb.attr('href');
				var title = $aThumb.attr('title');
				var $caption = $li.find('.caption').remove();
				var hash = $aThumb.attr('name');

				// Increment the image counter
				imageCounter++;

				// Autogenerate a hash value if none is present or if it is a duplicate
				if (!hash || allImages[''+hash]) {
					hash = imageCounter;
				}

				// Set position to end when not specified
				if (!insert)
					position = this.data.length;
				
				var imageData = {
					title:title,
					slideUrl:slideUrl,
					caption:$caption,
					hash:hash,
					gallery:this,
					index:position
				};

				// Add the imageData to this gallery's array of images
				if (insert) {
					this.data.splice(position, 0, imageData);

					// Reset index value on all imageData objects
					this.updateIndices(position);
				}
				else {
					this.data.push(imageData);
				}

				var gallery = this;

				// Add the element to the DOM
				if (!thumbExists) {
					// Update thumbs passing in addition post transition out handler
					this.updateThumbs(function() {
						var $thumbsUl = gallery.find('ul.thumbs');
						if (insert)
							$thumbsUl.children(':eq('+position+')').before($li);
						else
							$thumbsUl.append($li);
						
						if (gallery.onImageAdded)
							gallery.onImageAdded(imageData, $li);
					});
				}

				// Register the image globally
				allImages[''+hash] = imageData;

				// Setup attributes and click handler
				$aThumb.attr('rel', 'history')
					.attr('href', '#'+hash)
					.removeAttr('name')
					.click(function(e) {
						gallery.clickHandler(e, this);
					});

				return this;
			},

			// Removes an image from the gallery based on its index.
			// Returns false when the index is out of range.
			removeImageByIndex: function(index) {
				if (index < 0 || index >= this.data.length)
					return false;
				
				var imageData = this.data[index];
				if (!imageData)
					return false;
				
				this.removeImage(imageData);
				
				return true;
			},

			// Convenience method that simply calls the global removeImageByHash method.
			removeImageByHash: function(hash) {
				return $.galleriffic.removeImageByHash(hash, this);
			},

			// Removes an image from the gallery.
			removeImage: function(imageData) {
				var index = imageData.index;
				
				// Remove the image from the gallery data array
				this.data.splice(index, 1);
				
				// Remove the global registration
				delete allImages[''+imageData.hash];
				
				// Remove the image's list item from the DOM
				this.updateThumbs(function() {
					var $li = gallery.find('ul.thumbs')
						.children(':eq('+index+')')
						.remove();

					if (gallery.onImageRemoved)
						gallery.onImageRemoved(imageData, $li);
				});

				// Update each image objects index value
				this.updateIndices(index);

				return this;
			},

			// Updates the index values of the each of the images in the gallery after the specified index
			updateIndices: function(startIndex) {
				for (i = startIndex; i < this.data.length; i++) {
					this.data[i].index = i;
				}
				
				return this;
			},

			// Scraped the thumbnail container for thumbs and adds each to the gallery
			initializeThumbs: function() {
				this.data = [];
				var gallery = this;

				this.find('ul.thumbs > li').each(function(i) {
					gallery.addImage($(this), true, false);
				});

				return this;
			},

			isPreloadComplete: false,

			// Initalizes the image preloader
			preloadInit: function() {
				if (this.preloadAhead == 0) return this;
				
				this.preloadStartIndex = this.currentImage.index;
				var nextIndex = this.getNextIndex(this.preloadStartIndex);
				return this.preloadRecursive(this.preloadStartIndex, nextIndex);
			},

			// Changes the location in the gallery the preloader should work
			// @param {Integer} index The index of the image where the preloader should restart at.
			preloadRelocate: function(index) {
				// By changing this startIndex, the current preload script will restart
				this.preloadStartIndex = index;
				return this;
			},

			// Recursive function that performs the image preloading
			// @param {Integer} startIndex The index of the first image the current preloader started on.
			// @param {Integer} currentIndex The index of the current image to preload.
			preloadRecursive: function(startIndex, currentIndex) {
				// Check if startIndex has been relocated
				if (startIndex != this.preloadStartIndex) {
					var nextIndex = this.getNextIndex(this.preloadStartIndex);
					return this.preloadRecursive(this.preloadStartIndex, nextIndex);
				}

				var gallery = this;

				// Now check for preloadAhead count
				var preloadCount = currentIndex - startIndex;
				if (preloadCount < 0)
					preloadCount = this.data.length-1-startIndex+currentIndex;
				if (this.preloadAhead >= 0 && preloadCount > this.preloadAhead) {
					// Do this in order to keep checking for relocated start index
					setTimeout(function() { gallery.preloadRecursive(startIndex, currentIndex); }, 500);
					return this;
				}

				var imageData = this.data[currentIndex];
				if (!imageData)
					return this;

				// If already loaded, continue
				if (imageData.image)
					return this.preloadNext(startIndex, currentIndex); 
				
				// Preload the image
				var image = new Image();
				
				image.onload = function() {
					imageData.image = this;
					gallery.preloadNext(startIndex, currentIndex);
				};

				image.alt = imageData.title;
				image.src = imageData.slideUrl;

				return this;
			},
			
			// Called by preloadRecursive in order to preload the next image after the previous has loaded.
			// @param {Integer} startIndex The index of the first image the current preloader started on.
			// @param {Integer} currentIndex The index of the current image to preload.
			preloadNext: function(startIndex, currentIndex) {
				var nextIndex = this.getNextIndex(currentIndex);
				if (nextIndex == startIndex) {
					this.isPreloadComplete = true;
				} else {
					// Use setTimeout to free up thread
					var gallery = this;
					setTimeout(function() { gallery.preloadRecursive(startIndex, nextIndex); }, 100);
				}

				return this;
			},

			// Safe way to get the next image index relative to the current image.
			// If the current image is the last, returns 0
			getNextIndex: function(index) {
				var nextIndex = index+1;
				if (nextIndex >= this.data.length)
					nextIndex = 0;
				return nextIndex;
			},

			// Safe way to get the previous image index relative to the current image.
			// If the current image is the first, return the index of the last image in the gallery.
			getPrevIndex: function(index) {
				var prevIndex = index-1;
				if (prevIndex < 0)
					prevIndex = this.data.length-1;
				return prevIndex;
			},

			// Pauses the slideshow
			pause: function() {
				this.isSlideshowRunning = false;
				if (this.slideshowTimeout) {
					clearTimeout(this.slideshowTimeout);
					this.slideshowTimeout = undefined;
				}

				if (this.$controlsContainer) {
					this.$controlsContainer
						.find('div.ss-controls a').removeClass().addClass('play')
						.attr('title', this.playLinkText)
						.attr('href', '#play')
						.html(this.playLinkText);
				}
				
				return this;
			},

			// Plays the slideshow
			play: function() {
				this.isSlideshowRunning = true;

				if (this.$controlsContainer) {
					this.$controlsContainer
						.find('div.ss-controls a').removeClass().addClass('pause')
						.attr('title', this.pauseLinkText)
						.attr('href', '#pause')
						.html(this.pauseLinkText);
				}

				if (!this.slideshowTimeout) {
					var gallery = this;
					this.slideshowTimeout = setTimeout(function() { gallery.ssAdvance(); }, this.delay);
				}

				return this;
			},

			// Toggles the state of the slideshow (playing/paused)
			toggleSlideshow: function() {
				if (this.isSlideshowRunning)
					this.pause();
				else
					this.play();

				return this;
			},

			// Advances the slideshow to the next image and delegates navigation to the
			// history plugin when history is enabled
			// enableHistory is true
			ssAdvance: function() {
				if (this.isSlideshowRunning)
					this.next(true);

				return this;
			},

			// Advances the gallery to the next image.
			// @param {Boolean} dontPause Specifies whether to pause the slideshow.
			// @param {Boolean} bypassHistory Specifies whether to delegate navigation to the history plugin when history is enabled.  
			next: function(dontPause, bypassHistory) {
				this.gotoIndex(this.getNextIndex(this.currentImage.index), dontPause, bypassHistory);
				return this;
			},

			// Navigates to the previous image in the gallery.
			// @param {Boolean} dontPause Specifies whether to pause the slideshow.
			// @param {Boolean} bypassHistory Specifies whether to delegate navigation to the history plugin when history is enabled.
			previous: function(dontPause, bypassHistory) {
				this.gotoIndex(this.getPrevIndex(this.currentImage.index), dontPause, bypassHistory);
				return this;
			},

			// Navigates to the next page in the gallery.
			// @param {Boolean} dontPause Specifies whether to pause the slideshow.
			// @param {Boolean} bypassHistory Specifies whether to delegate navigation to the history plugin when history is enabled.
			nextPage: function(dontPause, bypassHistory) {
				var page = this.getCurrentPage();
				var lastPage = this.getNumPages() - 1;
				if (page < lastPage) {
					var startIndex = page * this.numThumbs;
					var nextPage = startIndex + this.numThumbs;
					this.gotoIndex(nextPage, dontPause, bypassHistory);
				}

				return this;
			},

			// Navigates to the previous page in the gallery.
			// @param {Boolean} dontPause Specifies whether to pause the slideshow.
			// @param {Boolean} bypassHistory Specifies whether to delegate navigation to the history plugin when history is enabled.
			previousPage: function(dontPause, bypassHistory) {
				var page = this.getCurrentPage();
				if (page > 0) {
					var startIndex = page * this.numThumbs;
					var prevPage = startIndex - this.numThumbs;				
					this.gotoIndex(prevPage, dontPause, bypassHistory);
				}
				
				return this;
			},

			// Navigates to the image at the specified index in the gallery
			// @param {Integer} index The index of the image in the gallery to display.
			// @param {Boolean} dontPause Specifies whether to pause the slideshow.
			// @param {Boolean} bypassHistory Specifies whether to delegate navigation to the history plugin when history is enabled.
			gotoIndex: function(index, dontPause, bypassHistory) {
				if (!dontPause)
					this.pause();
				
				if (index < 0) index = 0;
				else if (index >= this.data.length) index = this.data.length-1;
				
				var imageData = this.data[index];
				
				if (!bypassHistory && this.enableHistory)
					$.historyLoad(String(imageData.hash));  // At the moment, historyLoad only accepts string arguments
				else
					this.gotoImage(imageData);

				return this;
			},

			// This function is garaunteed to be called anytime a gallery slide changes.
			// @param {Object} imageData An object holding the image metadata of the image to navigate to.
			gotoImage: function(imageData) {
				var index = imageData.index;

				if (this.onSlideChange)
					this.onSlideChange(this.currentImage.index, index);
				
				this.currentImage = imageData;
				this.preloadRelocate(index);
				
				this.refresh();
				
				return this;
			},

			// Returns the default transition duration value.  The value is halved when not
			// performing a synchronized transition.
			// @param {Boolean} isSync Specifies whether the transitions are synchronized.
			getDefaultTransitionDuration: function(isSync) {
				if (isSync)
					return this.defaultTransitionDuration;
				return this.defaultTransitionDuration / 2;
			},

			// Rebuilds the slideshow image and controls and performs transitions
			refresh: function() {
				var imageData = this.currentImage;
				if (!imageData)
					return this;

				var index = imageData.index;

				// Update Controls
				if (this.$controlsContainer) {
					this.$controlsContainer
						.find('div.nav-controls a.prev').attr('href', '#'+this.data[this.getPrevIndex(index)].hash).end()
						.find('div.nav-controls a.next').attr('href', '#'+this.data[this.getNextIndex(index)].hash);
				}

				var previousSlide = this.$imageContainer.find('span.current').addClass('previous').removeClass('current');
				var previousCaption = 0;

				if (this.$captionContainer) {
					previousCaption = this.$captionContainer.find('span.current').addClass('previous').removeClass('current');
				}

				// Perform transitions simultaneously if syncTransitions is true and the next image is already preloaded
				var isSync = this.syncTransitions && imageData.image;

				// Flag we are transitioning
				var isTransitioning = true;
				var gallery = this;

				var transitionOutCallback = function() {
					// Flag that the transition has completed
					isTransitioning = false;

					// Remove the old slide
					previousSlide.remove();

					// Remove old caption
					if (previousCaption)
						previousCaption.remove();

					if (!isSync) {
						if (imageData.image && imageData.hash == gallery.data[gallery.currentImage.index].hash) {
							gallery.buildImage(imageData, isSync);
						} else {
							// Show loading container
							if (gallery.$loadingContainer) {
								gallery.$loadingContainer.show();
							}
						}
					}
				};

				if (previousSlide.length == 0) {
					// For the first slide, the previous slide will be empty, so we will call the callback immediately
					transitionOutCallback();
				} else {
					if (this.onTransitionOut) {
						this.onTransitionOut(previousSlide, previousCaption, isSync, transitionOutCallback);
					} else {
						previousSlide.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0, transitionOutCallback);
						if (previousCaption)
							previousCaption.fadeTo(this.getDefaultTransitionDuration(isSync), 0.0);
					}
				}

				// Go ahead and begin transitioning in of next image
				if (isSync)
					this.buildImage(imageData, isSync);

				if (!imageData.image) {
					var image = new Image();
					
					// Wire up mainImage onload event
					image.onload = function() {
						imageData.image = this;

						// Only build image if the out transition has completed and we are still on the same image hash
						if (!isTransitioning && imageData.hash == gallery.data[gallery.currentImage.index].hash) {
							gallery.buildImage(imageData, isSync);
						}
					};

					// set alt and src
					image.alt = imageData.title;
					image.src = imageData.slideUrl;
				}

				// This causes the preloader (if still running) to relocate out from the currentIndex
				this.relocatePreload = true;

				return this.syncThumbs();
			},

			// Called by the refresh method after the previous image has been transitioned out or at the same time
			// as the out transition when performing a synchronous transition.
			// @param {Object} imageData An object holding the image metadata of the image to build.
			// @param {Boolean} isSync Specifies whether the transitions are synchronized.
			buildImage: function(imageData, isSync) {
				var gallery = this;
				var nextIndex = this.getNextIndex(imageData.index);

				// Construct new hidden span for the image
				var newSlide = this.$imageContainer
					.append('<span class="image-wrapper current"><a class="advance-link" rel="history" href="#'+this.data[nextIndex].hash+'" title="'+imageData.title+'">&nbsp;</a></span>')
					.find('span.current').css('opacity', '0');
				
				newSlide.find('a')
					.append(imageData.image)
					.click(function(e) {
						gallery.clickHandler(e, this);
					});
				
				var newCaption = 0;
				if (this.$captionContainer) {
					// Construct new hidden caption for the image
					newCaption = this.$captionContainer
						.append('<span class="image-caption current"></span>')
						.find('span.current').css('opacity', '0')
						.append(imageData.caption);
				}

				// Hide the loading conatiner
				if (this.$loadingContainer) {
					this.$loadingContainer.hide();
				}

				// Transition in the new image
				if (this.onTransitionIn) {
					this.onTransitionIn(newSlide, newCaption, isSync);
				} else {
					newSlide.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0);
					if (newCaption)
						newCaption.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0);
				}
				
				if (this.isSlideshowRunning) {
					if (this.slideshowTimeout)
						clearTimeout(this.slideshowTimeout);

					this.slideshowTimeout = setTimeout(function() { gallery.ssAdvance(); }, this.delay);
				}

				return this;
			},

			// Returns the current page index that should be shown for the currentImage
			getCurrentPage: function() {
				return Math.floor(this.currentImage.index / this.numThumbs);
			},

			// Applies the selected class to the current image's corresponding thumbnail.
			// Also checks if the current page has changed and updates the displayed page of thumbnails if necessary.
			syncThumbs: function() {
				var page = this.getCurrentPage();
				if (page != this.displayedPage)
					this.updateThumbs();

				// Remove existing selected class and add selected class to new thumb
				var $thumbs = this.find('ul.thumbs').children();
				$thumbs.filter('.selected').removeClass('selected');
				$thumbs.eq(this.currentImage.index).addClass('selected');

				return this;
			},

			// Performs transitions on the thumbnails container and updates the set of
			// thumbnails that are to be displayed and the navigation controls.
			// @param {Delegate} postTransitionOutHandler An optional delegate that is called after
			// the thumbnails container has transitioned out and before the thumbnails are rebuilt.
			updateThumbs: function(postTransitionOutHandler) {
				var gallery = this;
				var transitionOutCallback = function() {
					// Call the Post-transition Out Handler
					if (postTransitionOutHandler)
						postTransitionOutHandler();
					
					gallery.rebuildThumbs();

					// Transition In the thumbsContainer
					if (gallery.onPageTransitionIn)
						gallery.onPageTransitionIn();
					else
						gallery.show();
				};

				// Transition Out the thumbsContainer
				if (this.onPageTransitionOut) {
					this.onPageTransitionOut(transitionOutCallback);
				} else {
					this.hide();
					transitionOutCallback();
				}

				return this;
			},

			// Updates the set of thumbnails that are to be displayed and the navigation controls.
			rebuildThumbs: function() {
				var needsPagination = this.data.length > this.numThumbs;

				// Rebuild top pager
				if (this.enableTopPager) {
					var $topPager = this.find('div.top');
					if ($topPager.length == 0)
						$topPager = this.prepend('<div class="top pagination"></div>').find('div.top');
					else
						$topPager.empty();

					if (needsPagination)
						this.buildPager($topPager);
				}

				// Rebuild bottom pager
				if (this.enableBottomPager) {
					var $bottomPager = this.find('div.bottom');
					if ($bottomPager.length == 0)
						$bottomPager = this.append('<div class="bottom pagination"></div>').find('div.bottom');
					else
						$bottomPager.empty();

					if (needsPagination)
						this.buildPager($bottomPager);
				}

				var page = this.getCurrentPage();
				var startIndex = page*this.numThumbs;
				var stopIndex = startIndex+this.numThumbs-1;
				if (stopIndex >= this.data.length)
					stopIndex = this.data.length-1;

				// Show/Hide thumbs
				var $thumbsUl = this.find('ul.thumbs');
				$thumbsUl.find('li').each(function(i) {
					var $li = $(this);
					if (i >= startIndex && i <= stopIndex) {
						$li.show();
					} else {
						$li.hide();
					}
				});

				this.displayedPage = page;

				// Remove the noscript class from the thumbs container ul
				$thumbsUl.removeClass('noscript');
				
				return this;
			},

			// Returns the total number of pages required to display all the thumbnails.
			getNumPages: function() {
				return Math.ceil(this.data.length/this.numThumbs);
			},

			// Rebuilds the pager control in the specified matched element.
			// @param {jQuery} pager A jQuery element set matching the particular pager to be rebuilt.
			buildPager: function(pager) {
				var gallery = this;
				var numPages = this.getNumPages();
				var page = this.getCurrentPage();
				var startIndex = page * this.numThumbs;
				var pagesRemaining = this.maxPagesToShow - 1;
				
				var pageNum = page - Math.floor((this.maxPagesToShow - 1) / 2) + 1;
				if (pageNum > 0) {
					var remainingPageCount = numPages - pageNum;
					if (remainingPageCount < pagesRemaining) {
						pageNum = pageNum - (pagesRemaining - remainingPageCount);
					}
				}

				if (pageNum < 0) {
					pageNum = 0;
				}

				// Prev Page Link
				if (page > 0) {
					var prevPage = startIndex - this.numThumbs;
					pager.append('<a rel="history" href="#'+this.data[prevPage].hash+'" title="'+this.prevPageLinkText+'">'+this.prevPageLinkText+'</a>');
				}

				// Create First Page link if needed
				if (pageNum > 0) {
					this.buildPageLink(pager, 0, numPages);
					if (pageNum > 1)
						pager.append('<span class="ellipsis">&hellip;</span>');
					
					pagesRemaining--;
				}

				// Page Index Links
				while (pagesRemaining > 0) {
					this.buildPageLink(pager, pageNum, numPages);
					pagesRemaining--;
					pageNum++;
				}

				// Create Last Page link if needed
				if (pageNum < numPages) {
					var lastPageNum = numPages - 1;
					if (pageNum < lastPageNum)
						pager.append('<span class="ellipsis">&hellip;</span>');

					this.buildPageLink(pager, lastPageNum, numPages);
				}

				// Next Page Link
				var nextPage = startIndex + this.numThumbs;
				if (nextPage < this.data.length) {
					pager.append('<a rel="history" href="#'+this.data[nextPage].hash+'" title="'+this.nextPageLinkText+'">'+this.nextPageLinkText+'</a>');
				}

				pager.find('a').click(function(e) {
					gallery.clickHandler(e, this);
				});

				return this;
			},

			// Builds a single page link within a pager.  This function is called by buildPager
			// @param {jQuery} pager A jQuery element set matching the particular pager to be rebuilt.
			// @param {Integer} pageNum The page number of the page link to build.
			// @param {Integer} numPages The total number of pages required to display all thumbnails.
			buildPageLink: function(pager, pageNum, numPages) {
				var pageLabel = pageNum + 1;
				var currentPage = this.getCurrentPage();
				if (pageNum == currentPage)
					pager.append('<span class="current">'+pageLabel+'</span>');
				else if (pageNum < numPages) {
					var imageIndex = pageNum*this.numThumbs;
					pager.append('<a rel="history" href="#'+this.data[imageIndex].hash+'" title="'+pageLabel+'">'+pageLabel+'</a>');
				}
				
				return this;
			}
		});

		// Now initialize the gallery
		$.extend(this, defaults, settings);
		
		// Verify the history plugin is available
		if (this.enableHistory && !$.historyInit)
			this.enableHistory = false;
		
		// Select containers
		if (this.imageContainerSel) this.$imageContainer = $(this.imageContainerSel);
		if (this.captionContainerSel) this.$captionContainer = $(this.captionContainerSel);
		if (this.loadingContainerSel) this.$loadingContainer = $(this.loadingContainerSel);

		// Initialize the thumbails
		this.initializeThumbs();
		
		if (this.maxPagesToShow < 3)
			this.maxPagesToShow = 3;

		this.displayedPage = -1;
		this.currentImage = this.data[0];
		var gallery = this;

		// Hide the loadingContainer
		if (this.$loadingContainer)
			this.$loadingContainer.hide();

		// Setup controls
		if (this.controlsContainerSel) {
			this.$controlsContainer = $(this.controlsContainerSel).empty();
			
			if (this.renderSSControls) {
				if (this.autoStart) {
					this.$controlsContainer
						.append('<div class="ss-controls"><a href="#pause" class="pause" title="'+this.pauseLinkText+'">'+this.pauseLinkText+'</a></div>');
				} else {
					this.$controlsContainer
						.append('<div class="ss-controls"><a href="#play" class="play" title="'+this.playLinkText+'">'+this.playLinkText+'</a></div>');
				}

				this.$controlsContainer.find('div.ss-controls a')
					.click(function(e) {
						gallery.toggleSlideshow();
						e.preventDefault();
						return false;
					});
			}
		
			if (this.renderNavControls) {
				this.$controlsContainer
					.append('<div class="nav-controls"><a class="prev" rel="history" title="'+this.prevLinkText+'">'+this.prevLinkText+'</a><a class="next" rel="history" title="'+this.nextLinkText+'">'+this.nextLinkText+'</a></div>')
					.find('div.nav-controls a')
					.click(function(e) {
						gallery.clickHandler(e, this);
					});
			}
		}

		var initFirstImage = !this.enableHistory || !location.hash;
		if (this.enableHistory && location.hash) {
			var hash = $.galleriffic.normalizeHash(location.hash);
			var imageData = allImages[hash];
			if (!imageData)
				initFirstImage = true;
		}

		// Setup gallery to show the first image
		if (initFirstImage)
			this.gotoIndex(0, false, true);

		// Setup Keyboard Navigation
		if (this.enableKeyboardNavigation) {
			$(document).keydown(function(e) {
				var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
				switch(key) {
					case 32: // space
						gallery.next();
						e.preventDefault();
						break;
					case 33: // Page Up
						gallery.previousPage();
						e.preventDefault();
						break;
					case 34: // Page Down
						gallery.nextPage();
						e.preventDefault();
						break;
					case 35: // End
						gallery.gotoIndex(gallery.data.length-1);
						e.preventDefault();
						break;
					case 36: // Home
						gallery.gotoIndex(0);
						e.preventDefault();
						break;
					case 37: // left arrow
						gallery.previous();
						e.preventDefault();
						break;
					case 39: // right arrow
						gallery.next();
						e.preventDefault();
						break;
				}
			});
		}

		// Auto start the slideshow
		if (this.autoStart)
			this.play();

		// Kickoff Image Preloader after 1 second
		setTimeout(function() { gallery.preloadInit(); }, 1000);

		return this;
	};
})(jQuery);

/*
 * jQuery history plugin
 * 
 * sample page: http://www.mikage.to/jquery/jquery_history.html
 *
 * Copyright (c) 2006-2009 Taku Sano (Mikage Sawatari)
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Modified by Lincoln Cooper to add Safari support and only call the callback once during initialization
 * for msie when no initial hash supplied.
 */


jQuery.extend({
	historyCurrentHash: undefined,
	historyCallback: undefined,
	historyIframeSrc: undefined,
	
	historyInit: function(callback, src){
		jQuery.historyCallback = callback;
		if (src) jQuery.historyIframeSrc = src;
		var current_hash = location.hash.replace(/\?.*$/, '');
		
		jQuery.historyCurrentHash = current_hash;
		// if ((jQuery.browser.msie) && (jQuery.browser.version < 8)) {
		if (jQuery.browser.msie) {
			// To stop the callback firing twice during initilization if no hash present
			if (jQuery.historyCurrentHash == '') {
			jQuery.historyCurrentHash = '#';
		}
		
			// add hidden iframe for IE
			jQuery("body").prepend('<iframe id="jQuery_history" style="display: none;"'+
				(jQuery.historyIframeSrc ? ' src="'+jQuery.historyIframeSrc+'"' : '')
				+'></iframe>'
			);
			var ihistory = jQuery("#jQuery_history")[0];
			var iframe = ihistory.contentWindow.document;
			iframe.open();
			iframe.close();
			iframe.location.hash = current_hash;
		}
		else if (jQuery.browser.safari) {
			// etablish back/forward stacks
			jQuery.historyBackStack = [];
			jQuery.historyBackStack.length = history.length;
			jQuery.historyForwardStack = [];
			jQuery.lastHistoryLength = history.length;
			
			jQuery.isFirst = true;
		}
		if(current_hash)
			jQuery.historyCallback(current_hash.replace(/^#/, ''));
		setInterval(jQuery.historyCheck, 100);
	},
	
	historyAddHistory: function(hash) {
		// This makes the looping function do something
		jQuery.historyBackStack.push(hash);
		
		jQuery.historyForwardStack.length = 0; // clear forwardStack (true click occured)
		this.isFirst = true;
	},
	
	historyCheck: function(){
		// if ((jQuery.browser.msie) && (jQuery.browser.version < 8)) {
		if (jQuery.browser.msie) {
			// On IE, check for location.hash of iframe
			var ihistory = jQuery("#jQuery_history")[0];
			var iframe = ihistory.contentDocument || ihistory.contentWindow.document;
			var current_hash = iframe.location.hash.replace(/\?.*$/, '');
			if(current_hash != jQuery.historyCurrentHash) {
			
				location.hash = current_hash;
				jQuery.historyCurrentHash = current_hash;
				jQuery.historyCallback(current_hash.replace(/^#/, ''));
				
			}
		} else if (jQuery.browser.safari) {
			if(jQuery.lastHistoryLength == history.length && jQuery.historyBackStack.length > jQuery.lastHistoryLength) {
				jQuery.historyBackStack.shift();
			}
			if (!jQuery.dontCheck) {
				var historyDelta = history.length - jQuery.historyBackStack.length;
				jQuery.lastHistoryLength = history.length;
				
				if (historyDelta) { // back or forward button has been pushed
					jQuery.isFirst = false;
					if (historyDelta < 0) { // back button has been pushed
						// move items to forward stack
						for (var i = 0; i < Math.abs(historyDelta); i++) jQuery.historyForwardStack.unshift(jQuery.historyBackStack.pop());
					} else { // forward button has been pushed
						// move items to back stack
						for (var i = 0; i < historyDelta; i++) jQuery.historyBackStack.push(jQuery.historyForwardStack.shift());
					}
					var cachedHash = jQuery.historyBackStack[jQuery.historyBackStack.length - 1];
					if (cachedHash != undefined) {
						jQuery.historyCurrentHash = location.hash.replace(/\?.*$/, '');
						jQuery.historyCallback(cachedHash);
					}
				} else if (jQuery.historyBackStack[jQuery.historyBackStack.length - 1] == undefined && !jQuery.isFirst) {
					// back button has been pushed to beginning and URL already pointed to hash (e.g. a bookmark)
					// document.URL doesn't change in Safari
					if (location.hash) {
						var current_hash = location.hash;
						jQuery.historyCallback(location.hash.replace(/^#/, ''));
					} else {
						var current_hash = '';
						jQuery.historyCallback('');
					}
					jQuery.isFirst = true;
				}
			}
		} else {
			// otherwise, check for location.hash
			var current_hash = location.hash.replace(/\?.*$/, '');
			if(current_hash != jQuery.historyCurrentHash) {
				jQuery.historyCurrentHash = current_hash;
				jQuery.historyCallback(current_hash.replace(/^#/, ''));
			}
		}
	},
	historyLoad: function(hash){
		var newhash;
		hash = decodeURIComponent(hash.replace(/\?.*$/, ''));
		
		if (jQuery.browser.safari) {
			newhash = hash;
		}
		else {
			newhash = '#' + hash;
			location.hash = newhash;
		}
		jQuery.historyCurrentHash = newhash;
		
		// if ((jQuery.browser.msie) && (jQuery.browser.version < 8)) {
		if (jQuery.browser.msie) {
			var ihistory = jQuery("#jQuery_history")[0];
			var iframe = ihistory.contentWindow.document;
			iframe.open();
			iframe.close();
			iframe.location.hash = newhash;
			jQuery.lastHistoryLength = history.length;
			jQuery.historyCallback(hash);
		}
		else if (jQuery.browser.safari) {
			jQuery.dontCheck = true;
			// Manually keep track of the history values for Safari
			this.historyAddHistory(hash);
			
			// Wait a while before allowing checking so that Safari has time to update the "history" object
			// correctly (otherwise the check loop would detect a false change in hash).
			var fn = function() {jQuery.dontCheck = false;};
			window.setTimeout(fn, 200);
			jQuery.historyCallback(hash);
			// N.B. "location.hash=" must be the last line of code for Safari as execution stops afterwards.
			//      By explicitly using the "location.hash" command (instead of using a variable set to "location.hash") the
			//      URL in the browser and the "history" object are both updated correctly.
			location.hash = newhash;
		}
		else {
		  jQuery.historyCallback(hash);
		}
	}
});



/**
 * jQuery Opacity Rollover plugin
 *
 * Copyright (c) 2009 Trent Foley (http://trentacular.com)
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
;(function($) {
	var defaults = {
		mouseOutOpacity:   0.67,
		mouseOverOpacity:  1.0,
		fadeSpeed:         'fast',
		exemptionSelector: '.selected'
	};

	$.fn.opacityrollover = function(settings) {
		// Initialize the effect
		$.extend(this, defaults, settings);

		var config = this;

		function fadeTo(element, opacity) {
			var $target = $(element);
			
			if (config.exemptionSelector)
				$target = $target.not(config.exemptionSelector);	
			
			$target.fadeTo(config.fadeSpeed, opacity);
		}

		this.css('opacity', this.mouseOutOpacity)
			.hover(
				function () {
					fadeTo(this, config.mouseOverOpacity);
				},
				function () {
					fadeTo(this, config.mouseOutOpacity);
				});

		return this;
	};
})(jQuery);

/* VIT */
(function($){$.fn.vit=function(options){var settings={'parent':this.parent().height(),'offset':0};if(options){$.extend(settings,options);}
return this.each(function(){var myHeight=$(this).height();$(this).css('margin-top',((settings.parent-myHeight)/2)+settings.offset);});};})(jQuery);

/**
 * Isotope v1.5.19
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd",transitionProperty:"transitionEnd"}[j],r=h("transitionDuration"));var s=b.event,t;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",t&&clearTimeout(t),t=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var u=["width","height"],v=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!b.browser.opera,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=u.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&v.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){var c=this,d=function(){c.$allAtoms=c.$allAtoms.not(a),a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this.$filteredAtoms=this.$filteredAtoms.not(a),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),v.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var w=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){w("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){w("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);
/*
 * FancyBox - jQuery Plugin
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 * 
 * Version: 1.3.4 (11/11/2010)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function(b){var m,t,u,f,D,j,E,n,z,A,q=0,e={},o=[],p=0,d={},l=[],G=null,v=new Image,J=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,W=/[^\.]\.(swf)\s*$/i,K,L=1,y=0,s="",r,i,h=false,B=b.extend(b("<div/>")[0],{prop:0}),M=b.browser.msie&&b.browser.version<7&&!window.XMLHttpRequest,N=function(){t.hide();v.onerror=v.onload=null;G&&G.abort();m.empty()},O=function(){if(false===e.onError(o,q,e)){t.hide();h=false}else{e.titleShow=false;e.width="auto";e.height="auto";m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
F()}},I=function(){var a=o[q],c,g,k,C,P,w;N();e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));w=e.onStart(o,q,e);if(w===false)h=false;else{if(typeof w=="object")e=b.extend(e,w);k=e.title||(a.nodeName?b(a).attr("title"):a.title)||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(k===""&&e.orig&&e.titleFromAlt)k=e.orig.attr("alt");c=e.href||(a.nodeName?b(a).attr("href"):a.href)||null;if(/^(?:javascript)/i.test(c)||
c=="#")c=null;if(e.type){g=e.type;if(!c)c=e.content}else if(e.content)g="html";else if(c)g=c.match(J)?"image":c.match(W)?"swf":b(a).hasClass("iframe")?"iframe":c.indexOf("#")===0?"inline":"ajax";if(g){if(g=="inline"){a=c.substr(c.indexOf("#"));g=b(a).length>0?"inline":"ajax"}e.type=g;e.href=c;e.title=k;if(e.autoDimensions)if(e.type=="html"||e.type=="inline"||e.type=="ajax"){e.width="auto";e.height="auto"}else e.autoDimensions=false;if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=
false;e.enableEscapeButton=false;e.showCloseButton=false}e.padding=parseInt(e.padding,10);e.margin=parseInt(e.margin,10);m.css("padding",e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(j.children())});switch(g){case "html":m.html(e.content);F();break;case "inline":if(b(a).parent().is("#fancybox-content")===true){h=false;break}b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(j.children())}).bind("fancybox-cancel",
function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();v=new Image;v.onerror=function(){O()};v.onload=function(){h=true;v.onerror=v.onload=null;e.width=v.width;e.height=v.height;b("<img />").attr({id:"fancybox-img",src:v.src,alt:e.title}).appendTo(m);Q()};v.src=c;break;case "swf":e.scrolling="no";C='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+c+
'"></param>';P="";b.each(e.swf,function(x,H){C+='<param name="'+x+'" value="'+H+'"></param>';P+=" "+x+'="'+H+'"'});C+='<embed src="'+c+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+P+"></embed></object>";m.html(C);F();break;case "ajax":h=false;b.fancybox.showActivity();e.ajax.win=e.ajax.success;G=b.ajax(b.extend({},e.ajax,{url:c,data:e.ajax.data||{},error:function(x){x.status>0&&O()},success:function(x,H,R){if((typeof R=="object"?R:G).status==200){if(typeof e.ajax.win==
"function"){w=e.ajax.win(c,x,H,R);if(w===false){t.hide();return}else if(typeof w=="string"||typeof w=="object")x=w}m.html(x);F()}}}));break;case "iframe":Q()}}else O()}},F=function(){var a=e.width,c=e.height;a=a.toString().indexOf("%")>-1?parseInt((b(window).width()-e.margin*2)*parseFloat(a)/100,10)+"px":a=="auto"?"auto":a+"px";c=c.toString().indexOf("%")>-1?parseInt((b(window).height()-e.margin*2)*parseFloat(c)/100,10)+"px":c=="auto"?"auto":c+"px";m.wrapInner('<div style="width:'+a+";height:"+c+
";overflow: "+(e.scrolling=="auto"?"auto":e.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');e.width=m.width();e.height=m.height();Q()},Q=function(){var a,c;t.hide();if(f.is(":visible")&&false===d.onCleanup(l,p,d)){b.event.trigger("fancybox-cancel");h=false}else{h=true;b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");f.is(":visible")&&d.titlePosition!=="outside"&&f.css("height",f.height());l=o;p=q;d=e;if(d.overlayShow){u.css({"background-color":d.overlayColor,
opacity:d.overlayOpacity,cursor:d.hideOnOverlayClick?"pointer":"auto",height:b(document).height()});if(!u.is(":visible")){M&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});u.show()}}else u.hide();i=X();s=d.title||"";y=0;n.empty().removeAttr("style").removeClass();if(d.titleShow!==false){if(b.isFunction(d.titleFormat))a=d.titleFormat(s,l,p,d);else a=s&&s.length?
d.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+s+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+d.titlePosition+'">'+s+"</div>":false;s=a;if(!(!s||s==="")){n.addClass("fancybox-title-"+d.titlePosition).html(s).appendTo("body").show();switch(d.titlePosition){case "inside":n.css({width:i.width-d.padding*2,marginLeft:d.padding,marginRight:d.padding});
y=n.outerHeight(true);n.appendTo(D);i.height+=y;break;case "over":n.css({marginLeft:d.padding,width:i.width-d.padding*2,bottom:d.padding}).appendTo(D);break;case "float":n.css("left",parseInt((n.width()-i.width-40)/2,10)*-1).appendTo(f);break;default:n.css({width:i.width-d.padding*2,paddingLeft:d.padding,paddingRight:d.padding}).appendTo(f)}}}n.hide();if(f.is(":visible")){b(E.add(z).add(A)).hide();a=f.position();r={top:a.top,left:a.left,width:f.width(),height:f.height()};c=r.width==i.width&&r.height==
i.height;j.fadeTo(d.changeFade,0.3,function(){var g=function(){j.html(m.contents()).fadeTo(d.changeFade,1,S)};b.event.trigger("fancybox-change");j.empty().removeAttr("filter").css({"border-width":d.padding,width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2});if(c)g();else{B.prop=0;b(B).animate({prop:1},{duration:d.changeSpeed,easing:d.easingChange,step:T,complete:g})}})}else{f.removeAttr("style");j.css("border-width",d.padding);if(d.transitionIn=="elastic"){r=V();j.html(m.contents());
f.show();if(d.opacity)i.opacity=0;B.prop=0;b(B).animate({prop:1},{duration:d.speedIn,easing:d.easingIn,step:T,complete:S})}else{d.titlePosition=="inside"&&y>0&&n.show();j.css({width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2}).html(m.contents());f.css(i).fadeIn(d.transitionIn=="none"?0:d.speedIn,S)}}}},Y=function(){if(d.enableEscapeButton||d.enableKeyboardNav)b(document).bind("keydown.fb",function(a){if(a.keyCode==27&&d.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if((a.keyCode==
37||a.keyCode==39)&&d.enableKeyboardNav&&a.target.tagName!=="INPUT"&&a.target.tagName!=="TEXTAREA"&&a.target.tagName!=="SELECT"){a.preventDefault();b.fancybox[a.keyCode==37?"prev":"next"]()}});if(d.showNavArrows){if(d.cyclic&&l.length>1||p!==0)z.show();if(d.cyclic&&l.length>1||p!=l.length-1)A.show()}else{z.hide();A.hide()}},S=function(){if(!b.support.opacity){j.get(0).style.removeAttribute("filter");f.get(0).style.removeAttribute("filter")}e.autoDimensions&&j.css("height","auto");f.css("height","auto");
s&&s.length&&n.show();d.showCloseButton&&E.show();Y();d.hideOnContentClick&&j.bind("click",b.fancybox.close);d.hideOnOverlayClick&&u.bind("click",b.fancybox.close);b(window).bind("resize.fb",b.fancybox.resize);d.centerOnScroll&&b(window).bind("scroll.fb",b.fancybox.center);if(d.type=="iframe")b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(b.browser.msie?'allowtransparency="true""':"")+' scrolling="'+e.scrolling+'" src="'+d.href+'"></iframe>').appendTo(j);
f.show();h=false;b.fancybox.center();d.onComplete(l,p,d);var a,c;if(l.length-1>p){a=l[p+1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}if(p>0){a=l[p-1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}},T=function(a){var c={width:parseInt(r.width+(i.width-r.width)*a,10),height:parseInt(r.height+(i.height-r.height)*a,10),top:parseInt(r.top+(i.top-r.top)*a,10),left:parseInt(r.left+(i.left-r.left)*a,10)};if(typeof i.opacity!=="undefined")c.opacity=a<0.5?0.5:a;f.css(c);
j.css({width:c.width-d.padding*2,height:c.height-y*a-d.padding*2})},U=function(){return[b(window).width()-d.margin*2,b(window).height()-d.margin*2,b(document).scrollLeft()+d.margin,b(document).scrollTop()+d.margin]},X=function(){var a=U(),c={},g=d.autoScale,k=d.padding*2;c.width=d.width.toString().indexOf("%")>-1?parseInt(a[0]*parseFloat(d.width)/100,10):d.width+k;c.height=d.height.toString().indexOf("%")>-1?parseInt(a[1]*parseFloat(d.height)/100,10):d.height+k;if(g&&(c.width>a[0]||c.height>a[1]))if(e.type==
"image"||e.type=="swf"){g=d.width/d.height;if(c.width>a[0]){c.width=a[0];c.height=parseInt((c.width-k)/g+k,10)}if(c.height>a[1]){c.height=a[1];c.width=parseInt((c.height-k)*g+k,10)}}else{c.width=Math.min(c.width,a[0]);c.height=Math.min(c.height,a[1])}c.top=parseInt(Math.max(a[3]-20,a[3]+(a[1]-c.height-40)*0.5),10);c.left=parseInt(Math.max(a[2]-20,a[2]+(a[0]-c.width-40)*0.5),10);return c},V=function(){var a=e.orig?b(e.orig):false,c={};if(a&&a.length){c=a.offset();c.top+=parseInt(a.css("paddingTop"),
10)||0;c.left+=parseInt(a.css("paddingLeft"),10)||0;c.top+=parseInt(a.css("border-top-width"),10)||0;c.left+=parseInt(a.css("border-left-width"),10)||0;c.width=a.width();c.height=a.height();c={width:c.width+d.padding*2,height:c.height+d.padding*2,top:c.top-d.padding-20,left:c.left-d.padding-20}}else{a=U();c={width:d.padding*2,height:d.padding*2,top:parseInt(a[3]+a[1]*0.5,10),left:parseInt(a[2]+a[0]*0.5,10)}}return c},Z=function(){if(t.is(":visible")){b("div",t).css("top",L*-40+"px");L=(L+1)%12}else clearInterval(K)};
b.fn.fancybox=function(a){if(!b(this).length)return this;b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(c){c.preventDefault();if(!h){h=true;b(this).blur();o=[];q=0;c=b(this).attr("rel")||"";if(!c||c==""||c==="nofollow")o.push(this);else{o=b("a[rel="+c+"], area[rel="+c+"]");q=o.index(this)}I()}});return this};b.fancybox=function(a,c){var g;if(!h){h=true;g=typeof c!=="undefined"?c:{};o=[];q=parseInt(g.index,10)||0;if(b.isArray(a)){for(var k=
0,C=a.length;k<C;k++)if(typeof a[k]=="object")b(a[k]).data("fancybox",b.extend({},g,a[k]));else a[k]=b({}).data("fancybox",b.extend({content:a[k]},g));o=jQuery.merge(o,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},g,a));else a=b({}).data("fancybox",b.extend({content:a},g));o.push(a)}if(q>o.length||q<0)q=0;I()}};b.fancybox.showActivity=function(){clearInterval(K);t.show();K=setInterval(Z,66)};b.fancybox.hideActivity=function(){t.hide()};b.fancybox.next=function(){return b.fancybox.pos(p+
1)};b.fancybox.prev=function(){return b.fancybox.pos(p-1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a);o=l;if(a>-1&&a<l.length){q=a;I()}else if(d.cyclic&&l.length>1){q=a>=l.length?0:l.length-1;I()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");N();e.onCancel(o,q,e);h=false}};b.fancybox.close=function(){function a(){u.fadeOut("fast");n.empty().hide();f.hide();b.event.trigger("fancybox-cleanup");j.empty();d.onClosed(l,p,d);l=e=[];p=q=0;d=e={};h=false}if(!(h||f.is(":hidden"))){h=
true;if(d&&false===d.onCleanup(l,p,d))h=false;else{N();b(E.add(z).add(A)).hide();b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");j.find("iframe").attr("src",M&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");d.titlePosition!=="inside"&&n.empty();f.stop();if(d.transitionOut=="elastic"){r=V();var c=f.position();i={top:c.top,left:c.left,width:f.width(),height:f.height()};if(d.opacity)i.opacity=1;n.empty().hide();B.prop=1;
b(B).animate({prop:0},{duration:d.speedOut,easing:d.easingOut,step:T,complete:a})}else f.fadeOut(d.transitionOut=="none"?0:d.speedOut,a)}}};b.fancybox.resize=function(){u.is(":visible")&&u.css("height",b(document).height());b.fancybox.center(true)};b.fancybox.center=function(a){var c,g;if(!h){g=a===true?1:0;c=U();!g&&(f.width()>c[0]||f.height()>c[1])||f.stop().animate({top:parseInt(Math.max(c[3]-20,c[3]+(c[1]-j.height()-40)*0.5-d.padding)),left:parseInt(Math.max(c[2]-20,c[2]+(c[0]-j.width()-40)*0.5-
d.padding))},typeof a=="number"?a:200)}};b.fancybox.init=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),t=b('<div id="fancybox-loading"><div></div></div>'),u=b('<div id="fancybox-overlay"></div>'),f=b('<div id="fancybox-wrap"></div>'));D=b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
D.append(j=b('<div id="fancybox-content"></div>'),E=b('<a id="fancybox-close"></a>'),n=b('<div id="fancybox-title"></div>'),z=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),A=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));E.click(b.fancybox.close);t.click(b.fancybox.cancel);z.click(function(a){a.preventDefault();b.fancybox.prev()});A.click(function(a){a.preventDefault();b.fancybox.next()});
b.fn.mousewheel&&f.bind("mousewheel.fb",function(a,c){if(h)a.preventDefault();else if(b(a.target).get(0).clientHeight==0||b(a.target).get(0).scrollHeight===b(a.target).get(0).clientHeight){a.preventDefault();b.fancybox[c>0?"prev":"next"]()}});b.support.opacity||f.addClass("fancybox-ie");if(M){t.addClass("fancybox-ie6");f.addClass("fancybox-ie6");b('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)}}};
b.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",
easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};b(document).ready(function(){b.fancybox.init()})})(jQuery);

/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function(a){a.fn.slides=function(b){return b=a.extend({},a.fn.slides.option,b),this.each(function(){function w(g,h,i){if(!p&&o){p=!0,b.animationStart(n+1);switch(g){case"next":l=n,k=n+1,k=e===k?0:k,r=f*2,g=-f*2,n=k;break;case"prev":l=n,k=n-1,k=k===-1?e-1:k,r=0,g=0,n=k;break;case"pagination":k=parseInt(i,10),l=a("."+b.paginationClass+" li."+b.currentClass+" a",c).attr("href").match("[^#/]+$"),k>l?(r=f*2,g=-f*2):(r=0,g=0),n=k}h==="fade"?b.crossfade?d.children(":eq("+k+")",c).css({zIndex:10}).fadeIn(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1)}):d.children(":eq("+l+")",c).fadeOut(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing)}):d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing,function(){a.browser.msie&&a(this).get(0).style.removeAttribute("filter")}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+k+")").css({left:r,display:"block"}),b.autoHeight?d.animate({left:g,height:d.children(":eq("+k+")").outerHeight()},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1}):d.animate({left:g},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1})),b.pagination&&(a("."+b.paginationClass+" li."+b.currentClass,c).removeClass(b.currentClass),a("."+b.paginationClass+" li:eq("+k+")",c).addClass(b.currentClass))}}function x(){clearInterval(c.data("interval"))}function y(){b.pause?(clearTimeout(c.data("pause")),clearInterval(c.data("interval")),u=setTimeout(function(){clearTimeout(c.data("pause")),v=setInterval(function(){w("next",i)},b.play),c.data("interval",v)},b.pause),c.data("pause",u)):x()}a("."+b.container,a(this)).children().wrapAll('<div class="slides_control"/>');var c=a(this),d=a(".slides_control",c),e=d.children().size(),f=d.children().outerWidth(),g=d.children().outerHeight(),h=b.start-1,i=b.effect.indexOf(",")<0?b.effect:b.effect.replace(" ","").split(",")[0],j=b.effect.indexOf(",")<0?i:b.effect.replace(" ","").split(",")[1],k=0,l=0,m=0,n=0,o,p,q,r,s,t,u,v;if(e<2)return a("."+b.container,a(this)).fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()}),a("."+b.next+", ."+b.prev).fadeOut(0),!1;if(e<2)return;h<0&&(h=0),h>e&&(h=e-1),b.start&&(n=h),b.randomize&&d.randomize(),a("."+b.container,c).css({overflow:"hidden",position:"relative"}),d.children().css({position:"absolute",top:0,left:d.children().outerWidth(),zIndex:0,display:"none"}),d.css({position:"relative",width:f*3,height:g,left:-f}),a("."+b.container,c).css({display:"block"}),b.autoHeight&&(d.children().css({height:"auto"}),d.animate({height:d.children(":eq("+h+")").outerHeight()},b.autoHeightSpeed));if(b.preload&&d.find("img:eq("+h+")").length){a("."+b.container,c).css({background:"url("+b.preloadImage+") no-repeat 50% 50%"});var z=d.find("img:eq("+h+")").attr("src")+"?"+(new Date).getTime();a("img",c).parent().attr("class")!="slides_control"?t=d.children(":eq(0)")[0].tagName.toLowerCase():t=d.find("img:eq("+h+")"),d.find("img:eq("+h+")").attr("src",z).load(function(){d.find(t+":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){a(this).css({zIndex:5}),a("."+b.container,c).css({background:""}),o=!0,b.slidesLoaded()})})}else d.children(":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()});b.bigTarget&&(d.children().css({cursor:"pointer"}),d.children().click(function(){return w("next",i),!1})),b.hoverPause&&b.play&&(d.bind("mouseover",function(){x()}),d.bind("mouseleave",function(){y()})),b.generateNextPrev&&(a("."+b.container,c).after('<a href="#" class="'+b.prev+'">Prev</a>'),a("."+b.prev,c).after('<a href="#" class="'+b.next+'">Next</a>')),a("."+b.next,c).click(function(a){a.preventDefault(),b.play&&y(),w("next",i)}),a("."+b.prev,c).click(function(a){a.preventDefault(),b.play&&y(),w("prev",i)}),b.generatePagination?(b.prependPagination?c.prepend("<ul class="+b.paginationClass+"></ul>"):c.append("<ul class="+b.paginationClass+"></ul>"),d.children().each(function(){a("."+b.paginationClass,c).append('<li><a href="#'+m+'">'+(m+1)+"</a></li>"),m++})):a("."+b.paginationClass+" li a",c).each(function(){a(this).attr("href","#"+m),m++}),a("."+b.paginationClass+" li:eq("+h+")",c).addClass(b.currentClass),a("."+b.paginationClass+" li a",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$"),n!=q&&w("pagination",j,q),!1}),a("a.link",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$")-1,n!=q&&w("pagination",j,q),!1}),b.play&&(v=setInterval(function(){w("next",i)},b.play),c.data("interval",v))})},a.fn.slides.option={preload:!1,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:!1,next:"next",prev:"prev",pagination:!0,generatePagination:!0,prependPagination:!1,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:!1,randomize:!1,play:0,pause:0,hoverPause:!1,autoHeight:!1,autoHeightSpeed:350,bigTarget:!1,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}},a.fn.randomize=function(b){function c(){return Math.round(Math.random())-.5}return a(this).each(function(){var d=a(this),e=d.children(),f=e.length;if(f>1){e.hide();var g=[];for(i=0;i<f;i++)g[g.length]=i;g=g.sort(c),a.each(g,function(a,c){var f=e.eq(c),g=f.clone(!0);g.show().appendTo(d),b!==undefined&&b(f,g),f.remove()})}})}})(jQuery);
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
/*! 
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/
(function($){$.fn.fitVids=function(options){var settings={customSelector:null}
var div=document.createElement('div'),ref=document.getElementsByTagName('base')[0]||document.getElementsByTagName('script')[0];div.className='fit-vids-style';div.innerHTML='&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';ref.parentNode.insertBefore(div,ref);if(options){$.extend(settings,options);}
return this.each(function(){var selectors=["iframe[src^='http://player.vimeo.com']","iframe[src^='http://www.youtube.com']","iframe[src^='http://www.kickstarter.com']","object","embed"];if(settings.customSelector){selectors.push(settings.customSelector);}
var $allVideos=$(this).find(selectors.join(','));$allVideos.each(function(){var $this=$(this);if(this.tagName.toLowerCase()=='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return;}
var height=this.tagName.toLowerCase()=='object'?$this.attr('height'):$this.height(),aspectRatio=height/$this.width();if(!$this.attr('id')){var videoID='fitvid'+Math.floor(Math.random()*999999);$this.attr('id',videoID);}
$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+"%");$this.removeAttr('height').removeAttr('width');});});}})(jQuery);