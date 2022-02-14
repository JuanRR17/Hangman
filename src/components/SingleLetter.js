import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SingleLetter = (props) => {
    const {
        text, 
        inactiveCharacters, 
        clickHandler,
        language
        } = props;
    
    return (
        <Letter
            key={text}
            onClick={ () => clickHandler(text) }
            disabled={inactiveCharacters.includes(text) || language==="def"}
            display={(text==="Ñ" && language!=="es") ? "none" : "inline-block"}
            >
            <span>{text}</span>
        </Letter>
    );
};

SingleLetter.propTypes = {
    text:PropTypes.string.isRequired,
    clickHandler:PropTypes.func.isRequired,
    inactiveCharacters:PropTypes.array.isRequired,
    language:PropTypes.string.isRequired
};

export default SingleLetter;

const Letter=styled.button`
    display: ${props => props.display};
    width:50px;
    height:50px;
    border-radius: 10px;
    font-weight: bold;
    padding:0px 10px;
    font-size: 20px;
    margin:5px;
    border: 5px solid black;
    :hover{
        background-color:rgb(235, 193, 80);
    }
`;