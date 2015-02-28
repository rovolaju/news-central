'use strict';

angular.module('newsCentralApp')
  .controller('NewArticleCtrl', function ($scope, $http, $state) {
    $scope.message = 'Hello';
	
	$scope.addArticle = function() {
	  console.log($scope.newArticle);
      $http.post('/api/articles', $scope.newArticle);
      $scope.newArticle = '';
	  $state.transitionTo('articles');
    };
	
  });
