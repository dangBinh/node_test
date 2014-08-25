var app = app || {};

var app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'img/images.jpg',
		title: 'No Title',
		author: 'Unknow',
		releaseDate: 'Unknow',
		keywords: 'None'
	}
})