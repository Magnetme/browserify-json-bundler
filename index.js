var through = require('through2');

function wrapSource(module) {
	return 'function(require,module,exports){\n' + module + '\n}';
}

module.exports = function browserifyJsonBundler(bundle, opts) {
	var isFirst = true;

	var stream = through.obj(function(module, enc, next) {
			var moduleString = '"' + module.id + '":[' + JSON.stringify(wrapSource(module.source)) + ',' + JSON.stringify(module.deps) + ']';

			if (!isFirst) {
				moduleString = ',' + moduleString;
			} else {
				isFirst = false;
			}

			stream.push(Buffer(moduleString));
			next();
		}, function flush(){
			//Close modules object & entire json object
			stream.push(Buffer('}}'));
			stream.push(null);
		}
	);

	var bundleStart = '{';
	if (opts.version !== undefined) {
		diffStart += '"version":' + JSON.stringify(opts.version) + ',';
	}
	bundleStart += '"modules":{';

	stream.push(Buffer(bundleStart));

	bundle.pipeline.get('pack').splice(0, 1, stream);
};
