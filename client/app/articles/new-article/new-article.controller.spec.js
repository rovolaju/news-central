'use strict';

describe('Controller: NewArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('newsCentralApp'));

  var NewArticleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewArticleCtrl = $controller('NewArticleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
