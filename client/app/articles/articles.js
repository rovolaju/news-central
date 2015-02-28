'use strict';

angular.module('newsCentralApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articles', {
        url: '/articles',
        templateUrl: 'app/articles/Articles.html',
        controller: 'ArticlesCtrl'
      });
	  $stateProvider
	  .state('new-article', {
        url: '/articles/new',
        templateUrl: 'app/articles/new-article/new-article.html',
        controller: 'NewArticleCtrl'
      });
  });