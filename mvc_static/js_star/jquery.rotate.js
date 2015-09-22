/**
 * 图片旋转
 * name 方向
 * maxWidth  最大宽度
 */
jQuery.fn.rotate = function(name, maxWidth) {
	var img = $(this)[0],
	step = img.getAttribute('step');
	if (!this.data('width') && !$(this).data('height')) {
		this.data('width', img.width);
		this.data('height', img.height);
	};
	if (step == null) step = 0;
	if (name === 'right') {
		(step == 3) ? step = 0 : step++;
	} else if (name === 'left') {
		(step == 0) ? step = 3 : step--;
	};
	img.setAttribute('step', step);

	var show_width = this.data('width'),
	show_height = this.data('height');
	if ((step == 1 || step == 3) && this.data('width') < this.data('height') && this.data('height') > maxWidth) {
		show_height = maxWidth;
		show_width = this.data('width') * maxWidth / this.data('height');
	}
	// if ((step == 1 || step == 3) && this.data('height') > maxWidth) {
	// 	show_height = maxWidth;
	// 	show_width = this.data('width') * maxWidth / this.data('height');
	// }
	// if ((step == 0 || step == 2) && this.data('width') > maxWidth) {
	// 	show_width = maxWidth;
	// 	show_height = this.data('height') * maxWidth / this.data('width');
	// }

	if (document.all ) {//ie ...
		img.width = show_width;
		img.height = show_height;
		img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + step + ')';
		if((step == 1 || step == 3) && this.data('height') > maxWidth){
			img.style.display='block';
			$(this).parent().css("text-align","center");
		}else if(step == 1 || step == 3){
			//重新计算定位
			if(this.data('height')<maxWidth){
				img.style.position="relative";
				img.style.left=(maxWidth-this.data('height'))/2+"px";
			}
			img.style.display='';
			$(this).parent().css("text-align","left");
		}else{
			img.style.position="";
			img.style.left="";
			img.style.display='';
			$(this).parent().css("text-align","center");
		}
		// IE8高度设置
		if ($.browser.version >= 8) {
			switch (step) {
			case 0:
				this.parent().height('');
				break;
			case 1:
				this.parent().height(show_width + 10);
				break;
			case 2:
				this.parent().height('');
				break;
			case 3:
				this.parent().height(show_width + 10);
				break;
			};
		};
	}else {//chrome。。。
		var canvas = this.next('canvas')[0];
		if (this.next('canvas').length == 0) {
			this.css({
				'display': 'none'
			});
			canvas = document.createElement('canvas');
			img.parentNode.appendChild(canvas);
		}
		var rotation = Math.PI * (step*90) / 180;
		var costheta = Math.cos(rotation);
		var sintheta = Math.sin(rotation);
		if (!canvas.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = img.src;
		} else {
			canvas.oImage = canvas.oImage;
		}

		var ratio=1;
		if((step == 1 || step == 3 ) && canvas.oImage.height > show_height){
			ratio = show_height / canvas.oImage.height;
		}
		if((step == 0 || step == 2) && canvas.oImage.width > show_width) {
			ratio = show_width / canvas.oImage.width;
		}
		// if((step == 0 || step == 2) && this.data('width') > maxWidth) {
		// 	ratio = maxWidth / canvas.oImage.width;
		// }
//		console.log(this.data('width'), canvas.oImage.width, this.data('height'), canvas.oImage.height);
//		console.log(step, ratio);

		var context = canvas.getContext('2d');
		if(step == 1 || step == 3){
			canvas.width = show_height;
			canvas.height = show_width;
		}else{
			canvas.width = show_width;
			canvas.height = show_height;
		}

		context.scale(ratio, ratio);
		if (step == 0) {
			context.translate(sintheta*canvas.oImage.height, 0);
			// context.translate(canvas.oImage.height, 0);
		} else if (step == 1) {
			context.translate(canvas.oImage.height, 0);
		} else if (step == 2) {
			// context.translate(canvas.width, -costheta*canvas.oImage.height);
			context.translate(canvas.oImage.width, canvas.oImage.height);
		} else if (step == 3) {
			// context.translate(-costheta*canvas.oImage.width, this.data('width'));
			context.translate(-costheta*canvas.oImage.width, canvas.oImage.width);
		} else {
			context.translate(0,-sintheta*canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0);
	}

};

jQuery.fn.rotateRight = function(maxWidth) {
	this.rotate("right",maxWidth);
};

jQuery.fn.rotateLeft = function(maxWidth) {
	this.rotate("left",maxWidth);
};
