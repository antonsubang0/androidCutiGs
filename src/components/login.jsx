import React from 'react';
import { List, ListInput, Col, Row, Button } from 'framework7-react';

export default function Login(props) {
  return (
    <>
      <List noHairlinesMd className='loginCs'>
        <div className='dangerCtr'>{props.notif !== '' ? props.notif : null}</div>
        <ListInput
          type="email"
          name='email'
          placeholder="Enter your email"
          onChange={props.inputUP}
          clearButton
        />
        <ListInput
          type="password"
          name='password'
          placeholder="Your password"
          onChange={props.inputUP}
          clearButton
        />
      </List>
      <Row>
        <Col>
        </Col>
        <Col>
          <Button onClick={()=> props.sumbitX() } color='gray' outline round>
              Login
          </Button>
        </Col>
        <Col>
        </Col>
      </Row>
    </>
  );
}
