# node-slicer - Slice your URIs

[![Build Status](https://secure.travis-ci.org/antz29/node-slicer.png)](http://travis-ci.org/#!/antz29/node-slicer)

## Installation

    npm install slicer 

## What's it do?

It allows you to slice up URIs into named segments. This can be useful for routing requests etc.

## Usage

    // Get the Slicer module
    var Slicer = require("slicer");

    // Create a new slicer (you can have multiple slicer instances that are independant of one another)
    var s = new Slicer();

    // Add a segment identifier for the first URI segment with a default value of 'index'.
    s.addSegmentIdentifier('controller','index');

    // Add a segment identifier for the second URI segment with a default value of 'index'.
    s.addSegmentIdentifier('action','index');

    // Slice a URI
    var uri = s.slice('/foo');

    // Outputs: 
    // { 
    //     controller: 'foo',
    //     action: 'index',
    //     uri: [] 
    // }

    // Note that the action segment is given the default value.

    // Slice another URI
    var uri = s.slice('/foo/bar/a/b/c');

    // Outputs: 
    // {   
    //     controller: 'foo',
    //     action: 'bar',
    //     uri: [ 'a', 'b', 'c' ] 
    // }

    // Note that the uri element contains any non labeled segments.

## Bugs

See <https://github.com/antz29/node-slicer/issues>.
