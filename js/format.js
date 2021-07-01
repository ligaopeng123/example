/**********************************************************************
 *
 * @模块名称: format
 *
 * @模块用途: format
 *
 * @date: 2021/6/25 10:06
 *
 * @版权所有: pgli
 *
 **********************************************************************/
const format = (str) => {
	return (...args) => {
		let result = str;
		for (let i = 0; i < args.length; i++) {
			if (args[i] != undefined) {
				const reg = new RegExp('({)' + i + '(})', 'g');
				result = result.replace(reg, args[i]);
			}
		}
		return result;
	}
};


String.prototype.format = function (args) {
	let result = this;
	console.log('this', this);
	console.log('args', args);
	console.log('arguments', arguments);
	// if (arguments.length > 0) {
	// 	if (arguments.length == 1 && typeof (args) == 'object') {
	// 		for (let key in args) {
	// 			if (args[key] != undefined) {
	// 				const reg = new RegExp('({' + key + '})', 'g');
	// 				result = result.replace(reg, args[key]);
	// 			}
	// 		}
	// 	} else {
	// 		for (let i = 0; i < arguments.length; i++) {
	// 			if (arguments[i] != undefined) {
	// 				const reg = new RegExp('({)' + i + '(})', 'g');
	// 				result = result.replace(reg, arguments[i]);
	// 			}
	// 		}
	// 	}
	// }
	return result;
};

// '{0}1{1}'.format('x', 'y');