'use strict';

angular.module('newsCentralApp')
  .controller('ArticlesCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
	
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
	
	
	$scope.deleteArticle = function(article) {
      $http.delete('/api/articles/' + article._id);
    };
	
	$scope.$on('$destroy', function () {
	  socket.unsyncUpdates('article');
    });
  });
