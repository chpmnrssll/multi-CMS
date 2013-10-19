define([ "jquery", "underscore", "backbone", "marionette", "admin/router" ], function($, _, Backbone, Marionette, AdminRouter) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "home",
			"*actions": "error"
		},
		initialize: function () {
			this._subRouters = {
				admin: new AdminRouter()
			}
			Backbone.history.start();
		},
		home: function () {
			require([ "home/view" ], function (View) {
				window.App.header.close();
				window.App.content.show(new View());
			});
		},
		error: function () {
			console.log("Route: " + Backbone.history.fragment + " not found");
		}
	});
	
	return AppRouter;
});