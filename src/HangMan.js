import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DisplayWordToGuess from './components/DisplayWordToGuess';
import HangmanPictures from './components/HangmanPictures';
import Letters from './components/Letters';
import ResultScreen from './components/ResultScreen';
import Score from './components/Score';
import styled from 'styled-components';
import { lifes,hiddenChar,wordListLength } from './utils/constants';

const HangMan = () => {
    const [wordList, setWordList] = useState([]);
    const [wordToGuess, setWordToGuess] = useState("");
    console.log("wordToGuess:", wordToGuess);
    const [wordDefinition, setWordDefinition] = useState("");
    const [wordArray, setWordArray] = useState([]);
    const [charMatch, setCharMatch] = useState(0);
    const [hangman, setHangman] = useState(0);
    const [endGameScreen, setEndGameScreen] = useState();
    const [inactiveCharacters, setInactiveCharacters] = useState([]);
    const [inactiveWords, setInactiveWords] = useState([]);
    const [displayResult, setDisplayResult] = useState("none");
    const [language, setLanguage] = useState("def");

    //>GENERATE LIST
    const handleList = () =>{
        var url;
        var newWord;
        var wordAndDefinition;
        switch(language){
            case "eng":{
                url='https://random-word-api.herokuapp.com/word';
                axios
                .get(url)
                .then(response => {
                    newWord = response.data[0].toUpperCase();
                    wordAndDefinition={word:newWord, definition:""};
                    if(!newWord.includes(" ") && !newWord.includes(".")){
                        setWordList([...wordList,wordAndDefinition]);
                    }
                    else
                    handleList();
                    }
                )
                break;
            }
            case "es":{
                url='https://palabras-aleatorias-public-api.herokuapp.com/random';
                axios
                .get(url)
                .then(response => {
                newWord = response.data.body.Word.toUpperCase();
                const definition = response.data.body.DefinitionMD;
                wordAndDefinition = {word:newWord, definition: definition};
                if(!newWord.includes(" ") && !newWord.includes(".")){
                    setWordList([...wordList,wordAndDefinition]);
                }
                else
                handleList();
                }
                )
                break;
            }
            default:{

                break;
            }
        }
    };
    useEffect(()=>{
        //if(language === "es" || language === "eng")
            reloadWords();
    }, [language]);

    useEffect(() => {
        if(wordList.length<wordListLength){
            handleList();
        }
        if(wordList.length===wordListLength)
            restartGame();
    }, [wordList]);
    
    //<GENERATE LIST

    const randomWord = (wordsList) => {
        let num;
        do{
            num = Math.floor(Math.random() * wordsList.length);
        }while(inactiveWords.includes(wordsList[num].word) && inactiveWords.length < wordsList.length)
       
        const word=wordsList[num].word;
        const definition=wordsList[num].definition;

        return [word,definition];
    };

    const initialArray = (word) =>{
        const array=[];
        for(let j=0;j<word.length;j++){
            array[j]= hiddenChar;
        }
        return array;
    };

    const wordToArray = (word) =>{
        const array=[];
        for(let j=0;j<word.length;j++){
            array[j]= word.charAt(j);
        }
        return array;
    };
    
    const restartGame = () => {
        if(language==="es" || language==="eng"){
            if(inactiveWords.length-1 < wordList.length){
                setInactiveCharacters([]);
                const[word,definition]=randomWord(wordList);
                setWordToGuess(word)  ;
                setWordDefinition(definition);
                setHangman(0);
                setDisplayResult("none") ;
                setCharMatch(0);
            }
        }
      };

    const addInactiveWords = (wordToGuess) =>{
        if(inactiveWords[0]===""){
            inactiveWords[0]=wordToGuess;
        }else
            setInactiveWords([...inactiveWords, wordToGuess]);
    };

    //> START NEXT WORD
    useEffect(() => {
        setWordArray(initialArray(wordToGuess));
        addInactiveWords(wordToGuess);
    }, [wordToGuess]);

    //< START NEXT WORD

    const reloadWords = () => {
        setWordList([]);
        setInactiveWords([]);
        setWordToGuess("");
        setDisplayResult("none");
    };

    const endGame = () => {
        return (!wordArray.includes(hiddenChar) || hangman===lifes) && inactiveCharacters.length>1;
    };
    
    //> DISPLAY END SCREEN
    useEffect(() => {
        if(endGame()){
            setDisplayResult("block");
            if(!wordArray.includes(hiddenChar) && hangman<lifes ){
                setEndGameScreen(true);
            }else{
                setEndGameScreen(false);
            }
        }
    }, [endGame()]);
    //< DISPLAY END SCREEN
    
  return(
    <HangManContainer>
        {
            endGame()
            &&
            <ResultScreen 
            displayResult={displayResult}
            endGameScreen={endGameScreen}
            inactiveWords={inactiveWords} 
            wordList={wordList} 
            wordDefinition={wordDefinition}
            restartGame={()=>restartGame()}
            reloadWords={()=>reloadWords()}
            language={language}
            wordToGuess={wordToGuess}
        />}
        <div className="container my-1">
                <select name="lang" onChange={e => setLanguage(e.target.value)}>
                    <option value="def">Select Language</option>
                    <option value="eng">ENG</option>
                    <option value="es">ES</option>
                </select>
            {
                (!language || language==="def" ? <div className='selLang'>Please select a language</div>
                    : 
                    (<div>
                        <Score 
                            startTimer={wordToGuess}
                            stopTimer={endGame()}
                            charMatch={charMatch}
                            inactiveCharacters={inactiveCharacters}
                            inactiveWords={inactiveWords}
                            wordListLength={wordListLength}
                            language={language}
                        />
                        <DisplayWordToGuess 
                            wordToGuess={wordToGuess} 
                            endGame={endGame()} 
                            wordArray={wordArray} 
                            wordToArray={(word)=>wordToArray(word)}
                            language={language}
                        />
                    </div>            
                    )
                )
            }

        </div>
        <GameGrid className="container col-md-10 my-3">
            <div className="row justify-content-center">  
                <div className="col-9 col-sm-5 col-md-4 col-lg-3 mt-4">
                    <HangmanPictures hangman={hangman}/>
                </div>
                <div className="col-11 col-sm-7 mt-4">            
                    <Letters
                        endGame={endGame} 
                        inactiveCharacters={inactiveCharacters}
                        wordArray={wordArray}
                        wordToGuess={wordToGuess}
                        hangman={hangman}
                        handleSetInactiveCharacters={(value)=>setInactiveCharacters(value)}
                        handleSetWordArray={(value)=>setWordArray(value)}
                        handleSetCharMatch={(value)=>setCharMatch(value)}
                        wordToArray={(word)=>wordToArray(word)}
                        handleSetHangman={(value)=>setHangman(value)}
                        language={language}
                    />
                </div>
            </div> 
        </GameGrid>
    </HangManContainer>
    );
};

HangMan.propTypes = {};

export default HangMan;

const HangManContainer = styled.div`
    text-align:center;
    .selLang{
        color:white;
    }
`;

const GameGrid = styled.div`
    section{
        display:block;
        outline:10px solid black ;
        border-radius: 20px;
        color:black;
        padding:10px;
        width:auto;
        background-color: rgb(255,255,255,0.8);
    }
`;