import React,{useState,useEffect} from 'react';
import Definition from './Definition';
import MainButton from './MainButton';
import WordResult from './WordResult';
import styled from 'styled-components';

const ResultScreen = (props) => {
    const {
        endGameScreen,
        displayResult,
        inactiveWords, 
        wordList,
        wordDefinition,
        restartGame,
        reloadWords,
        language,
        wordToGuess
    } = props;

    const [bckgrColor, setBckgrColor] = useState();

    useEffect(() => {
        if(endGameScreen){
            setBckgrColor("rgba(0, 255, 0, 0.7)");
        }else{
            setBckgrColor("rgba(255, 0, 0, 0.7)");
        }
    }, [endGameScreen]);

    const onClickMain = () =>{
        if(inactiveWords.length < wordList.length){
            restartGame();
            }
        else{
            reloadWords();
        }
    };

        return (
        <ResultContainer 
            displayResult={displayResult} 
            bckgrColor={bckgrColor}
            >
            <WordResult 
                endGameScreen={endGameScreen}
                language={language}
            />               
            <div>
                <div className='word'>
                    {wordToGuess}
                </div>
            </div>
            <MainButton 
                onClickMain = {()=>onClickMain()} 
                inactiveWords={inactiveWords} 
                wordList={wordList}
                language={language}
                />
            {language==="es" 
            &&
            <Definition 
                wordDefinition={wordDefinition}/>}
        </ResultContainer>
    );
};

export default ResultScreen;

const ResultContainer = styled.div`
    z-index: 5;
    position:absolute;
    top:200px;
    width:60%;
    left:20%;
    display:${props=>props.displayResult};
    background-color:white;
    padding:25px;
    border:15px double ${props=>props.bckgrColor};
    border-radius:40px;
    text-align: center;
    .word{
        font-size:35px;
        background-color: white;
        padding: 5px 15px;
        display:inline-block;
        border-radius:20px;
        border:3px solid black;
    }
`;