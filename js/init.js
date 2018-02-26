 $(document).ready(function(){

	var xOffset = 80;
	var yOffset = 180;
	var imgWidth = 200;
	var imgHeight = 200;
	var imgGutter = 20;
	var imgCount = 6;
	var x = new Array();
	var y = new Array();
	var scrollable, docHeight, winHeight;
	
	var scrollTop, scrollTopPow;
	
	getDimensions();
	updateScroll();
	updatePosition();

	var queue = [];
	queue.push($("#t1"));
	queue.push($("#t2"));
	queue.push($("#t3"));
	queue.push($("#t4"));
	queue.push($("#t5"));
	queue.push($("#t6"));
	
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
	
	if (iOS != true) {
		showAll();
		$(window).scroll(function() {
			updateScroll();
			updatePosition();
		});
	}
	else {
		$("#thumbs").css('position','absolute');
		$("#thumbs").css('width','1300px');
		$("#thumbs").css('height','100px');
		$("#thumbs").css('top','0px');
		$("#thumbs").css('left','0px');
		$("#projects").hide();
		$("#swf").hide();
		$("#mp4").show();
		showAll();
	}
	
	/*
	$(window).bind('scrollstart', function(){
		updateScroll();
	});
	$(window).bind('scrollstop', function(){
		updateScroll();
		animatePosition();
	});
	*/
	
	function showAll() {
		if (queue.length > 0) {
			queue.shift().fadeIn(150, showAll);
		}
	}
	
	function getDimensions(){
		docHeight = $(document).height();
		winHeight = $(window).height();
		scrollable = docHeight-winHeight;
		console.log('docHeight: ' + docHeight);
		console.log('winHeight: ' + winHeight);
		console.log('scrollable: ' + scrollable);
	}
	
	function updateScroll() {
		scrollTop = $(window).scrollTop();
	}
	
	function updatePosition() {
		if (scrollTop < scrollable/2) { updateTop(); }
		else { updateBottom();}
		move();
	}
	
	function animatePosition() {
		if (scrollTop < scrollable/2) { updateTop(); }
		else { updateBottom();}
		animate();
	}
	
	function updateBottom() {
		var scrollBottom = scrollable - scrollTop;
		scrollBottomPow = scrollBottom*scrollBottom/300; //accelleration
		for (i=0; i<imgCount; i++) {
			x[i] = (imgGutter+imgWidth) * i + xOffset + 120;	
			y[i] = winHeight - 680;
		}
		x[0] = x[0] + scrollBottomPow * 3;
		y[0] = y[0] + scrollBottomPow / 3;
		x[1] = x[1] - scrollBottomPow / 1.5;
		y[1] = y[1] - scrollBottomPow;
		x[2] = x[2];
		y[2] = y[2] - scrollBottomPow * 1.5;
		x[3] = x[3]							- 660;
		y[3] = y[3] + scrollBottomPow * 4 	+ 220;
		x[4] = x[4] - scrollBottomPow * 4	- 660;
		y[4] = y[4] + scrollBottomPow * 2 	+ 220;
		x[5] = x[5] + scrollBottomPow * 2	- 660;
		y[5] = y[5] 						+ 220;
		var opacity = 3-scrollBottom/100;
		$('#thumbs .img').css('opacity',opacity);
		console.log("* " + scrollBottom + "/" + opacity);
	}
	
	function updateTop() {
		scrollTopPow = scrollTop*scrollTop/300; //accelleration

		for (i=0; i<imgCount; i++) {
			x[i] = (imgGutter+imgWidth) * i + xOffset;	
			y[i] = yOffset;			
		}
		x[0] = x[0] + scrollTopPow * 3;
		y[0] = y[0] + scrollTopPow / 3;
		x[1] = x[1] - scrollTopPow / 1.5;
		y[1] = y[1] - scrollTopPow;
		x[2] = x[2];
		y[2] = y[2] - scrollTopPow * 1.5;
		x[3] = x[3];
		y[3] = y[3] + scrollTopPow * 4;
		x[4] = x[4] - scrollTopPow * 4;
		y[4] = y[4] + scrollTopPow * 2;
		x[5] = x[5] + scrollTopPow * 2;
		y[5] = y[5];
		var opacity = 3-scrollTop/100;
		$('#thumbs .img').css('opacity',opacity);
		//console.log(scrollTop + "/" + opacity);
	}
	
	function move() {
		for (i=0; i<imgCount; i++) {
			var selector = "#t"+ (i+1);
			$(selector).css('left',x[i]+'px');
			$(selector).css('top',y[i]+'px');
		}
	}
	
	function animate() {
		for (i=0; i<imgCount; i++) {
			var selector = "#t"+ (i+1);
			$(selector).animate({left: x[i], top: y[i]},500,'easeOutQuart');
		}
	}
 });