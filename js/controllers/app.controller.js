(function  (angular) {
		
	angular.module('app').controller('AppCtrl', AppCtrl);

	AppCtrl.$inject = ['$http', '$uibModal', 'apiUrl'];
	function AppCtrl ($http, $uibModal, apiUrl) {
		
		var vm = this;

		vm.createNote = createNote;
		vm.removeNote = removeNote;
		vm.editNote = editNote;

		init();


		function removeNote (id, index) {

			var route = apiUrl + '/note';

			// DELETE /note/{id}
			var promise = $http.delete(route + '/' + id);

			promise.then(
				function success (response) {
					vm.notes.splice(index, 1);
				},
				function error (response) {
					console.error(e);

				}
			);


		}

		function editNote (note, index) {

			// no editNote nós poderíamos passar a nota inteira como parâmetro, porém, não usaríamos nossa rota GET /note/{id} da API
			// sinta-se livre pra refatorar e não fazer uma requisição desnecessária! : ]

	    var modalInstance = $uibModal.open({
	      templateUrl: 'tpls/edit-note.html',
	      controller: 'NoteEditController as edit',
	      size: 'md',
	      resolve: {
	        id: function () {
	          return note.id;
	        }
	      }
	    });

	    modalInstance.result.then(
	    	function success (note) {
	    		
	    		console.warn(vm.notes);
	    		console.warn(index);
					vm.notes[index] = note;

	    	}, 
	    	function dissmissed () {
	    		
	    		// callback do cancel do modal

	    	});

		}

		function createNote () {

			var route = apiUrl + '/note';

			// POST /note | Como  parâmetro o objeto vm.entity 
			var promise = $http.post(route, vm.entity);

			promise.then(
				function success (response) {

					vm.notes.push(response.data);
					
				}, 
				function error (e) {
					
					console.error(e);

				})

		}

		// inicializações 

		function init () {

			var route = '/resources/notes.json';

			// GET /note | retorna todas as notas
			var promise = $http.get(route);

			promise.then(
				function success (response) {
					
					vm.notes = response.data;

				}, 
				function error (e) {
					
					console.error(e, 'deu erro');

				});
			
			vm.entity = {
				
				title : '',
				text : ''

			};

		}

	}

})(angular);