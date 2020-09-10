import React from 'react';
import { connect } from 'react-redux';


const Home = (props) => {

  return(
      <React.Fragment>  
          {props.content}
      </React.Fragment>
  )
  }
  

function MapStateToProps(global_state){
  // Los datos que recibo como props
  return {
    // nombre que le quiero dar localmente como props.<name> : acceso desde el global_state
    client: global_state.test.client,
    funct: global_state.test.test_function,
    fruta: global_state.forms.fruta,
    today: global_state.test.today
  }
}
export default connect(MapStateToProps)(Home);