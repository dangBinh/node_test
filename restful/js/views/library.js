var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#book',
	initialize: function(initialBooks) {
		this.collection = new app.Library(initialBooks);
		this.render();
	}
})