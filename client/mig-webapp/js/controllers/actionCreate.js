app.controller('actionCreateCtrl', ['$scope', '$q', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', 'dashboardService', function ($scope, $q, $mdDialog, $mdSidenav, $state, $http, $timeout, dashboardService) {

    $scope.fileOptions = 0;

    $scope.addOperation = function () {
        /*use this to call state and load the div stored in a seperate html file*/
    }

    if ($scope.addModule == "File") {
        $scope.fileOptions = 1;
    }


    /*
        $scope.operation[] = {
            module: "",
            parameters: {
                description: "",
                paths: "",
                contents: "",
                names: "",
                sizes: "",
                modes: "",
                mtimes: "",
                md5: "",
                sha1: "",
                sha2: "",
                sha3: "",
                options: {
                    maxdepth: "",
                    maxerrors: "",
                    fill rest from https: //github.com/mozilla/mig/blob/master/modules/file/file.go#L95
                }
            } 
        };*/

    /*CAll the action validate api here*/

   /* $http({
        method: 'POST',
        url: '../api/v1/action/actionSerialize/',
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
            //{
                age: 24,
                id: "k34rAT4"

            //}
        }
    })*/
    $http.post('../api/v1/action/actionSerialize/',{id: 24,age: "k34rAT4"}).success(function (response) {
        console.log(response);
        /* $mdToast.show($mdToast.simple().textContent('Investigator Updated!').position('right').hideDelay(3000));
         $mdDialog.hide();*/
    }).error(function (err) {
        //        window.alert(err.collection.error.message);
        console.log(err);
    });



}]);
