import React, {useEffect, useState} from 'react';
import LoadingComponent from './LoadingComponent';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addClient } from '../redux/actions/ActionCreator';


const MapStateToProps = (global_state) => {
  return {
    // nombre que le quiero dar localmente (dentro del componente entra como props.<name>) : acceso desde el global_state
    clients: global_state.test.clients,
  }
}


const MapDispatchToProps = (dispatch) => {
  // Misma logica. Dentro del componente accedo a la funcion como props.addClient y a esta funcion se le asigna la 
  // funcion dispatch(addClient()) \ El lado izquierdo es un mapeo a lo del derecho (que importo desde fuera y ejecuto con dispatch)
  return( {
    addClient: (client_name) => dispatch(addClient(client_name)),
  })
}


const Home = ({content, clients, addClient}) => {
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{
    setTimeout( () => { setLoading(false) }, 2000)
  }, [])

  if(loading){
    return <LoadingComponent color="primary"/>
  } else {
    return(
      <>
        {clients}
        <Button onClick={() => addClient("HOME")}>
          Boton pos bb
        </Button>
      </>
    )
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(Home);