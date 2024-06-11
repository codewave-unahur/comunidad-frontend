import { Card, CardHeader, Grid } from '@mui/material';
import { useEffect, useState } from 'react';


const ExperienciaLaboral = () => {

    const [validarErrores, setValidadErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [edit, setEdit] = useState(false);
    const isFieldDisabled = !edit;
    const [puesto, setPuesto] = useState('');
    const [empresa, setEmpresa] = useState('');





    return ( 
        <>
            
        </>
     );
}
 
export default ExperienciaLaboral;