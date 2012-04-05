class Slicer

  constructor: ->
    @segments = [];

  getSegmentIdentifiers: -> @segments

  addSegmentIdentifier: (name,default_value) ->
    seg = { "name" : name }

    if default_value != undefined then seg["default"] = default_value

    @segments.push seg

  clearSegmentIdentifiers: ->
    @segments = []

  slice: (uri) ->
    out = []

    uri = uri.split('/').filter (val) -> if val then true else false

    i = 0
    for uri_seg in @segments
      uri_seg = uri.shift();
      seg_spec = @segments[i];

      val = if uri_seg
        uri_seg
      else 
        if seg_spec['default'] then seg_spec['default'] else null

      out[seg_spec.name] = val;
      i++

      out.uri = [];

    if uri.length then out.uri = uri

    return out

module.exports = Slicer
