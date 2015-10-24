angular.module('app').controller('NoteEditController', NoteEditCtrl);

NoteEditCtrl.$inject = ['id', '$modalInstance', 'apiUrl', '$http'];
function NoteEditCtrl (id, $modalInstance, apiUrl, $http) {
	
	var vm = this;
	var route = apiUrl + '/note';
	
	vm.submit = submit;
	vm.close = $modalInstance.dismiss;
	
	init();

	function submit () {

		$http.put(route + '/' + id, vm.entity)
			.then(
				function success (response) {
					
					$modalInstance.close(response.data);

				}, 
				function error (e) {
					
					console.error(e);

				})

	}

	function init () {
		
		$http.get(route + '/' + id).then(
			function success (response) {
				
				vm.entity = response.data;				

			}, 
			function error (e) {
				
				console.error(e);

			})

	}

}