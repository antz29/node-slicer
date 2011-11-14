/**
 * @api private
 */
function NodeSlicer() {
	
	var segments = [];

	this.getSegmentIdentifiers = function() {
		return segments;
	};

	this.addSegmentIdentifier = function(name,default_value) {
		var seg = {
			"name" : name
		};

		if (default_value !== undefined) {
			seg["default"] = default_value;
		}

		segments.push(seg);
	};

	this.clearSegmentIdentifiers = function() {
		segments = [];
	};

	this.slice = function(uri) {
		var i, uri_seg, seg_spec, val, out = [];

		uri = uri.split('/').filter( function(val) { 
			return val ? true : false; 
		});

		for (i = 0; i < segments.length; i++) {
			uri_seg = uri.shift();
			seg_spec = segments[i];

			val = uri_seg ? uri_seg : 
				(seg_spec['default'] ? seg_spec['default'] : null);

			out[seg_spec.name] = val;
		}
		out.uri = [];
		if (uri.length) { 
			out.uri = uri; 
		}

		return out;
	};

}

/**
 * Create a new slicer instance.
 *
 * @return {NodeSlicer} NodeSlicer instance.
 * @api public
 */
exports.create = function() { return new NodeSlicer(); };
