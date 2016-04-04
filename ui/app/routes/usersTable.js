routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('usersTable', {
			url: '/users-table',
			templateUrl: 'templates/usersTable.html'
		});
}
