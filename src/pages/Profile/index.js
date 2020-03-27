import React,{useState, useEffect} from 'react'
import './style.css'
import {Link, useHistory} from 'react-router-dom'

import {FiPower, FiTrash2} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Profile(){
    const history = useHistory()
    const [incident, setIncident] = useState([])
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization:ongId,
            }
        }).then(response=>{
            setIncident(response.data)
        })
    },[ongId])

    async function handleDelete(id){
        try{
            await api.delete(`incident/${id}`,{
                headers:{
                    Authorization:ongId,
                }
            })
            setIncident(incident.filter(incident=>incident.id !== id))
        }
        catch(err){
            alert('Não foi possivel deletear incident, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Heroes"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="incident/new">Cadastrar novo caso</Link>
                <button type = "button" onClick={handleLogout}>
                    <FiPower size = {18} color = "#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul> 
                {incident.map(inci=>(
                    <li key={inci.id}>
                        <strong>Caso:</strong>
                        <p>{inci.title}</p>
                        
                        <strong>DESCRIÇÂO:</strong>
                        <p>{inci.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style:'currency', currency:'BRL'}).format(inci.value)}</p>

                        <button onClick={()=>handleDelete(inci.id)} type="button">
                        <FiTrash2 size = {20} color="#a8a8b3"/>
                        </button>

                    </li> 
                ))}
            </ul>
        </div>
    )
}