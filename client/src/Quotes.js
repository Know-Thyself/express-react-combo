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
        .then((data) => {
          console.log(data);
          setQuotes(data);
        });
      setController(true);
    }
  }, [controller, quotes]);
  console.log(quotes);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());

    const filteredSearch = quotes.filter(quote => {
      return quote.quote.toLowerCase().includes(searchInput) || quote.author.toLowerCase().includes(searchInput);
    });
    setQuotes(filteredSearch);
    if (e.target.value === "") window.location.reload();
  }

  function pickFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

  const randomQuoteGenerator = (e) => {
    const random = pickFromArray(quotes);
    setRandomQuote([{quote: random.quote, author: random.author}])
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inspirational and Motivational Quotes</h1>
        
        {randomQuote.map(random => {
            return (
                <div className="random-quote-wrapper">
                   <h3>" {random.quote} "</h3>
                   <h4>{random.author}</h4>
                </div>
            )
        })}
        
        <div key="input-form" className="search-input-wrapper">
          <i class="fas fa-search"></i>
          <input 
            key="search-input "
            type="text"
            className="search-bar"
            placeholder="Search for a quote by key word or author name"
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>

        <div className="button-container">
        <div id="awesome-button">
          <button onClick={randomQuoteGenerator} className="random-button">Random Quote</button>
        </div>
      </div>
        {quotes.map((quote, index) => {
          console.log(quote.quote);
          return (
            <div className="quotes-wrapper">
              <h3 key={index} className="quote">
                <span>" {quote.quote} "</span>
              </h3>
              <h4 className="author">
                <span>{quote.author}</span>
              </h4>
            </div>
          );
        })}
      </header>
    </div>
  );
};

export default Quotes;
