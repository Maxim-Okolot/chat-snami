var fmNoty = (function() {
	var _layouts = [];
	var _noties = [];

	var _default = {
		position: 'top', //top, bottom, rightTop, rightBottom, leftTop, leftBottom
		type: 'alert', //alert, error, information, question
		title: false,
		link: false,
		linkBlank: false,
		timeout: 3000,
		closeWith: ['button', 'click'], // ['button', 'click', 'hover']
		width: false,
		height: false,
		callbacks: {
			show: false,
			close: false,
			click: false,
			hover: false
		}
	};

	var __setOptions = function(options) {
		if (!options) return _default;

		for (var i in _default) {
			if (options.hasOwnProperty(i)) continue;
			options[i] = _default[i];
		}

		return options;
	}
	var __createLayouts = function(layout) {
		if (_layouts[layout]) return _layouts[layout];

		var lay = document.createElement('div');
		lay.setAttribute('class', 'noty-layout-' + layout.toLowerCase());
		_layouts[layout] = lay;
		document.body.appendChild(lay);
		return lay;
	}

	var __destroy = function(block, callbacks) {
		if (!block || !block.parentNode) return false;
		block.style.opacity = 0;
		block.style.top = '20px';
		setTimeout(function() {
			block.parentNode.removeChild(block);
			if (callbacks && (typeof callbacks.close === 'function')) callbacks.close();
		}, 200);
	}

	var __createNoty = function(text, options) {
		var layout = __createLayouts(options.position);
		var blockDiv = document.createElement('div');
		var textDiv = document.createElement('div');

		var className = 'noty noty-' + options.position + ' noty-' + options.type;
		blockDiv.setAttribute('class', className);

		textDiv.setAttribute('class', 'noty-text');
		textDiv.innerHTML = text;
		if (options.title) {
			var titleDiv = document.createElement('div');
			titleDiv.setAttribute('class', 'noty-title');
			titleDiv.innerHTML = options.title;
			blockDiv.appendChild(titleDiv);
		}

		if (options.width) blockDiv.style.width = options.width;
		if (options.height) blockDiv.style.height = options.height;

		blockDiv.appendChild(textDiv);
		layout.appendChild(blockDiv);

		//show
		setTimeout(function() {
			blockDiv.style.opacity = 1;
			blockDiv.style.top = 'auto';
			if (options.callbacks && (typeof options.callbacks.show === 'function')) options.callbacks.show();
		}, 100);

		if (options.link) {
			blockDiv.style.cursor = 'pointer';
			blockDiv.onclick = function() {
				if (options.link) {
					window.open(options.link);
				} else {
					location.href = options.link;
				}
			}
		}
		else if (options.closeWith) {
			for (var i = 0, length = options.closeWith.length; i <length; i++) {
				var closeAct = options.closeWith[i].toLowerCase();
				if (closeAct === 'hover') {
					blockDiv.onmousemove = function() {
						__destroy(blockDiv, options.callbacks);
						blockDiv.onmousemove = null;
					}
					break;
				}
				else if (closeAct === 'click' && !options.link) {
					blockDiv.style.cursor = 'pointer';
					blockDiv.onclick = function() {
						__destroy(blockDiv, options.callbacks);
						blockDiv.onclick = null;
					}
					break;
				}
				else if (closeAct === 'button') {
					var _close = document.createElement('div');
					_close.setAttribute('class', 'noty-close');
					blockDiv.appendChild(_close);
					if (options.title) {
						titleDiv.style.paddingRight = '17px';
					}
					_close.onclick = function(e) {
						__destroy(blockDiv, options.callbacks);
						_close.onclick = null;
					}
					break;
				}
			}
		}




		//close
		setTimeout(function() {
			if (blockDiv) __destroy(blockDiv, options.callbacks);
		}, options.timeout);
	}

	return function(text, options) {
		options = __setOptions(options);
		__createNoty(text, options);
		var n = {
			options: options
		}

		_noties.push(n);
	}
})();