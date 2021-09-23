import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';


const Box = styled.div`
display:flex;
flex : 1;
background-color:  #E9ECEF;
justify-content: center;
padding: 10pt;
`;
class SubmitButton extends React.Component {

  render() {
    return (
      <Box>
        <div className="submitButton">
          <Button className='button'
            disabled={this.props.disabled}
            onClick={() => this.props.onClick()}
          >
            {this.props.text}</Button>
        </div></Box>

    );
  }
}


export default SubmitButton;