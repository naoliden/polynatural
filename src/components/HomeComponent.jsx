import React, { useState } from 'react';
import { connect } from 'react-redux';


const Home = (props) => {
  const [ state, setState ] = useState()

  return(
      <React.Fragment>  
          
          {props.client}
          <br />
          {props.content}
      </React.Fragment>
  )
  }
  

function MapStateToProps(global_state){
  // Los datos que recibo como props
  return {
    client: global_state.test.client 
  }
}
export default connect(MapStateToProps)(Home);