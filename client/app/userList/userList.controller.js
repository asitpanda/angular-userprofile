'use strict';

angular.module('UserProfileApp').controller('UserListCtrl', UserListCtrl);

UserListCtrl.$inject = ['$scope', 'userService', '$uibModal'];

function UserListCtrl($scope, userService, $uibModal) {
  $scope.nameFilter = null;
  $scope.addressFilter = '';
  $scope.userList = [];
  $scope.searchFilter = function (user) {
    var re = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || re.test(user.fName) || re.test(user.lName);
  };

  $scope.countryName = ['Abkhazia', 'Afghanistan', 'Aland', 'Albania', 'Algeria', 'American-Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua-and-Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Australian', 'Austria', 'Austrian', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Basque-Country', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia-and-Herzegovina', 'Botswana', 'Brazil', 'Brazilian', 'British', 'British-Antarctic-Territory', 'British-Virgin-Islands', 'Brunei', 'Bulgaria', 'Burkina-Faso', 'Burundi', 'Cambodia', 'Canada', 'Canary-Islands', 'Central-African-Republic', 'Chad', 'Chile', 'China', 'Christmas-Island', 'Cocos-Keeling-Islands', 'Colombia', 'Commonwealth', 'Comoros', 'Cook-Islands', 'Costa-Rica', 'Cote-dIvoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech-Republic', 'Democratic-Republic-of-the-Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican-Republic', 'Dutch', 'East-Timor', 'Ecuador', 'Egypt', 'El-Salvador', 'England', 'English', 'Equatorial-Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'European-Union', 'Falkland-Islands', 'Faroes', 'Fiji', 'Finland', 'Finnish', 'France', 'French', 'French-Polynesia', 'French-Southern-Territories', 'Gabon', 'Gambia', 'Georgia', 'German', 'Germany', 'Ghana', 'Gibraltar', 'GoSquared', 'Greece', 'Poland']

  $scope.adduserDetail = {};

  $scope.addUser = function () {
    $scope.adduserDetail.userId = $scope.userList.length + 1;
    var date = new Date($scope.adduserDetail.dob);
    $scope.adduserDetail.dob = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    $scope.userList.push($scope.adduserDetail);
  }

  $scope.searchAddress = function (user) {
    if (!_.include(user.address.toLowerCase(), $scope.addressFilter.toLowerCase())) return false;
    if (user.userId >= 5 && user.userId <= 15) return true;
  }

  userService.getUserList().success(function (response) {
    $scope.userList = response;
  });

  $scope.getUserDetails = function (selectedUser) {
    modalInstance = $uibModal.open({
      templateUrl: 'app/user/user.html',
      controller: 'userController',
      resolve: {
        userdetail: function () {
          return userService.getUserDetails(selectedUser.userId);
        }
      }
    });
  }
};