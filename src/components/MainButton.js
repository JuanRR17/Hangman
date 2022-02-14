import React from 'react';
import PropTypes from 'prop-types';
import { version } from '../utils/languages';
import styled from 'styled-components';

const MainButton = (props) => {
    const{
        onClickMain,
        inactiveWords,
        wordList,
        language
    }=props;
    var lang;
    switch (language) {
        case "eng":{
            lang={
                nextW:version.eng.nextW,
                load:version.eng.load,
            };
            break;
        }
        case "es":{
            lang={
                nextW:version.es.nextW,
                load:version.es.load,
            };
            break;
        }
        default:
            lang={
                nextW:version.eng.nextW,
                load:version.eng.load,
            };
            break;
    }
    const handleMessage = () =>{
        if(inactiveWords.length < wordList.length)
            return lang.nextW;
        else
            return lang.load;
    }

    return (
        <Button onClick={onClickMain}>
            {handleMessage()}
        </Button>
    );
};

MainButton.propTypes = {
    onClickMain: PropTypes.func.isRequired,
};

export default MainButton;

const Button = styled.button`
    padding:10px 20px;
    margin: 10px auto;
    background-color: orange;
    font-weight:bold;
    color:black;
    border-radius: 30px;
    outline: 5px solid white;
    border-width: 5px;
    position:relative;
    font-size: 25px;
`;