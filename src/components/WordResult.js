import React,{useState,useEffect} from 'react';
import { version } from '../utils/languages';
import styled from 'styled-components';

const WordResult = (props) => {
    const {
        endGameScreen,
        language
    } = props;

    const [endGameMessage, setEndGameMessage] = useState();
    const [textColor, setTextColor] = useState();
    var lang;
    switch (language) {
        case "eng":{
            lang={
                win:version.eng.win,
                lost:version.eng.lost
            };
            break;
        }
        case "es":{
            lang={
                win:version.es.win,
                lost:version.es.lost
            };
            break;
        }
        default:
            break;
    }

    useEffect(() => {
        if(endGameScreen){
            setEndGameMessage(lang.win);
            setTextColor("green");
        }else{
            setEndGameMessage(lang.lost);
            setTextColor("red");
        }
    }, [endGameScreen]);
    
    return (
        <Result textColor={textColor}>
            {endGameMessage}
        </Result>
    );
};

export default WordResult;

const Result = styled.div`
    color:${props=>props.textColor};
    font-weight:bold;
    font-size:80px;
    text-shadow: 0 0 40px ${props=>props.textColor};
    text-align: center;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
`;