import React, { useState, useEffect } from "react";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);
  const [controller, setController] = useState(false);
  const [searchInput, setSearchInput] = useState([]);

  useEffect(() => {
    if (!controller) {
      fetch("/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch(err =>console.error(err));
      setController(true);
    }
  }, [controller, quotes]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const searchResult = quotes.filter(quote => {
      return quote.quote.toLowerCase().includes(searchInput) || quote.author.toLowerCase().includes(searchInput);
    });
    setQuotes(searchResult);
    if (e.target.value === "") setController(false);
  }

  function pickFromArray(arr) {
	  return arr[Math.floor(Math.random() * arr.length)];
  }

  const randomQuoteGenerator = (e) => {
    const random = pickFromArray(quotes);
    setRandomQuote([{quote: random.quote, author: random.author}])
  }

  return (
		<div className='App'>
			<header className='App-header'>
				<h1 key='header'>Inspirational and Motivational Quotes</h1>
				{randomQuote.map((random, index) => {
					return (
						<div key='random-quote' className='random-quote-wrapper'>
							<h3 key={index}>" {random.quote} "</h3>
							<h4 key={random.author}>{random.author}</h4>
						</div>
					);
				})}
				<div key='input-form' className='search-input-wrapper'>
					<i className='fas fa-search'></i>
					<input
						key='search-input '
						type='text'
						className='search-bar'
						placeholder='Search for quotes by keywords or author names'
						value={searchInput}
						onFocus={(e) => (e.target.placeholder = "")}
						onBlur={(e) =>
							(e.target.placeholder =
								"Search for quotes by keywords or author names")
						}
						onChange={handleSearchInput}
					/>
				</div>
				<div key='button-wrapper' className='button-container'>
					<div className='awesome-button'>
						<button
							key='random-button'
							onClick={randomQuoteGenerator}
							className='random-button'
						>
							Random Quote
						</button>
					</div>
				</div>
				{quotes.map((quote, index) => {
					return (
						<div key={index} className='quotes-wrapper'>
							<h3 key={index} className='quote'>
								" {quote.quote} "
							</h3>
							<h4 key={quote.author} className='author'>
								-- {quote.author}
							</h4>
						</div>
					);
				})}
			</header>
			<footer className='footer'>
				<h3 key='api-info' className='api'>
					Interested in JSON files? Checkout the backend server by simply adding
					/quotes, quotes/random or /quotes/search?term=[your search term] to
					the URL
				</h3>
			</footer>
		</div>
	);
};

export default Quotes;
