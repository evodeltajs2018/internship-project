function genresRoute(app) {
	app.get("/genres", (req, res) => {

		let GenreService = require("../services/GenreService");
		let genreService = new GenreService();
		let genres = genreService.getAllGenres();
		res.json({
			genres
		});
	});
}

module.exports = genresRoute;
