angular.module('terminal', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/begin', {
                templateUrl: '/begin.html',
                controller: 'BeginCtrl'
            })
            .when('/scan', {
                templateUrl: '/scan.html',
                controller: 'ScanCtrl'
            })
            .when('/method', {
                templateUrl: '/method.html',
                controller: 'MethodCtrl'
            })
            .when('/customer', {
                templateUrl: '/customer.html',
                controller: 'CustomerCtrl'
            })
            .when('/pin', {
                templateUrl: '/pin.html',
                controller: 'PinCtrl'
            })
            .when('/processing', {
                templateUrl: '/processing.html',
                controller: 'ProcessingCtrl'
            })
            .when('/success', {
                templateUrl: '/success.html',
                controller: 'SuccessCtrl'
            })
            .otherwise({
                redirectTo: '/begin'
            });
    })
    .value('basket', {
        total: function () {
            var total = 0;
            angular.forEach(this.items, function (item) {
                total += item.price;
            });
            return total;
        },
        items: []
    })
    .controller('TerminalCtrl', function ($scope) {
        $scope.key = function (e) {
            $scope.$broadcast('keydown', e);
        };
    })
    .controller('BeginCtrl', function ($scope, $location, basket) {
        basket.items = [];
        $scope.begin = function () {
            $location.path('/scan');
        };
    })
    .controller('ScanCtrl', function ($scope, $location, basket) {
        $scope.basket = basket
        $scope.$on('keydown', function (e, keyevent) {
            var newItem;
            switch (keyevent.keyCode) {
                case 65: // a
                    newItem = { name: 'Apples', price: 4.99 };
                    break;
                case 66: //b
                    newItem = { name: 'Bananas', price: 3.99 };
                    break;
                case 67: //c
                    newItem = { name: 'Carrots', price: 1.99 };
                    break;
            }
            if (newItem) {
                basket.items.push(newItem);
            }
        });
        $scope.finish = function () {
            $location.path('/method');
        };
    })
    .controller('MethodCtrl', function ($scope, $location, basket) {
        $scope.driveby = function () {
            $location.path('/customer');
        };
    })
    .controller('CustomerCtrl', function ($scope, $location, basket) {
        $scope.customers = [
            { name: 'Mike' },
            { name: 'Simon' }
        ];
        $scope.select = function() {
            $location.path('/pin');
        };
    })
    .controller('PinCtrl', function ($scope, $location, basket) {
        $scope.basket = basket;
        $scope.pay = function() {
            $location.path('/processing');
        };
    })
    .controller('ProcessingCtrl', function ($scope, $location, $timeout) {
        $timeout(function() {
            $location.path('/success');
        }, 3000);
    })
    .controller('SuccessCtrl', function ($scope, $location, basket) {
        $scope.next = function() {
            $location.path('/begin');
        };
    })