import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { SwalAlert } from "./SwalAlert";

export const useCreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      if (!username || !email || !password) {
        SwalAlert('Error!', 'Todos los campos son obligatorios', 'error');
        return;
      }
  
      if (!validateEmail(email)) {
        SwalAlert('Error!', 'El correo electrónico no es válido', 'error');
        return;
      }
  
      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });
       
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ocurrió un error');
        }

        SwalAlert('Bien hecho', 'Usuario creado correctamente', 'success');
        navigate('/login'); 
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    }

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit
    }
}