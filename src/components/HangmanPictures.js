import React from 'react';
import PropTypes from 'prop-types';
import hangman0 from '../images/hangman0.png';
import hangman1 from '../images/hangman1.png';
import hangman2 from '../images/hangman2.png';
import hangman3 from '../images/hangman3.png';
import hangman4 from '../images/hangman4.png';
import hangman5 from '../images/hangman5.png';
import hangman6 from '../images/hangman6.png';
import styled from 'styled-components';

const HangmanPictures = (props) => {
    const {
        hangman
    } = props;

    const hangmanDisplay = [
        <img src={hangman0} alt="hangman 0"/>,
        <img src={hangman1} alt="hangman 1"/>,
        <img src={hangman2} alt="hangman 2"/>,
        <img src={hangman3} alt="hangman 3"/>,
        <img src={hangman4} alt="hangman 4"/>,
        <img src={hangman5} alt="hangman 5"/>,
        <img src={hangman6} alt="hangman 6"/>
    ]
    return (
        <StatusContainer>
            {hangmanDisplay[hangman]}
        </StatusContainer>
    );
};

HangmanPictures.propTypes = {
hangman: PropTypes.number.isRequired,
};

export default HangmanPictures;

const StatusContainer = styled.section`
 height:auto;
    img{
    width:100%;
    height:auto;
    border-radius: 10px;
    }
`;