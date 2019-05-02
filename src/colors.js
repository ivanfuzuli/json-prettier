export const $ = {
	enabled: true,

	// modifiers
	reset: init({}),
	bold: init('bold'),
	// colors
	black: init('black'),
	red: init('red'),
	green: init('green'),
	blue: init('blue'),
	magenta: init('magenta'),
	cyan: init('cyan'),
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (str.includes(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);

	return ctx;
}

function init(color) {
	let blk = {
		open: `<span class="jw-${color}">`,
		close: `</span>`,
		rgx: new RegExp(`\\<`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			this.has.includes(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

export default $;
