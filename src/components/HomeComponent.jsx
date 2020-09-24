import React, {useEffect, useState} from 'react';
import LoadingComponent from './LoadingComponent';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { baseURL } from '../shared/constants';
// import fetch from 'cross-fetch';

const MapStateToProps = (global_state) => {
  return {
    // nombre que le quiero dar localmente (dentro del componente entra como props.<name>) : acceso desde el global_state
    form_data: global_state.form_data,
  }
}


// const MapDispatchToProps = (dispatch) => {
//   // Misma logica. Dentro del componente accedo a la funcion como props.addClient y a esta funcion se le asigna la 
//   // funcion dispatch(addClient()) \ El lado izquierdo es un mapeo a lo del derecho (que importo desde fuera y ejecuto con dispatch)
//   return( {
//     addClient: (client_name) => dispatch(addClient(client_name)),
//   })
// }


const Home = ({content, form_data}) => {
  const [loading, setLoading] = useState(true);

  // useEffect( ()=>{
  //   setTimeout( () => { setLoading(false) }, 2000)
  // }, [])

  useEffect( () => {
    const f = async () =>{
      try {
        const hola = await fetch(baseURL + '/clients');
        const res = await hola.json();
        console.log(res);
      } catch (error) {
        console.error(error)
      }
    }
    f();
  }, [])

  if(loading){
    return <LoadingComponent color="primary"/>
  } else {
    return(
      <>
        {console.log("DATA")}
        {console.log(form_data)}
        {/* <Button onClick={() => addClient("HOME")}> */}
        <Button onClick={() => console.log(form_data)}>
          Boton pos bb
        </Button>
      </>
    )
  }
}

export default connect(MapStateToProps)(Home);