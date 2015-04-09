angular.module('app', [])
  .directive('calendarDaily', function() {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        day: '='
      },
      controller: [ '$scope', function($scope) {
        $scope.year = 2015;
        $scope.month = 4;
        $scope.refreshCalendar = function() {
          $scope.calendar = [];
          var date = new Date($scope.year, $scope.month, 1);
          date.setDate(date.getDate() - date.getDay());
          $scope.calendar.weeks = [];
          while (date.getMonth() <= $scope.month && date.getFullYear() <= $scope.year) {
            var days = [];
            for (var i = 0; i < 7; i++) {
              days.push({
                otherMonth: date.getMonth() != $scope.month,
                caption   : date.getDate(),
                value     : date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + (date.getDate())).slice(-2)
              });
              date.setDate(date.getDate() + 1);
            }
            $scope.calendar.weeks.push({
              days: days
            });
          }
          console.log($scope.calendar);
        };
        $scope.nextMonth = function() {
          if ($scope.month == 11) {
            $scope.year++;
            $scope.month = 0;
          } else {
            $scope.month++;
          }
          $scope.refreshCalendar();
        }
        $scope.prevMonth = function() {
          if ($scope.month == 0) {
            $scope.year--;
            $scope.month = 11;
          } else {
            $scope.month--;
          }
          $scope.refreshCalendar();
        }
        $scope.clickDay = function(day) {
          $scope.day = day.value
        };
        $scope.refreshCalendar();
      }],
      templateUrl: 'asset/template/calendar.html'
    };
  })
  .controller('MyController', function($scope) {
    $scope.day = "";
  });
