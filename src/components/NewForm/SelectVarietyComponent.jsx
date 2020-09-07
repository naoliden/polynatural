import React, { useMemo, useState }from "react";
import {ciruelas, arandanos, duraznos, mandarinas, peras, limones, naranjas, paltas, manzanas} from './files/frutas';
import Select from 'react-select';
import { Controller } from 'react-hook-form';


const FruitVariety = ({fruit, control, onChange}) => {
  // console.log(fruit)
  switch (fruit.value) {
    case 'manzana':
      return (
        <Controller
        name="variedad"
        control={control}
        rules={{ required: true }}
        defaultValue={fruit.value}
        render={() => 
          <Select onChange={onChange} options={manzanas} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
        }
        />
      )
    case 'limon':
      return (
        <Controller
        name="variedad"
        control={control}
        rules={{ required: true }}
        defaultValue={fruit.value}
        render={() => 
          <Select onChange={onChange} options={limones} placeholder={`Selecciona la variedad de ${fruit.label}`}/>
        }
        />  
      )
    default:
      return <div></div>;
  }
}

export default FruitVariety;