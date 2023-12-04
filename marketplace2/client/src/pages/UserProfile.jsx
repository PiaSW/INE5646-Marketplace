import React, { useState, useEffect } from 'react';
import BACKEND_URL from "../constants";
import { getUserID } from "../hook/getUserId";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserProfile = () => {
  
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [user, setUser] = useState('');
    const userID = getUserID();
    const navigate = useNavigate();



    useEffect(() => {

      const getUserProfile = async () => {

        
    setName(''); // Limpa o estado do nome
    setEmail(''); // Limpa o estado do e-mail
    setLocation('');
    setPhoneNumber('');

        // Make a GET request to the user endpoint
          const response = await axios.get(
            BACKEND_URL + `/auth/${userID}`,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          ).then(response => {
            console.log(response.data);

            setUser(response.data);

          })
          .catch(error => {
            alert('Usuario já existe!');
            console.log(error);
          });
      };

      // Chama a função getUserProfile quando o componente monta (componentDidMount)
      getUserProfile();

    }, []); // O array vazio assegura que o useEffect só é chamado uma vez, quando o componente é montado
  
    
  
    const handleProfileUpdate = async (e) => {
      e.preventDefault();
      
      try {
        // Make a PUT request to the updateProfile endpoint
        
        const response = await axios.put(
          BACKEND_URL + `/auth/${userID}`,
          { name, email, location, phonenumber },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(response => {
          console.log(response);
  
          alert('Usuario atualizado com sucesso!');
        })
        .catch(error => {
          console.log(error);
        });
  
        navigate('/INE5646-Marketplace/userProfile');

      } catch (error) {
        console.log('errr', error);
        setErrMsg(error.response.data.message);
      }
    };
  
  
    return (
    <div className="App">
        <h2>Perfil de Usuário</h2>
        <form onSubmit={handleProfileUpdate}>
        <label for="username">Usuário:</label>
        <input type="text" id="username" name="username" value={user.name} onChange={(e) => setName(e.target.value)} />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value={user.email} onChange={(e) => setEmail(e.target.value)} />
        
        <label for="phoneNumber">Celular:</label>
        <input type="tel" id="tel" name="phoneNumber" value={user.phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        
        <label for="localizacao">Localização:</label>
        <input type="text" id="location" name="location" value={user.location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Atualizar Perfil</button>
      </form>
    </div>    
  )
}

export default UserProfile