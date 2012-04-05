require('coffee-script');
var assert = require('assert');

function getSlicer() {
	var Slicer = require('../');
	return new Slicer();
}

var tests = {
	'There will be no segment identifiers defined by default.' : function(beforeExit, assert) {
		console.log('* There will be no segment identifiers defined by default.')
		var s = getSlicer();		
		assert.ok(s.getSegmentIdentifiers().length == 0);	
	},
	'Adding a segment identifiers' : function(beforeExit, assert) {
		console.log('* Adding a segment identifiers')
		var s = getSlicer();

		s.addSegmentIdentifier('controller','index');

		var segs = s.getSegmentIdentifiers();
	
		assert.deepEqual(segs, [{'name' : 'controller','default' : 'index'}]);

		s.addSegmentIdentifier('action','index');

		var segs = s.getSegmentIdentifiers();
	
		assert.equal(segs.length,2);
		assert.deepEqual(segs, [{'name' : 'controller','default' : 'index'},{'name' : 'action','default' : 'index'}]);

		s.addSegmentIdentifier('other');

		var segs = s.getSegmentIdentifiers();
	
		assert.equal(segs.length,3);
		assert.deepEqual(segs, [{'name' : 'controller','default' : 'index'},{'name' : 'action','default' : 'index'},{'name' : 'other'}]);
	},
	'Segment identifiers can be retrieved' : function(beforeExit, assert) {
		console.log('* Segment identifiers can be retrieved')
		var s = getSlicer();

		var segs = s.getSegmentIdentifiers();
		assert.equal(segs.length,0);

		s.addSegmentIdentifier('controller','index');

		var segs = s.getSegmentIdentifiers();

		assert.equal(segs.length,1);
		assert.deepEqual(segs, [{'name' : 'controller','default' : 'index'}]);
	},
	'Segment identifiers can be cleared' : function(beforeExit, assert) {
		console.log('* Segment identifiers can be cleared')
		var s = getSlicer();

		var segs = s.getSegmentIdentifiers();
		assert.equal(segs.length,0);

		s.addSegmentIdentifier('controller','index');
		
		assert.equal(segs.length,1);

		s.clearSegmentIdentifiers();

		assert.ok(s.getSegmentIdentifiers().length == 0);
	},
	'A uri can be sliced into labelled segments' : function(beforeExit, assert) {
		console.log('* A uri can be sliced into labelled segments')
		var s = getSlicer();

		var segs = s.getSegmentIdentifiers();
		assert.equal(segs.length,0);

		s.addSegmentIdentifier('foo','index');
		s.addSegmentIdentifier('bar','index');
		s.addSegmentIdentifier('baz');

		assert.deepEqual(s.slice('/'),{
			'foo' : 'index',
			'bar' : 'index',
			'baz' : null,
			'uri' : []
		});

		assert.deepEqual(s.slice('/one'),{
			'foo' : 'one',
			'bar' : 'index',
			'baz' : null,
			'uri' : []
		});

		assert.deepEqual(s.slice('/one/two'),{
			'foo' : 'one',
			'bar' : 'two',
			'baz' : null,
			'uri' : []
		});

		assert.deepEqual(s.slice('/one/two/three'),{
			'foo' : 'one',
			'bar' : 'two',
			'baz' : 'three',
			'uri' : []
		});

		assert.deepEqual(s.slice('/one/two/three/a/b/c'),{
			'foo' : 'one',
			'bar' : 'two',
			'baz' : 'three',
			'uri' : ['a','b','c']
		});

	}

};

module.exports = tests;
