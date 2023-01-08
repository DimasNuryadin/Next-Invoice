import { useState } from 'react';

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);
  // return valuenya
  return [
    values,
    // lalu return fungsi untuk mengubah value
    (formType:any, formValue:any) => {
      // reset
      if (formType === 'reset') {
        return setValues(initialValue);
      }
      // return value baru
      // Lalu copy value lama ...
      return setValues({ ...values, [formType]: formValue });
    },
  ];
};