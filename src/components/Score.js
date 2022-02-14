import React,{useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { version } from '../utils/languages';
import styled from 'styled-components';

const Score = (props) => {
    const {
        startTimer, 
        stopTimer, 
        charMatch, 
        inactiveCharacters,
        inactiveWords,
        wordListLength,
        language
    } = props;
    
    const [time, setTime] = useState(0);
    const [timeToDiscount, setTimeToDiscount] = useState(0);
    const [score, setScore] = useState(0);
    const wordsLeft = wordListLength - inactiveWords.length + 1;

    const interval=useRef(null);
    const discount = useRef(null);

    var lang;
    switch (language) {
        case "eng":{
            lang={
                words:version.eng.words,
                time:version.eng.time,
                score:version.eng.score
            };
            break;
        }
        case "es":{
            lang={
                words:version.es.words,
                time:version.es.time,
                score:version.es.score
            };
            break;
        }
        default:
            break;
    };
    
    useEffect(() => {
        setTime(0);
        interval.current = setInterval(() => {
           setTime(time => time + 1)
        },1000);
        return () => {
            clearInterval(interval.current)
        }
    }, [startTimer]);

     useEffect(() => {
        if(stopTimer){
            clearInterval(interval.current);  
            setTimeToDiscount(time);
        }
    }, [stopTimer]);
        
    useEffect(() => {
        discount.current = setInterval(() => { 
            if(timeToDiscount>0){
            setScore(score => score - 10);
            setTimeToDiscount(timeToDiscount => timeToDiscount - 1);
            }
        },75);  
        return () => {
            clearInterval(discount.current);
        }
    }, [timeToDiscount]);

    useEffect(() => {
        if(charMatch>0)
            setScore(score + charMatch*100);
        else{
            if(inactiveCharacters.length>0)
                setScore(score - 50);
            }
    }, [inactiveCharacters]);

    useEffect(() => {
        if(wordsLeft===wordListLength)
            setScore(0);
    }, [wordsLeft]);

    return (
        <ScorerContainer className="container col-lg-10">
            <div className="row justify-content-center">
                <div className="sc col-sm col-lg-3 row justify-content-center justify-content-xl-between">
                    <div className="col-auto p-0">{lang.words}:</div>
                    <div className="col-auto col-sm-9 col-lg-auto text-center">{wordsLeft}</div> 
                </div>
                <div className="sc col-sm col-lg-3 row justify-content-center justify-content-xl-between">
                    <div className="col-auto p-0">{lang.time}: </div>
                    <div className="col-auto col-sm-9 col-lg-auto text-center">{stopTimer ? timeToDiscount : time}</div>
                </div>
                <div className="sc col-sm col-lg-3 row justify-content-center justify-content-xl-between">
                    <div className="col-auto p-0">{lang.score}: </div>
                    <div className="col-auto col-sm-9 col-lg-auto text-center">{score}</div>
                </div>
            </div>
        </ScorerContainer>
    );
};

Score.propTypes = {
    startTimer: PropTypes.string.isRequired,
    stopTimer: PropTypes.bool.isRequired,
    charMatch: PropTypes.number.isRequired,
    inactiveCharacters:PropTypes.array.isRequired,
    wordListLength:PropTypes.number.isRequired,
};

export default Score;

const ScorerContainer = styled.div`
  color:white;
  padding:10px 5px;
  margin-bottom:10px;
  text-align:left;
  font-size: 25px;

    .row>.sc{
    margin:5px 10px;
    border:5px solid white;
    border-radius: 15px;
    padding:5px 10px;
    background-color: grey;
    }
`;