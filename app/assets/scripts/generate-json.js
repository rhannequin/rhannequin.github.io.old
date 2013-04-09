define(['jquery', 'lodash'], function ($, _) {
  'use strict';

  var apiUrl = 'https://api.github.com';
  var repositories = [];

  $.ajax({
    url: apiUrl + '/users/rhannequin/repos',
    dataType: 'json',
    success: function (repos) {
      _.each(repos, function (repo) {
        $.ajax({
          url: apiUrl + '/repos/rhannequin/' + repo.name + '/commits',
          dataType: 'json',
          success: function (commits) {
            repo.commits = commits.length;
            repositories.push(repo);
            if(repositories.length === repos.length) {
              console.log('-------------------');
              console.log(JSON.stringify(repositories));
              console.log('-------------------');
            }
          }
        });
      });
    }
  });
});