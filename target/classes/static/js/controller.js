var app = angular.module('app', []);
app.controller('postcontroller', function($scope, $http, $location) {
      $scope.submitForm = function(){
            var url = $location.absUrl() + "postcustomer";
            
            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
        }
            var data = {
            empname: $scope.empname,
            empno  : $scope.empno,
            designation : $scope.designation,
            department : $scope.department
        };
            
            
            $http.post(url, data, config).then(function (response) {
                  $scope.postResultMessage = "Successful!";
            }, function (response) {
                  $scope.postResultMessage = "Fail!";
            });
            
            $scope.empname = "";
            $scope.empno = "";
            $scope.designation = "";
            $scope.department = "";
      }
});

app.controller('getcontroller', ['$scope', '$http', '$filter', '$location', function($scope, $http, $filter, $location) {
      $scope.showTable = false;
   // Start Pagination
		$scope.currentPage = 0;
		$scope.pageSize = 10;
		$scope.data = [];
		$scope.q = '';
      $scope.getfunction = function(){
            var url = $location.absUrl() + "getallcustomer";
            
            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
        }
                  $http.get(url, config).then(function (response) {
                  //$scope.response = response.data;
                        $scope.filteredList = response.data;
                        $scope.response = response.data;
                        
                                          
                  

					
					$scope.getData = function () {
					  // needed for the pagination calc
					  // https://docs.angularjs.org/api/ng/filter/filter
					  return $filter('filter')($scope.response, $scope.q)
					
					}
					
					$scope.numberOfPages=function(){
					    return Math.ceil($scope.getData().length/$scope.pageSize);                
					}
					
				
					 $scope.showTable = true;	
                  // End Pagination
					
					
					
                  $scope.resetAll = function()
                  {
                      $scope.filteredList = response.data; 
                      $scope.empname = "";
                        $scope.empno = "";
                        $scope.designation = "";
                        $scope.department = ""; 
                  }
                  
                       
                  $scope.search = function()
                      { 
                         $scope.filteredList  = _.filter($scope.response,
                                   function(cust){  
                                       return searchUtil(cust,$scope.searchText); 
                                   });
                          
                          if($scope.searchText == '')
                          {
                              $scope.filteredList = $scope.response;
                          }
                      }  
                   $scope.resetAll(); 
                  
            }, function (response) {
                  $scope.getResultMessage = "Fail!";
                  $scope.showTable = false;
            });
      }
      
      
      
}]);

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
}});

app.controller('styleController', function($scope){
      
      var styleObj = {
                  
                  'color' : 'white',
                  'background-color' : 'green',
                  'font-size' : '20px',
                  'align' : 'center'
                  
      }
      $scope.styleObj = styleObj;
});

// Pagination
/* Search Text in all 3 fields */
function searchUtil(cust,toSearch)
{
    /* Search Text in all 3 fields */
    return (cust.empname.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || cust.designation.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || cust.department.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || cust.empno.toLowerCase().indexOf(toSearch.toLowerCase()) > -1)? true : false ;
  
  }




