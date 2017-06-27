app.controller('actionCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$state', '$http', '$timeout', function ($scope, $mdDialog, $mdSidenav, $state, $http, $timeout) {


    $scope.actionId = $state.params.actionId;
    console.log($scope.actionId);
    $scope.count = 0;


    $scope.returnToDashboard = function () {

        $state.go('home');
        //        actionService.actionId(id);
    }


    $scope.getActionInfo = function () {
            $http.get('../api/v1/action?actionid=' + $scope.actionId).success(function (response) {
                $scope.actionDetails = response.collection.items[0];
                if (response.collection.items[0].data[0].name != "action") {
                    console.log("Error: API returned something that is not an action... something's wrong.")
                }
                console.log("actiondetails: " + JSON.stringify(response.collection));
            });
        }
        //    $scope.actionJson = JSON.stringify(response.collection.data[0].value, null, 2);
    $scope.getActionInfo();
    $scope.getCommandInfo = function (id) {
        console.log(id);
        $state.go('getCommand', {
                commandId: id
            })
            //        actionService.actionId(id);
    }

    $scope.searchCommands = function (searchType) {
        // searchType:= 0->All 1->Found 2->Not Found
        var query = '';
        switch (searchType) {
        case 2:
            query = '&foundanything=true';
            break;
        case 3:
            query = '&foundanything=false'
            break;
        }
        // TODO: Consult and add pagination approach if required
        $http.get('../api/v1/search?type=command&actionid=' + $scope.actionId + query).success(function (response, err) {
            $scope.commandsList = response.collection.items;
            if (err != null && err != 200) {
                console.log("Error: " + err)
            }
            console.log("commandsList: " + response.collection);
        });

    }

  }]);