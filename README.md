Browserify plugin that replaces the default packing method with a JSON packing method. The result is a browserify bundle in JSON format.

This plugin is part of the [browserify-diff](https://github.com/Magnetme/browserify-diff) toolchain (you probably don't want to use this module directly).

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
		"a1b5af78" : ["console.log(require('./foo')(5))", { "./foo" : "b8f69fa5" }],
		"b8f69fa5" : ["module.exports = function (n) { return n * 111 }", {}]
	},
	"entry" : ["a1b5af78"]
}
```

## Usage
```javascript
var browserify = require('browserify');
var bundler = require('browserify-json-bundler');

//ExposeAll is required
browserify('app.js', { exposeAll : true })
	.plugin(bundler, { version : getNextVersionNumber() })
	.bundle()
	.pipe(fs.createWriteStream('bundle.js'));
```


## Methods
`var bundler = require('browserify-json-bundler');`

### bundler(b, opts)
Bundles the package according to the example above.

**parameters**
- `b` A browserify instance
- `[opts.version]` An optional version number or hash that will be added to the root of the json output.

