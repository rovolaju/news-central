'use strict';

angular.module('newsCentralApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
	$scope.newArticle = {};

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
	
	$http.get('/api/articles').success(function(articles) {
		console.log("Loadint articles");
		console.log(articles)
      $scope.articles = articles;
 
      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('article', $scope.articles, function(event, article, articles) {
        // This callback is fired after the articles array is updated by the socket listeners
 
        // sort the array every time its modified
        articles.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };
	
	$scope.addArticle = function() {
	  console.log($scope.newArticle);
      $http.post('/api/articles', $scope.newArticle);
      $scope.newArticle = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
	
	$scope.deleteArticle = function(article) {
      $http.delete('/api/articles/' + article._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
	  socket.unsyncUpdates('article');
    });
  });
