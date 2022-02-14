import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const Word = ({wordToGuess}) => {
    const hiddenChar = "*";
    const [wordArray, setWordArray] = useState([]);

    const displayWord = (wordToGuess) =>{
        let array;
        if(!endGame())
            array=wordArray;
        else
            array=wordToArray(wordToGuess.toUpperCase());

       return array.map((character, index) => <button key={index} className="word"><span>{character}</span></button>);
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

    useEffect(() => {
        setWordArray(initialArray(wordToGuess));
    }, [wordToGuess]);

    return (
        <div>
            {
            wordToGuess ?
            displayWord(wordToGuess) 
            :
            <Skeleton variant="rect" height={50} width={200}>Loading words</Skeleton>
            }
        </div>
    );
};

Word.propTypes = {
    wordToGuess: PropTypes.string.isRequired,
};

export default Word;
