import React, {useEffect, useState} from 'react';
import LoadingComponent from './LoadingComponent';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { baseURL } from '../shared/constants';
import fetch from 'cross-fetch';
import { identity } from 'lodash';

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
  const [data, setData] = useState()
  const ide = 1;
  // useEffect( ()=>{
  //   setTimeout( () => { setLoading(false) }, 2000)
  // }, [])

  const fetchData = async () => {
    const response = await fetch(baseURL + `/users/by_id?select=true&client_id=${ide}`)
    
    const parsed = await response.json()

    setData(parsed)
    setLoading(false)
  }

  useEffect( () => {
    console.log("DATA: ")
    console.log(data)
  }, [data])
  
  useEffect( () => {
    fetchData()
  }, [])

  if(loading){
    return <LoadingComponent color="primary"/>
  } else {
    return(
      <>
        {<h4>{data}</h4>}
        {console.log(data)}
        {/* <Button onClick={() => addClient("HOME")}> */}
        <Button onClick={() => console.log(data)}>
          Boton pos bb
        </Button>
      </>
    )
  }
}

export default connect(MapStateToProps)(Home);