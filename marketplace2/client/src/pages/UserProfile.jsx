import React, { useState, useEffect } from 'react';
import BACKEND_URL from "../constants";
import { getUserID } from "../hook/getUserId";
import axios from 'axios';

export const UserProfile = () => {
  
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [user, setUser] = useState('');
    const userID = getUserID();



    useEffect(() => {

      const getUserProfile = async () => {
        // Make a GET request to the user endpoint
        try {
          const response = await axios.get(`/${userID}`, 
          {
            headers: {"Content-Type": 'application/json'},
          }
          );
          
          setUser(response.data);
          console.log(response.data);
          
        } catch (error) {
          console.log('errr', error);
        }
      };

      // Chama a função getUserProfile quando o componente monta (componentDidMount)
      getUserProfile();

    }, []); // O array vazio assegura que o useEffect só é chamado uma vez, quando o componente é montado
  
    if (!user) {
      return <div>Carregando...</div>;
    }
  
    const handleProfileUpdate = async (e) => {
      e.preventDefault();
      
      try {
        // Make a PUT request to the updateProfile endpoint
        
        const response = await axios.put(`/${userID}`, { name, email, password, location, phonenumber }, 
        {
          headers: {"Content-Type": 'application/json'},
        }
        );
  
        window.location.href = '/userProfile';
        
      } catch (error) {
        console.log('errr', error);
        setErrMsg(error.response.data.message);
        alert(error.response.data.message);
      }
    };
  
  
    return (
    <div className="App">
        <h2>Perfil de Usuário</h2>
        <form onSubmit={handleProfileUpdate}>
        <label for="username">Usuário:</label>
        <input type="text" id="username" name="username" value={user.name} onChange={(e) => setName(e.target.value)} />

        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" value={user.password} onChange={(e) => setPassword(e.target.value)} />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value={user.email} onChange={(e) => setEmail(e.target.value)} />
        
        <label for="phoneNumber">Celular:</label>
        <input type="tel" id="tel" name="phoneNumber" value={user.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        
        <label for="localizacao">Localização:</label>
        <input type="text" id="location" name="location" value={user.location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Atualizar Perfil</button>
      </form>
    </div>    
  )
}

export default UserProfile