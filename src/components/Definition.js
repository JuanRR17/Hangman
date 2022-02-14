import React from 'react';
import styled from 'styled-components';

const Definition = (props) => {
    const {
        wordDefinition
    }=props;

    const pattern1=/(&[^\s]*;)|(<[^>]*>)|(['\*\*][^]*)/g;
    const pattern2=/(Diccionario[^1]*1)/g;

    const reformatDefinition = (definition) => {
        return definition.replace(pattern1,"").replace(pattern2,"1");
    };

    return (
        <DefinitionContainer>
            Definición:<br/>
            {
                reformatDefinition(wordDefinition) || "No disponible"
            }
        </DefinitionContainer>
    )
};

export default Definition;

const DefinitionContainer = styled.div`
  color:white;
  background-color:#666;
  padding:20px;
  border-radius: 20px;
  text-align:justify;
  font-family:verdana;
  font-size:20px;
  font-weight:light;
  max-height: 220px;
  overflow: auto;
  display:block;
`;