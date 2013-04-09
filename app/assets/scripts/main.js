define(['jquery', 'lodash', 'backbone'], function ($, _, Backbone) {
  'use strict';

  require(['text!json.json'], function (json) {
    json = JSON.parse(json);
    var template = _.template($('#repo-list-template').text());
    var $main = $('#main');
    $main.html(template({ repos: json }));
  });

  // require(['generate-json']);

});