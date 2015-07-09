/*global angular*/

(function() {

  angular.module('ssgApp', []);

  angular.module('ssgApp').controller('SSGController', ['$scope', '$window',
    function($scope, $window) {
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

      $scope.openSuggestion = function(item) {
        $window.location.replace(item.link);
      };

      $scope.sections = SSG.menuData || [];
    }
  ]);


  angular.module('ssgApp').directive('autoComplete', ['$timeout', '$filter',
    function($timeout, $filter) {
      return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {

          //Reorder the data, sort by label;
          var data = $filter('orderBy')(scope[iAttrs.uiItems], 'label');

          iElement.autocomplete({
            source: data,
            focus: function(event, ui) {
              iElement.val(ui.item.label);
              return false;
            },
            select: function(event, ui) {
              iElement.val(ui.item.label);
              scope.openSuggestion(ui.item);
              return false;
            }
          });

          iElement.autocomplete("instance")._renderMenu = function(ul, items) {
            var self = this;
            $(ul).addClass('ssg-autocomplete');
            $.each(items, function(index, item) {
              self._renderItemData(ul, item);
            });
          };

          iElement.autocomplete("instance")._renderItem = function(ul, item) {
            return $('<li></li>')
              .append('<div class="ui-menu-item-def">' +
                item.label +
                '<div class="ui-menu-item__breadcrumb">' +
                item.breadcrumb +
                '</div>' +
                '<div class="ui-menu-item__section"> Section: ' +
                item.section +
                '</div>' +
                '</div>')
              .appendTo(ul);
          };
        }
      };
    }
  ]);
})(window, $);