app.controller('actionCreateCtrl', ['$scope', '$q', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', 'dashboardService', function ($scope, $q, $mdDialog, $mdSidenav, $state, $http, $timeout, dashboardService) {

    $scope.fileOptions = 0;

    $scope.addOperation = function () {
        /*use this to call state and load the div stored in a seperate html file*/
    }

    if ($scope.addModule == "File") {
        $scope.fileOptions = 1;
    }



    $scope.operation = {
        module: null,
        parameters: {
            description: null,
            paths: null,
            contents: null,
            names: null,
            sizes: null,
            modes: null,
            mtimes: null,
            md5: null,
            sha1: null,
            sha2: null,
            sha3: null,
            options: {
                maxdepth: null,
                maxerrors: null,
                remotefs: null,
                matchall: null,
                macroal: null,
                mismatch: null,
                matchlimit: null,
                debug: null,
                returnsha256: null,
                decompress: null
            },
            checks: {
                code: null,
                matched: null,
                matchedfiles: null,
                value: null,
                regex: null,
                minsize: null,
                maxsize: null,
                minmtime: null,
                maxmtime: null,
                inversematch: null,
                mismatch: null
            },
            checkmask: null,
            isactive: null,
            iscurrent: null,
            currentdepth: null
        }
    };

    $scope.addFile=function(){
        $http.post('../api/v1/action/actionSerialize/', $scope.operation).success(function (response) {
        console.log(response);
        /* $mdToast.show($mdToast.simple().textContent('Investigator Updated!').position('right').hideDelay(3000));
         $mdDialog.hide();*/
    }).error(function (err) {
        //        window.alert(err.collection.error.message);
        console.log(err);
    });
    }
    
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

    



}]);
