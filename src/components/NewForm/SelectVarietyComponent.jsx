import React from "react";
import {ciruelas, arandanos, nectarin, guindas, peras, limones, naranjas, paltas, manzanas} from './files/frutas';
import Select from 'react-select';


const FruitVariety = ({fruit, onChange}) => {
  switch (fruit.value) {
    case 1:
      return (
        <Select onChange={onChange} options={manzanas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 2:
      return (
        <Select onChange={onChange} options={paltas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 3:
      return (
        <Select onChange={onChange} options={nectarin} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 4:
      return (
        <Select onChange={onChange} options={ciruelas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 5:
      return (
        <Select onChange={onChange} options={naranjas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 6:
      return (
        <Select onChange={onChange} options={limones} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 7:
      return (
        <Select onChange={onChange} options={peras} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    case 8:
      return (
        <Select onChange={onChange} options={guindas} placeholder={`Selecciona la variedad de ${fruit.label}`}/> 
      )
    case 9:
      return (
        <Select onChange={onChange} options={arandanos} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
      )
    default:
      return <div></div>;
  }
}

export default FruitVariety;