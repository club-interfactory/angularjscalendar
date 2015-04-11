var ajc_week_captions = ['日','月','火','水','木','金','土'];

angular.module('app', [])
  .directive('calendarDaily', function() {
    return {
      restrict: 'E',
      require: '^ngModel',
      replace: true,
      scope: {
        day: '=',
        startDayofweek: '@'
      },
      controller: [ '$scope', function($scope) {
        var d = new Date();
        $scope.year = d.getFullYear();
        $scope.month = d.getMonth();
        if ($scope.startDayofweek == undefined) {
          $scope.startDayofweek = 0;
        } else {
          $scope.startDayofweek = parseInt($scope.startDayofweek);
        }

        $scope.dayofweeks = [];
        for (var i = 0; i < 7; i++) {
          var value = (i + $scope.startDayofweek) % 7;
          $scope.dayofweeks[i] = {
            caption: ajc_week_captions[value],
            value: value
          };
        }

        $scope.refreshCalendar = function() {
          if ($scope.startDayofweek == undefined) {
            $scope.startDayofweek = 0;
          } else {
            $scope.startDayofweek = parseInt($scope.startDayofweek);
          }
          $scope.calendar = {};
          var date = new Date($scope.year, $scope.month, 1);
          date.setDate(date.getDate() - (date.getDay() + $scope.startDayofweek) % 7);
          $scope.calendar.weeks = [];
          while (100*date.getFullYear() + date.getMonth() <= 100 * $scope.year + $scope.month) {
            var days = [];
            for (var i = 0; i < 7; i++) {
              days.push({
                otherMonth: date.getMonth() != $scope.month,
                dayofweek: (i + $scope.startDayofweek) % 7,
                caption   : date.getDate(),
                value     : date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + (date.getDate())).slice(-2)
              });
              date.setDate(date.getDate() + 1);
            }
            $scope.calendar.weeks.push({
              days: days
            });
          }
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
