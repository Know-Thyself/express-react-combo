import React, { useState, useEffect} from "react";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [controller, setController] = useState(false);

  useEffect(() => {
    if(!controller) {
        fetch("/quotes")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setQuotes(data);
        });
        setController(true);
    }
 
  }, [controller, quotes]);
console.log(quotes)
   return (
     <div className="App">
       <header className="App-header">
        <h1>Inspirational and Motivational Quotes</h1>
         {quotes.map((quote, index) => {
             console.log(quote.quote)
             return (
                 <div className="quotes-wrapper">
                 <h3 key={index} className="quote"><span>" {quote.quote} "</span></h3>
                 <h4 className="author"><span>{quote.author}</span></h4>
                 </div>
             );
         })}
       </header>
     </div>
   );
}

export default Quotes;