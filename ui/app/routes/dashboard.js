routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('dashboard', {
			url: '/',
			templateUrl: 'templates/dashboard.html'
		});
}
