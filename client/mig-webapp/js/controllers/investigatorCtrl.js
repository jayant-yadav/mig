app.controller('investigatorCtrl', ['$scope', '$q', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', '$mdToast', 'dashboardService', function ($scope, $q, $mdDialog, $mdSidenav, $state, $http, $timeout, $mdToast, dashboardService) {
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
            locals: {
                allInvestigators: $scope.allInvestigators
            },
            controller: createInvestigatorCtrl,
            templateUrl: 'createInvestigator.tmpl.html',
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
        console.log($scope.allInvestigators[investigatorIndex].data[0].value.id);
        console.log($scope.allInvestigators[investigatorIndex].data[0].value.permissions);

        $http({
            method: 'POST',
            url: '../api/v1/investigator/update/',
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
                id: $scope.allInvestigators[investigatorIndex].data[0].value.id,
                status: $scope.allInvestigators[investigatorIndex].data[0].value.status,
                permissions: JSON.stringify($scope.allInvestigators[investigatorIndex].data[0].value.permissions)
            }
        }).success(function (response) {
            console.log(response);
            $mdToast.show($mdToast.simple().textContent('Investigator Updated!').position('right').hideDelay(3000));
            $mdDialog.hide();
        }).error(function (err) {
            window.alert(err.collection.error.message);
            console.log(err);
        });
        /*$http.post('../api/v1/investigator/update/', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .success(function (response) {
                console.log(response);
                $mdToast.show($mdToast.simple().textContent('Investigator Updated!').position('right').hideDelay(3000));
                $mdDialog.hide();

            })
            .error(function (err) {
                window.alert(err.collection.error.message);
                console.log(err);
            });*/

    }
    $scope.showKey = function (op) {
        if (op == 0) $scope.showKeyVar = 1;
        if (op == 1) $scope.showKeyVar = 0;
    }
}])
var createInvestigatorCtrl = function ($scope, $mdDialog, $http, $mdToast, allInvestigators) {

    console.log($scope.investigatorName);
    if ($scope.investigatorName) {
        console.log("khgj");
    }
    $scope.Create = function () {
        var selectedFile1 = document.getElementById('publickKeyFile').files[0];

        var InvestigatorPerms = {
            "search": true,
            "action": true,
            "action_create": true,
            "command": true,
            "agent": true,
            "dashboard": true,
            "loader": false,
            "loader_status": false,
            "loader_expect": false,
            "loader_key": false,
            "loader_new": false,
            "manifest": false,
            "manifest_sign": false,
            "manifest_status": false,
            "manifest_new": false,
            "manifest_loaders": false,
            "investigator": false,
            "investigator_create": false,
            "investigator_update": false
        };

        if ($scope.adminPerm == true) {
            InvestigatorPerms.investigator = true;
            InvestigatorPerms.investigator_create = true;
            InvestigatorPerms.investigator_update = true;
        }
        if ($scope.loadersPerm == true) {
            InvestigatorPerms.loader = true;
            InvestigatorPerms.loader_status = true;
            InvestigatorPerms.loader_expect = true;
            InvestigatorPerms.loader_key = true;
            InvestigatorPerms.loader_new = true;
        }
        if ($scope.manifestsPerm == true) {
            InvestigatorPerms.manifest = true;
            InvestigatorPerms.manifest_sign = true;
            InvestigatorPerms.manifest_status = true;
            InvestigatorPerms.manifest_new = true;
            InvestigatorPerms.manifest_loaders = true;
        }
        var fd = new FormData();
        fd.append('name', $scope.investigatorName);
        fd.append('permissions', JSON.stringify(InvestigatorPerms));

        if ($scope.publicKey) {
            fd.append('publickey', $scope.publicKey);
        } else {
            fd.append('publickey', selectedFile1);
        }
        $http.post('../api/v1/investigator/create/', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function (response) {
                console.log(response);
                $mdToast.show($mdToast.simple().textContent('Investigator Created!').position('right').hideDelay(3000));
                $mdDialog.hide();

            })
            .error(function (err) {
                window.alert("Investigator's PGP Fingerprint already exists in database");
                console.log(err);
            });

    }
    $scope.cancel = function () {
        $mdDialog.hide();
    }
}