app.controller('homeCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', function ($scope, $mdDialog, $mdSidenav, $state, $http, $timeout) {

    $scope.showDashboard = 0;
    $scope.file = 0;

    $http.get('../api/v1/dashboard').success(function (response) {
        $scope.dashboard = response.collection.items;
        console.log(response.collection);
        console.log($scope.dashboard);
    });

    $scope.getActionInfo = function (id) {
        console.log(id);
        $state.go('getAction', {
                actionId: id
            })
            //        actionService.actionId(id);
    }

    $scope.showInvestigators = function () {
        $state.go('investigator');
    }



    /*-------------------------------side nav module menu--------------------------------------------------------*/


    $scope.toggleSideNav = function () {
        $mdSidenav('left').toggle();
    }

    $scope.open = function () {
            $scope.file = 1;
            $mdSidenav('left').toggle();
        }
        /*-----------------------------------------------------------------------------------------------------------*/



    $scope.actionCreate = function (ev) {
        $state.go('actionCreate');
    }


    /*--------------------------------------------create loader entry-------------------------------------------------------*/



    $scope.loader = function (ev) {
        $mdDialog.show({
                //                controller: CreateOrder,
                controller: createLoaderCtrl,
                templateUrl: 'loader.tmpl.html',
                //                templateUrl: '.view/createOrder.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function (answer) {
                //                $scope.status = 'You said the information was "' + answer + '".';                 
            }, function () {
                //                $scope.status = 'You cancelled the dialog.';
            });
    }



    /*----------------------------------------------------------------------------*/





}])


/*-----------------------------------------------------------------*/




var createLoaderCtrl = function ($scope, $mdDialog, $http) {

    const LoaderPrefixLength = 8 // Prefix length
    const LoaderKeyLength = 32 // Length excluding prefix
        //var $scope.prefix;
        //var $scope.key;

    var randomString = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    $scope.prefix = Math.random().toString(36).substring(2, LoaderPrefixLength + 2);
    $scope.key = randomString(LoaderKeyLength);
    $scope.generateLoader = function () {
        console.log($scope.loaderName);
        console.log($scope.prefix);
        console.log($scope.key);
        var prefixKey = $scope.prefix.concat($scope.key);
        console.log(prefixKey);
        var newle = {
            name: $scope.loaderName,
            prefix: $scope.prefix,
            key: $scope.key,
            expectenv: ""
        };
        /*data["name"] = $scope.loaderName;
data["prefix"] = $scope.prefix;
data["key"] = $scope.key;
data["expectenv"] = "";*/

        console.log(newle);
        /*TODO: structure the loader fields and then use post API here*/
        var newLoaderEntry = JSON.stringify(newle);
        console.log(newLoaderEntry);

        /*console.log(data);
        $http({
            method: 'POST',
            url: '../api/v1/loader/new/',
            data: JSON.stringify(newLoaderEntry)
        }).success(function (response) {

            console.log(response);
        });*/

        /*FIXME: body of POST:
    {"name":"jaant","prefix":"cddr2wo8","key":"3LSWugv3xiNm9RPdUArr2tgz5GLU19aE","expectenv":""}
    */

        $http({
            method: 'POST',
            url: '../api/v1/loader/new/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                loader: newLoaderEntry
            }
        }).success(function (response) {
            console.log(response);
            window.prompt("new loader key is: ", prefixKey);
        }).error(function (err) {
            console.log(err);
        });

        $mdDialog.hide("blah");
    }



    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}

var actionTemplCtrl = function ($scope, $mdDialog) {


    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };

}

var investigatorCtrl = function ($scope, $mdDialog, $http) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };

}