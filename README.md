Browserify plugin that replaces the default packing method (see [browser-pack](https://github.com/substack/browser-pack)) with a JSON packing method. The result is a browserify bundle in JSON format.

This plugin is part of the `browserify-diff` toolchain.

## Example

Input:
```json
[
  {
    "id": "a1b5af78",
    "source": "console.log(require('./foo')(5))",
    "deps": { "./foo": "b8f69fa5" },
    "entry": true
  },
  {
    "id": "b8f69fa5",
    "source": "module.exports = function (n) { return n * 111 }",
    "deps": {}
  }
]
```

Output (pretty-printed):
```json
{
	"modules" : {
		"a1b5af78" : ["function(require,module,exports){\nconsole.log(require('./foo')(5))\n}", { "./foo" : "b8f69fa5" }],
		"b8f69fa5" : ["function(require,module,exports){\nmodule.exports = function (n) { return n * 111 }\n}", {}]
	},
	"entry" : ["a1b5af78"]
}
```

## Methods
`var bundle = require('browserify-json-bundler');`

### bundle(opts)
Bundles the package according to the example above.

#### Arguments
`[opts.version]` An optional version number or hash that will be added to the root of the json output.

