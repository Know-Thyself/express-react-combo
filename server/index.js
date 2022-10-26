const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const quotes = require("./quotes.json");

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/quotes", (req, res) => {
	res.json(quotes);
});

app.get("/quotes/random", (req, res) => {
	res.send(pickFromArray(quotes));
});

app.get("/quotes/search", (req, res) => {
	const searchTerm = req.query.term.toLowerCase();
	const searchResult = quotes.filter((quote) =>
		quote.quote.toLowerCase().includes(searchTerm) || 
    quote.author.toLowerCase().includes(searchTerm)
	);
	const letters = /^[A-Za-z\s]+$/;
	if (!searchTerm.match(letters) ) {
		res.status(400).json({
			message:
				"Please make sure your search term contains no characters rather than letters.",
		});
	} else if (searchResult.length < 1) {
		res.status(400).json({
			message:
				"Your search term isn't found in quotes or authors' names. Please try other keywords.",
		});
	} else res.send(searchResult);
});

function pickFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Sever listening on port ${PORT}`)
});
