/*
 * Copyright 2015 Vilppu Vuorinen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var app = (function ($) {

  function _transform () {
    var data = doTransform(
        collectRows(),
        parseFR())
    data = doMerge(
        data,
        parseMergeCount(),
        parseMerger())
    console.log(data)
    $('#output').html(
        collect(data))
  }

  function collectRows () {
    return $('#input-data').val()
      .split('\n')
      .map(function (row) {
        return row.split(';')
      })
  }

  function parseFR () {
    var val = $('#f-r-values').val()
    if (val.length < 1) {
      return []
    }
    return $('#f-r-values').val()
      .split('\n')
      .map(function (row) {
        var values = row.split(';')
        return {
          field: values[0],
          match: values[1],
          replace: values[2]
        }
      })
  }

  function doTransform (data, fr) {
    return data.map(function (d) {
      var newData = d.slice()
      fr.forEach(function (f) {
        if (testMatch(f.match, newData[f.field])) {
          newData[f.field] = f.replace
        }
      })
      return newData
    })
  }

  function testMatch (matcher, field) {
    var regexMatches = matcher.indexOf('%r:') === 0 &&
      new RegExp(matcher.substring(3)).test(field)
    return regexMatches || matcher === field
  }

  function parseMergeCount () {
    var c = filterInt($('#merge-count').val())
    return isNaN(c) ? 0 : c
  }

  function parseMerger () {
    var raw = $('#merge-value').val()
    if (raw.length === 0) {
      return null
    }
    var mergeRule =  raw.trim().split(';')
      .map(function (m) {
        var _m = m.trim().split('.')
        return {
          row: _m[0],
          field: _m[1]
        }
      })

    return function (data) {
      return mergeRule.map(function (fieldRule) {
        return data[fieldRule.row][fieldRule.field]
      })
    }
  }

  function doMerge (data, count, merger) {
    if (count === 0) { return data }
    return parseMergeable(data, count)
      .map(function (m) {
        return merger(m)
      })
  }

  function parseMergeable (data, count) {
    var mergeable = []
    var resultRow = []
    data.forEach(function (d, i) {
      if (resultRow.length > 0 && i % count === 0) {
        mergeable.push(resultRow)
        resultRow = []
      }
      resultRow.push(d)
    })
    if (resultRow.length > 0) {
      mergeable.push(resultRow)
    }
    return mergeable
  }

  function collect (data) {
    return '<tr>' + data.map(function (d) {
      return '<td>' + d.join('</td><td>') + '</td>'
    }).join('</tr><tr>') + '</tr>'
  }

  filterInt = function (value) {
    if(/^(\-|\+)?([0-9]+)$/.test(value)) {
      return Number(value);
    }
    return NaN;
  }

  return {
    transform: _transform
  }
})(jQuery)
