routing.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routing($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}
