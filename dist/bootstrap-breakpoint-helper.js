/*jshint multistr:true, devel: true, unused:false */
(function(){

	function initBBHBookmarklet() {
  		
  		var htmlWindowSize = '<div id="bbh-window-size" class="bbh-window-size"><span id="bbh-width">1000</span>px x <span id="bbh-height">2000</span>px</div>';

      var CSS = '<style>\
        .bootstrap-breakpoint-helper {\
          background: white;\
          position: fixed;\
          bottom: 0;\
          left: 0;\
          font-size: 16px;\
          z-index: 9999;\
          width: 100%;\
        }\
        .bootstrap-breakpoint-helper span.bg {\
          font-weight: bold;\
          color: white;\
          display: block;\
          padding: 5px;\
          float: left;\
          margin-right: 10px;\
        }\
        .bootstrap-breakpoint-helper .css-info span {\
          font-size: 13px;\
          margin: 0 3px 3px 0;  \
          padding: 3px 5px;\
          display: inline-block;\
          white-space: nowrap;\
          background: #eee;\
        }\
        .bbh-window-size {\
          position: fixed; \
          top: 5px; \
          left: 5px;\
          padding: 2px 5px; \
          background-color: rgba(255,255,255,0.8);\
        }\
      </style>';
      
			var htmlBS4 = '<div id="bootstrap-breakpoint-helper" class="bootstrap-breakpoint-helper">\
        <div class="hidden-sm-up">\
          <span class="bg" style="background: green;">XS</span>\
          <div class="css-info">\
            <span>.hidden-xs-up</span>\
            <span>.hidden-xs-down</span>\
            <span>media-breakpoint-up(xs)</span>\
            <span>media-breakpoint-down(xs)</span>\
            <span>media-breakpoint-only(xs)</span>\
            <span>media-breakpoint-between(xs,??)</span>\
          </div>\
        </div>\
        <div class="hidden-xs-down hidden-md-up">\
          <span class="bg" style="background: blue;">SM</span>\
          <div class="css-info">\
            <span>.hidden-sm-up</span>\
            <span>.hidden-sm-down</span>\
            <span>media-breakpoint-up(sm)</span>\
            <span>media-breakpoint-down(sm)</span>\
            <span>media-breakpoint-only(sm)</span>\
            <span>media-breakpoint-between(sm,??)</span>\
          </div>\
        </div>\
        <div class="hidden-sm-down hidden-lg-up">\
          <span class="bg" style="background: orange;">MD</span>\
          <div class="css-info">\
            <span>.hidden-md-up</span>\
            <span>.hidden-md-down</span>\
            <span>media-breakpoint-up(md)</span>\
            <span>media-breakpoint-down(md)</span>\
            <span>media-breakpoint-only(md)</span>\
            <span>media-breakpoint-between(md,??)</span>\
          </div>\
        </div>\
        <div class="hidden-md-down hidden-xl-up">\
          <span class="bg" style="background: red;">LG</span>\
          <div class="css-info">\
            <span>.hidden-lg-up</span>\
            <span>.hidden-lg-down</span>\
            <span>media-breakpoint-up(lg)</span>\
            <span>media-breakpoint-down(lg)</span>\
            <span>media-breakpoint-only(lg)</span>\
            <span>media-breakpoint-between(lg,??)</span>\
            <span>media-breakpoint-between(??,lg)</span>\
          </div>\
        </div>\
        <div class="hidden-lg-down hidden-xxl-up">\
          <span class="bg" style="background: black;">XL</span>\
          <div class="css-info">\
            <span>.hidden-xl-up</span>\
            <span>.hidden-xl-down</span>\
            <span>media-breakpoint-up(xl)</span>\
            <span>media-breakpoint-down(xl)</span>\
            <span>media-breakpoint-only(xl)</span>\
            <span>media-breakpoint-between(xl,??)</span>\
            <span>media-breakpoint-between(??,xl)</span>\
          </div>\
        </div>\
        <div class="hidden-xl-down">\
          <span class="bg" style="background: pink;">XXL</span>\
          <div class="css-info">\
            <span>.hidden-xxl-up</span>\
            <span>.hidden-xxl-down</span>\
            <span>media-breakpoint-up(xxl)</span>\
            <span>media-breakpoint-down(xxl)</span>\
            <span>media-breakpoint-only(xxl)</span>\
            <span>media-breakpoint-between(??,xxl)</span>\
          </div>\
        </div>\
      </div>';
      
      var htmlBS3 = '<div id="bootstrap-breakpoint-helper" class="bootstrap-breakpoint-helper">\
        <div class="visible-xs-block">\
          <span class="bg" style="background: green;">XS</span>\
          <div class="css-info">\
            <span>.hidden-xs</span><span>.visible-xs-block</span><span>.visible-xs-inline</span><span>.visible-xs-inline-block</span>\
          </div>\
        </div>\
        <div class="visible-sm-block">\
          <span class="bg" style="background: blue;">SM</span>\
          <div class="css-info">\
            <span>.hidden-sm</span><span>.visible-sm-block</span><span>.visible-sm-inline</span><span>.visible-sm-inline-block</span>\
          </div>\
        </div>\
        <div class="visible-md-block">\
          <span class="bg" style="background: orange;">MD</span>\
          <div class="css-info">\
            <span>.hidden-md</span><span>.visible-md-block</span><span>.visible-md-inline</span><span>.visible-md-inline-block</span>\
          </div>\
        </div>\
        <div class="visible-lg-block">\
          <span class="bg" style="background: red;">LG</span>\
          <div class="css-info">\
            <span>.hidden-lg</span><span>.visible-lg-block</span><span>.visible-lg-inline</span><span>.visible-lg-inline-block</span>\
          </div>\
        </div>\
        </div>\
      </div>';
   
      var getBootstrapVersion = function () {
        var deferred = $.Deferred();
        
        var script = $('script[src*="bootstrap"]');
        if (script.length === 0) {
          return deferred.reject();
        }
        
        var src = script.attr('src');
        
        $.get(src).done(function(response) {
          var matches = response.match(/(?!v)([.\d]+[.\d])/);
            if (matches && matches.length > 0) {
              var version = matches[0];
              deferred.resolve(version);
            }
          });
      
        return deferred;
      };
      
      var majorBootstrapVersion;
      
      getBootstrapVersion().done(function(version) {
        //console.log(version); // '3.3.4'
        majorBootstrapVersion = version.split('.')[0];
      });
      
      $(document).ready(function() {
        if($('#bbh-window-size').length == 0) { //only append the first time!
          $('body').append(CSS);
          $('body').append(htmlWindowSize);
          $('#bbh-width').text($(window).width());
          $('#bbh-height').text($(window).height());
          
          if(majorBootstrapVersion < 4) {
            $('body').append(htmlBS3);
          } else {
            $('body').append(htmlBS4);
          }
        }
      });
      
      $(window).resize(function() {
        $('#bbh-width').text($(window).width());
        $('#bbh-height').text($(window).height());      
      });
    
	}

	// the minimum version of jQuery we want
	var v = "3.1.1";

	// check prior inclusion and version

	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				done = true;
				initBBHBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initBBHBookmarklet();
	}

})();

