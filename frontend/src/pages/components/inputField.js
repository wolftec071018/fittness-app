import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
display:flex;
flex : 1;
background-color:  #E9ECEF;
justify-content: center;
padding: 10pt;

`;
const InputStyle= styled.input`
width: auto;
border-radius:10px;
display:flex;
flex : 1;
justify-content: center;
padding: 0pt;
padding-left:10pt;
min-height: 25pt;
//  box-shadow: 5px 5px 15px 5px #000000;

`;

class InputField extends React.Component {

  render() {
    return (
      <Box>
        <div className="inputField">
          <InputStyle
            className='input'
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
          />
        </div>
      </Box>
    );
  }
}


export default InputField;