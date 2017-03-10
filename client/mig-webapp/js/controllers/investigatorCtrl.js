app.controller('investigatorCtrl', ['$scope', '$q', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', 'dashboardService', function ($scope, $q, $mdDialog, $mdSidenav, $state, $http, $timeout, dashboardService) {
    // $scope.investId = 0;
    // var noOfInvestigators = 0;
    $scope.showKeyVar = 1;
    $scope.toggleSideNav = function () {
        //        debugger;
        $mdSidenav('left').toggle();
    }
    $scope.investigator = [];
    $scope.allInvestigators = [];
    /*Note:calling for list of all investigators and not limiting it to 10. make a 'load more' button if you limit to 10*/
    $http.get('../api/v1/search?type=investigator&investigatorname=%25%25').success(function (response) {
        console.log(response);
        $scope.allInvestigators = response.collection.items;
        $scope.allInvestigators.pop(); //-1 because the last object is the 'search parameters'
        console.log($scope.allInvestigators);
        var promiseArr = [];
        for (var i in $scope.allInvestigators) {
            console.log($scope.allInvestigators[i].data[0].value.id);
            promiseArr.push($http.get('../api/v1/investigator?investigatorid=' + $scope.allInvestigators[i].data[0].value.id));
        }
        $q.all(promiseArr).then(function (response) {
            console.log(response);
            for (var i in $scope.allInvestigators) {
                if (response[i].status == 200) {
                    $scope.allInvestigators[i].data[0].value.publickey = response[i].data.collection.items[0].data[0].value.publickey;
                } else {
                    console.log(response[i].data);
                }
            }
        });
        console.log($scope.allInvestigators);
    }).error(function (err) {
        console.log(err);
    });
    $scope.createInvestigator = function (ev) {
        $mdDialog.show({
            //                controller: CreateOrder,
            controller: createInvestigatorCtrl,
            templateUrl: 'createInvestigator.tmpl.html', //                templateUrl: '.view/createOrder.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function (answer) {
            //                $scope.status = 'You said the information was "' + answer + '".';                 
        }, function () {
            //                $scope.status = 'You cancelled the dialog.';
        });
    }
    $scope.showInvestigator = function (index) {
        $scope.investigatorSelected = 1;
        $scope.investIndex = index;
        console.log(index);
    }
    $scope.updateInvestigator = function (investigatorIndex) {
        console.log(investigatorIndex);
        console.log($scope.allInvestigators[investigatorIndex]);
    }
    $scope.showKey = function (op) {
        if (op == 0) $scope.showKeyVar = 1;
        if (op == 1) $scope.showKeyVar = 0;
    }
            }])
var createInvestigatorCtrl = function ($scope, $mdDialog, $http, $mdToast) {
    $scope.Create = function () {
        //        call api here. /tmp/pubkey.key is sent in req.
        //        var selectedFile1 = document.getElementById('publickKeyFile').files[0];
        var selectedFile1 = document.getElementById('publickKeyFile').files[0];
        //var w = window.open(selectedFile1);
        //console.log(w.print());
        //        var selectedFile2 = angular.element('publickKeyFile');
        /* $scope.pubKeyFile = function (file) {
             var selectedFile = file;
         }*/
        var reader = new FileReader();
        reader.onload = function () {
            //var output = document.getElementById('publickKeyFile');
            selectedFile1.src = reader.result;
            console.log(selectedFile1.src);
        };
        //        reader.readAsDataURL(event.target.files[0]);
        console.log(reader);
        if ($scope.publicKey) {

            $http({
                method: 'POST',
                url: '../api/v1/investigator/create/',
                headers: {
                    'Content-Type': "multipart/form-data",
                    //                'Content-Type': undefined
                },
                data: {
                    name: $scope.investigatorName,
                    publickey: $scope.publicKey,
                    permissions: '{"search":true,"dashboard":true}'
                }
            }).success(function (response) {
                console.log(response);
            }).error(function (err) {
                console.log(err);
            });
        } else {

            var fd = new FormData();
            fd.append('name', $scope.investigatorName);
            //            fd.append('publickey', "/tmp/pubkey");
            fd.append('publickey', selectedFile1);
            fd.append('permissions', '{"search":true,"dashboard":true}');
            $http.post('../api/v1/investigator/create/', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                            //  'Content-Type': "multipart/form-data"
                    }
                })
                .success(function (response) {
                    console.log(response);
                })
                .error(function (err) {
                    console.log(err);
                });

            /*$http({
                method: 'POST',
                url: '../api/v1/investigator/create/',
                headers: {
                    'Content-Type': "multipart/form-data",
                    //                    'Content-Type': undefined
                    //                    'Content-Type': "application/json"
                },
                data: {
                    name: $scope.investigatorName,
                    //publickey: selectedFile1,
                    publickey: "/tmp/pubkey",
                    permissions: '{"search":true,"dashboard":true}'
                }
            }).success(function (response) {
                console.log(response);
            }).error(function (err) {
                console.log(err);
            });*/
        }

        $mdToast.show($mdToast.simple().textContent('Investigator Created!').position('right').hideDelay(3000));
        $mdDialog.hide();
    }
    $scope.cancel = function () {
        $mdDialog.hide();
    }
}