var assert = require('assert');

var tests = {
	'There will be no segment identifiers defined by default.' : function(beforeExit, assert) {
		var s = require('slicer').create();		
		assert.ok(s.getSegmentIdentifiers().length == 0);	
	},
	'Adding a segment identifiers' : function(beforeExit, assert) {
		var s = require('slicer').create();		

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
		var s = require('slicer').create();

		var segs = s.getSegmentIdentifiers();
		assert.equal(segs.length,0);

		s.addSegmentIdentifier('controller','index');

		var segs = s.getSegmentIdentifiers();

		assert.equal(segs.length,1);
		assert.deepEqual(segs, [{'name' : 'controller','default' : 'index'}]);
	},
	'Segment identifiers can be cleared' : function(beforeExit, assert) {
		var s = require('slicer').create();

		var segs = s.getSegmentIdentifiers();
		assert.equal(segs.length,0);

		s.addSegmentIdentifier('controller','index');
		
		assert.equal(segs.length,1);

		s.clearSegmentIdentifiers();

		assert.ok(s.getSegmentIdentifiers().length == 0);
	},
	'A uri can be sliced into labelled segments' : function(beforeExit, assert) {
		var s = require('slicer').create();

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
