import React from "react";
import {ciruelas, arandanos, nectarin, mandarinas, peras, limones, naranjas, paltas, manzanas} from './files/frutas';
import Select from 'react-select';


const FruitVariety = ({fruit, onChange}) => {
  switch (fruit.value) {
    case 'manzana':
      return (
        <Select onChange={onChange} options={manzanas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'limon':
      return (
        <Select onChange={onChange} options={limones} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'naranja':
      return (
        <Select onChange={onChange} options={naranjas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'palta':
      return (
        <Select onChange={onChange} options={paltas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'ciruela':
      return (
        <Select onChange={onChange} options={ciruelas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'pera':
      return (
        <Select onChange={onChange} options={peras} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'arandano':
      return (
        <Select onChange={onChange} options={arandanos} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'nectarin':
      return (
        <Select onChange={onChange} options={nectarin} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 'mandarina':
      return (
        <Select onChange={onChange} options={mandarinas} placeholder={`Selecciona la variedad de ${fruit.label}`}/> 
      )
    default:
      return <div></div>;
  }
}

export default FruitVariety;