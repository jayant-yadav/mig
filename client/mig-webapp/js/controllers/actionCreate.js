app.controller('actionCreateCtrl', ['$scope', '$q', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', function ($scope, $q, $mdDialog, $mdSidenav, $state, $http, $timeout) {

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

}]);