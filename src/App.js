import './App.css';
import cardBack from './images/bg-card-back.png';
import cardFront from './images/bg-card-front.png';
import bgDesktop from './images/bg-main-desktop.png';
import bgMobile from './images/bg-main-mobile.png';
import cardLogo from './images/card-logo.svg';
import iconCompleted from './images/icon-complete.svg';
import Mobile from './Mobile';

import { useState } from 'react';

function App() {
  const [nameValue, setNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [cvcValue, setCvcValue] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [name,setName] = useState('');
  const [cvc, setCvc] = useState('');
  const [month,setMonth] = useState('');
  const [year,setYear] = useState('');

  const [allInputs, setAllInputs] = useState(false);

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const isValidCardNumber = (cardNumber) => {
    const cardRegex = /^\d{16}$/;
    return cardRegex.test(cardNumber);
  };

  const isValidMonth = (month) => {
    const monthRegex = /^\d{2}$/;
    return monthRegex.test(month);
  };

  const isValidYear = (year) => {
    const yearRegex = /^\d{2}$/;
    return yearRegex.test(year);
  };

  const isValidCvc = (cvc) => {
    const cvcRegex = /^\d{3}$/;
    return cvcRegex.test(cvc);
  };

  const handleYearChange = (e) => {
    setYearValue(e.target.value);
  };

  const handleCvcChange = (e) => {
    setCvcValue(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumberValue(e.target.value);
  };

  const allInputsValid = () => {
    return (
      isValidCardNumber(numberValue) &&
      isValidMonth(monthValue) &&
      isValidYear(yearValue) &&
      isValidCvc(cvcValue)
    );
  };

  const handleSubmit = () => {
    if (allInputsValid()) {
      setAllInputs(true);
      setCardNumber(numberValue);
      setName(nameValue);
      setCvc(cvcValue);
      setMonth(monthValue);
      setYear(yearValue);
    }
  };

  const isMobile = window.innerWidth <= 480;

  return (
    <div>
      {isMobile ? (
        <Mobile />
      ) : (
        <div className="App">
          <div className='container'>
            <div className='left'>
              <div className='card-front'>
                <div className='logo'><img src={cardLogo} alt="Card Logo" /></div>
                <p className='number'>{cardNumber ? cardNumber : '0000 0000 0000 0000'}</p>
                <div className='info'>
                  <p>{name ? name : 'JANE APPLESEED'}</p>
                  <p>{month && year ? `${month}/${year}` : '00/00'}</p>
                </div>
              </div>
              <img className="front" src={cardFront} alt="Card Front" />
              <p className='cvc'>{cvc ? cvc : '000'}</p>
              <img className="back" src={cardBack} alt="Card Back" />
            </div>

            <div className='right'>
              {allInputs ? (
                <div className='right-thank-you'>
                  <img src={iconCompleted} alt="Thank You" />
                  <h1>Thank you!</h1>
                  <p>We've added your card details</p>
                  <button className='continue'>Continue</button>
                </div>
              ) : (
                <>
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    value={nameValue}
                    onChange={handleNameChange}
                    className='name-input'
                    placeholder='e.g. Jane Appleseed'
                  />

                  <label>Card Number</label>
                  <input
                    type="text"
                    value={numberValue}
                    onChange={handleNumberChange}
                    className='card-input'
                    placeholder='e.g. 1234 5678 9123 0000'
                  />
                  <p className='wrong' style={{ display: numberValue === "" || isValidCardNumber(numberValue) ? 'none' : 'block' }}>
                    Wrong format, numbers only
                  </p>

                  <label>Exp. Date (MM/YY)</label>
                  <div className='three-inputs'>
                    <input
                      type="text"
                      value={monthValue}
                      onChange={(e) => setMonthValue(e.target.value)}
                      className='one'
                      placeholder='MM'
                      style={{ borderColor: monthValue === "" || isValidMonth(monthValue) ? 'gray' : 'red' }}
                    />
                    <input
                      type="text"
                      value={yearValue}
                      onChange={(e) => setYearValue(e.target.value)}
                      className='two'
                      placeholder='YY'
                      style={{ borderColor: yearValue === "" || isValidYear(yearValue) ? 'gray' : 'red' }}
                    />
                    <input
                      type="text"
                      value={cvcValue}
                      onChange={(e) => setCvcValue(e.target.value)}
                      className='three'
                      placeholder='CVC'
                      style={{ borderColor: cvcValue === "" || isValidCvc(cvcValue) ? 'gray' : 'red' }}
                    />
                  </div>
                  <div className='blank-divs'>
                    <p className='blank-one' style={{ visibility: monthValue === "" || isValidMonth(monthValue) ? 'hidden' : 'visible' }}>
                      Can't be blank
                    </p>
                    <p className='blank-two' style={{ visibility: yearValue === "" || isValidYear(yearValue) ? 'hidden' : 'visible' }}>
                      Can't be blank
                    </p>
                    <p className='blank-three' style={{ visibility: cvcValue === "" || isValidCvc(cvcValue) ? 'hidden' : 'visible' }}>
                      Can't be blank
                    </p>
                  </div>
                  <button onClick={handleSubmit}>Confirm</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
