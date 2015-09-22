seajs.use('jquery', function($) {
	$(document).ready(function() {
		//年终专题topic/yearEnd.php
		if ($('#yearEnd-tagBox').length) {
			$('#yearEnd-tagBox li').on('mouseover', function() {
				var oldpic = $(this).find('img').attr('src');
				var eventpic = $(this).find('img').attr('data-eventpic');
				$(this).find('img').attr({'data-eventpic': oldpic, 'src': eventpic});
			}).on('mouseout', function() {
				var oldpic = $(this).find('img').attr('src');
				var eventpic = $(this).find('img').attr('data-eventpic');
				$(this).find('img').attr({'data-eventpic': oldpic, 'src': eventpic});
			});

			var yearEndpicTimeid = '';
			$('div.imgBox div.imgList ul li').on('mouseover', function(e) {
				if (yearEndpicTimeid)
					clearTimeout(yearEndpicTimeid);
				var $self = $(this);
				yearEndpicTimeid = setTimeout(function() {
					$('div.videoOne').find('dt a').attr({'href': $self.find('a').attr('href'), 'title': $self.find('a').attr('title')}).text($self.find('a').attr('title'))
						.end()
						.find('dd').text($self.find('img').attr('data-desc'));
				}, 500);

			}).on('mouseout', function() {
				if (yearEndpicTimeid)
					clearTimeout(yearEndpicTimeid);
			});
			
			//滑动图片js
			if ($('.slidebox').length) {
				seajs.use('module/slidebox', function() {
					$('.slidebox').each(function() {
						$(this).slideBox();
					});
				});
			}
		}
	});
});