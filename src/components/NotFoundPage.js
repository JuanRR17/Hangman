import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
    return (
        <NotFoundContainer >
            Page Not Found
            <div>
                <Link to="*">Go to Hangman</Link>
            </div>
        </NotFoundContainer>
    );
};

export default NotFoundPage;

const NotFoundContainer = styled.div`
    color:white;
    text-align:center;
    padding:50px;
    font-size:30px;
    a{
        color:white;
    }
`;