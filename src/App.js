import './App.css';
import CurrencyRow from './CurrencyRow';
import { useEffect, useState } from 'react';

import latestCurrency from './mockAPI';
var myHeaders = new Headers();
myHeaders.append("apikey", "ocDt58ZiRqgaL3E575SUBJAymQKm6z51");
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

function App() {

  const [currencyOption, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    fetch('https://api.apilayer.com/currency_data/live?base=EUR&symbols=EUR,GBP', requestOptions)
      .then(response => response.json())
      .then(data => {

        console.log(data)

        let currency = Object.keys(data.quotes);

        setCurrencyOptions([data.source, ...currency]);
        setFromCurrency(data.source);
        setToCurrency(currency[0]);
        setExchangeRate(data.quotes[currency[0]]);
      });

  }, []);

  useEffect(() => {
   
    if (fromCurrency !== null && toCurrency !== null) {

      var from = fromCurrency;
      var to = toCurrency;


      if (from && to) {
        from = from.length > 3 ? from.slice(from.length - 3, from.length) : from;
        to = from.length > 3 ? to.slice(to.length - 3, to.length) : to;
        console.log(from, to)
      }

      fetch('https://api.apilayer.com/currency_data/live?base=' + from + 'symbols=' + to, requestOptions)
        .then(response => response.json())
        .then(data => {

          if (data.message) {
            setExchangeRate(1.5);
            console.log('come back...')
          }
        })

    }
  }, [fromCurrency, toCurrency]);




  return (
    <>
      <h1 >Convert</h1>
      <CurrencyRow
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        currencyOption={currencyOption}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">
        =
      </div>
      <CurrencyRow
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        currencyOption={currencyOption}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
