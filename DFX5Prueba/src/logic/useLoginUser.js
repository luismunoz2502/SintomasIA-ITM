import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { SwalAlert } from "./SwalAlert";


export const useLoginUser = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        
      if (!username || !password) {
        SwalAlert('Error!', 'Todos los campos son obligatorios', 'error');
        return;
      }
      
      
      try {
        const response = await axios.post(`${API_URL}/login`, {
          username,
          password,
        });  
        const { user } = response.data.body;
        auth.login(user);
  
        navigate('/welcome');
      } catch (error) {
        SwalAlert('Error!', 'Nombre de usuario y/o contraseña incorrectos', 'error');
        setPassword('');
        setUsername('');
        console.error('Error en la solicitud:', error.message);
      }
    }
  

    return {
        username,
        password,
        auth,
        handleSubmit,
        setUsername,
        setPassword
    }
};
