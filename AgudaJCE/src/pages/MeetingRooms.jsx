import React, { useState, useEffect } from 'react';
import arrow from '../assets/arrow.png';
import leftArrow from '../assets/leftArrow.png';
import AgudaButtonUI from '../Components/AgudaButton.jsx';


import "./MeetingRooms.css";


const MeetingRooms = (props) => {
    const date = new Date();
    const [currentMonth, setCurrentMonth] = useState(date.getMonth());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [days, setDays] = useState([]);
  
    useEffect(() => {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysArray = [...Array(daysInMonth).keys()].map(i => i + 1);
      setDays(daysArray);
    }, [currentMonth, currentYear]);
  
    const handlePrevMonth = () => {
      setCurrentMonth(prevMonth => prevMonth - 1);
    };
  
    const handleNextMonth = () => {
      setCurrentMonth(prevMonth => prevMonth + 1);
    };
  
    const month = new Date(currentYear, currentMonth);
    const monthNumeric = month.getMonth() + 1;
    var monthName;
    if(props.currentLanguage === 'he'){
      monthName = month.toLocaleString('he', { month: 'long' });
    }
    else{
      monthName = month.toLocaleString('en', { month: 'long' });
    }

    const fetchRoomsAvilability = (fullDate) => {
      console.log(document.getElementById(fullDate).value);
    }
    
  
    return (
      <>
        <div className="calendar">
          <div className="header">
            <a className='arrow' rel="right-arrow-container" onClick={handlePrevMonth}>
              <img src={arrow} alt="right-arrow" />
            </a>
            <h2>{monthName} {currentYear}</h2>
            <a className='arrow' rel="left-arrow-container" onClick={handleNextMonth}>
              <img id='left-arrow' src={leftArrow} alt="left-arrow" />
            </a>
          </div>
          <div className="days">
            {days.map(day => {
              const fullDate = `${currentYear}-${monthNumeric}-${day}`;
              return (
                <div key={day} onClick={() => fetchRoomsAvilability(fullDate)} id={fullDate}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
        <div className="booking_box">
          <AgudaButtonUI button_text={props.languageHelper.morning} value={"Morning"} />
          <AgudaButtonUI button_text={props.languageHelper.afternoon} value={"Noon"} />
          <AgudaButtonUI button_text={props.languageHelper.evening} value={"Evening"} />
        </div>
      </>
    );
  };

export default MeetingRooms;
