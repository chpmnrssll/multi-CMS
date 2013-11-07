define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/pages": "pages",
			"admin/pages/create": "createPage",
			"admin/pages/update/:id": "updatePage",
			"admin/pages/delete/:id": "deletePage"
		},
		initialize: function () {
			window.App.pages = {};
			
			require([ "admin/pages/collection" ], function (Collection) {
				new Collection().fetch({
					success: function (collection, response, options) {
						window.App.pages.collection = collection;
					}
				});
			});
		},
		pages: function () {
			require([ "admin/pages/collectionView" ], function (View) {
				window.App.adminNav.model.set({ active: "pages" });
				window.App.header.show(window.App.adminNav.view);
				window.App.content.show(new View({ collection: window.App.pages.collection }));
			});
		},
		createPage: function () {
			require([ "admin/pages/model", "admin/pages/updateView" ], function (Model, View) {
				window.App.adminNav.model.set({ active: "pages" });
				window.App.header.show(window.App.adminNav.view);
				window.App.content.show(new View());
				/*
				var page = new Model();
				page.save({ category: prompt("Category:", ""), title: prompt("Title:", ""), date: prompt("Date:", "") }, {
					success: function (model, response, options) {
						window.App.router.navigate("admin/pages", { trigger: true });
					}
				});
				*/
			});
		},
		updatePage: function (id) {
			require([ "admin/pages/updateView" ], function (View) {
				window.App.adminNav.model.set({ active: "pages" });
				window.App.header.show(window.App.adminNav.view);
				var page = window.App.pages.collection.findWhere({ id: id });
				window.App.content.show(new View({ model: page }));
				console.log(page);
			});
			/*
			page.save({ category: prompt("Category:", page.get("category")), title: prompt("Title:", page.get("title")), date: prompt("Date:", page.get("date")) }, {
				success: function (model, response, options) {
					window.App.router.navigate("admin/pages", { trigger: true });
				}
			});
			*/
		},
		deletePage: function (id) {
			var model = window.App.pages.collection.findWhere({ id: id });
			if(confirm("Delete Page?")) {
				model.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/pages", { trigger: true });
					}
				});
			}
		}
	});
});