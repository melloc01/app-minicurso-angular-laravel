(function  (angular) {
	
	// recupera o módulo 'app' e injeta a diretiva 'note' nele
	angular.module('app').directive('note', note);

	// dependências de note
	note.$inject = [];
	function note () {
			
			var directive = {

				// vai se restringir apenas à elementos (tags <note>) para ser identificada
				restrict: 'E',

				// função link é executada antes da compilação do template de cada <note>
				link : link,

				// não é criado um novo escopo para essa diretiva
				// ela usa o escopo em que a tag <note> foi inserida, no caso, dentro de um ng-repeat com uma objeto note
				scope: false,

				// template que vai ser compilado
				// é possível também dar um templateUrl e colocar isso num arquivo caso o template seja grande
				template : '<div uib-tooltip="criado em {{ note.created_at }}" class="note panel panel-{{type}}"><div class="note-header panel-heading">{{::note.title}} <i ng-click="App.removeNote(note.id, index)">&times;</i> <i ng-click="App.editNote(note, index)">&#9998</i></div><div class="note-body panel-body">{{::note.text}}</div></div>'

			};

			return directive;

			// função link
			function link (scope, element, attrs) {

				var note = scope.note;

				if (! note) {
					console.error('a "note" property should be on this scope');
					return;
				}

				var types = ['danger', 'warning', 'info', 'primary', 'success'];
				scope.type = types[Math.floor(Math.random() * 5)];

				// backup do index - ele é alterado quando se usa o filter filter (ha!)
				scope.index = angular.copy(scope.$index);

				console.warn(scope.index);


			}

	}

})(angular);
