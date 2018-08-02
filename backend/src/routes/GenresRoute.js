function genresRoute(app) {
	app.get("/genres", (req, res) => {

		res.json({
			"1": "Rock",
			"2": "Pop",
			"3": "Electronic",
			"4": "Hip-Hop",
			"5": "Clasic",
			"6": "Dance",
			"7": "Jazz"
		});
	});
}

module.exports = genresRoute;
