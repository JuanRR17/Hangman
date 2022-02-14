import React from 'react';
import SingleLetter from './SingleLetter';
import styled from 'styled-components';

const vowals = ["A","E","I","O","U"];
const consonants = ["B","C","D","F","G","H","J","K","L","M","N","Ñ","P","Q","R","S","T","V","W","X","Y","Z"];


const renderLetters = (type, onClickLetter, inactiveCharacters, language) =>{

    const renderLetter = character =>(
        <SingleLetter  
            key={character}
            clickHandler={onClickLetter}
            text={character}
            inactiveCharacters={inactiveCharacters}
            language={language}
            />
    )
    return type.map(renderLetter);
};

const Letters = (props) => {
    const{
        endGame,
        handleSetInactiveCharacters,
        inactiveCharacters,
        handleSetWordArray,
        wordArray,
        wordToArray,
        wordToGuess,
        hangman,
        handleSetHangman,
        handleSetCharMatch,
        language
        } = props;

    const checkSpecialCharacter = (character) => {
        switch (character){
            case "Á":
                return "A";
            case "É":
                return "E";
            case "Í":
                return "I";
            case "Ó":
                return "O";
            case "Ü":
            case "Ú":   
                return "U";
            default:
                return character;     
        }
    };

    const checkCharacter = (character,wordArray) => {
        const newArray=wordToArray(wordToGuess.toUpperCase());
        const arrayChecked=Array.from(wordArray);
        let match=0;
        for(let i=0;i<newArray.length;i++){
            const a = checkSpecialCharacter(newArray[i]);
            if(character===a){
                arrayChecked[i]=newArray[i];
                match++;
            }
        }    
        if(match===0){
            let hangmanUpdated = hangman+1;
            handleSetHangman(hangmanUpdated)};
            handleSetCharMatch(match);

        return arrayChecked;
    };

    const onClickLetter = character =>{
        if(!endGame()){
            handleSetInactiveCharacters([...inactiveCharacters, character]);
            handleSetWordArray(checkCharacter(character, wordArray));
        }
    };

    return (
        <section>
            <Vowals className="container px-0">{renderLetters(vowals, onClickLetter, inactiveCharacters, language)}</Vowals>
            <Consonants className="container px-0">{renderLetters(consonants, onClickLetter, inactiveCharacters, language)}</Consonants>
        </section>
    );
};

export default Letters;

const Vowals=styled.p`
    text-align:center;
`;

const Consonants = styled.p`
    text-align:center;
`;