/*global angular*/

(function() {

  angular.module('ssgApp', []);

  angular.module('ssgApp').controller('SSGController', ['$scope',
    function($scope) {
      $scope.sidebarActive = false;

      $scope.toggleMenu = function() {
        $scope.sidebarActive = !$scope.sidebarActive;
      };

      $scope.toggleMarkup = function($event) {
        var markupWrapper = angular.element($event.currentTarget).parent();
        if (markupWrapper.hasClass('active')) {
          markupWrapper.removeClass('active');
          return;
        }
        markupWrapper.addClass('active');
      };

      $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
    }
  ]);


  angular.module('ssgApp').directive('autoComplete', ['$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
          iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function() {
            }
          });
        }
      };
    }
  ]);

})(window, $, $.ui);