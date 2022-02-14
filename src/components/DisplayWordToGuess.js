import React from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { version } from '../utils/languages';

const DisplayWordToGuess = (props) => {
    const {
        wordToGuess, 
        endGame, 
        wordArray,
        wordToArray,
        language
    } = props;
    
    const displayWord = (wordToGuess) =>{
        let array;
        if(!endGame)
            array=wordArray;
        else
            array=wordToArray(wordToGuess);
       return array.map((character, index) => <div key={index} className="word bg-light p-1"><span>{character}</span></div>);
    };


    return (
        <Display>
            <div className="container">
                { wordToGuess ? <div className="row justify-content-center gap-sm-1">{displayWord(wordToGuess)}</div>
                :
                <div className="row justify-content-center">
                    <div className="col">{!wordToGuess && <CircularProgress />}</div>
                    <div className="row justify-content-center text-align-center">
                        <Skeleton className='skeleton' variant="rect" height={30} width={250}>
                            {
                                language==="es" ? version.es.loadingWords
                                :
                                version.eng.loadingWords
                            }
                        </Skeleton>
                    </div>
                </div>
                }
            </div>
        </Display>
    );
};

export default DisplayWordToGuess;

const Display = styled.div`
    .word{
        display:block;
        text-align:center;
        width:50px;
        height:50px;
        border-radius: 10px;
        font-weight: bold;
        font-size: 25px;
        border:2px solid black
    }
    .skeleton{
        color:white;
    }
`;