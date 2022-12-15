import './../../App.css'
import './Gifts.css'
import React, { useState } from "react";
import { nanoid } from 'nanoid'
import { CiEdit, CiSquareRemove } from "react-icons/ci";
import GiftsForm from '../giftsForm/GiftsForm';
import { useEffect } from 'react';



export default function Gifts() {
    const [gifts, setGifts] = useState(JSON.parse(localStorage.getItem('gifts')) || []);
    const [formData, setFormData] = useState(
        {
            
        gift:'',
        name:'',
        img:'',
        qty:0}
    )
    const [add, setAdd] = useState(false)
    
    
    const handleFormChange = (event) =>{
        setFormData(prevState =>{
            return{
                ...prevState,
                [event.target.name]:event.target.value
            }
        })
    }
    
    useEffect(()=>{
        localStorage.setItem('gifts', JSON.stringify(gifts))
    },[gifts])

    
    
    
    
    
    const duplicates = gifts.map((elem)=> {if(elem.gift === formData.gift.toUpperCase())return true})
    
    
    function handleAdd (){
        !duplicates.includes(true) && formData.gift !== '' && formData.qty !== 0 && formData.img !== '' ? setGifts(prevState => [...prevState, {id:nanoid(), ...formData}]) : alert('Verifique si su regalo esta repetido, o lo campos estan vacios');
        addGifts()
    }

    
    
    const handleRemove = (event, giftId) => {
        setGifts(prevState => prevState.filter(gift => gift.id !== giftId))
    }
    const removeAll = () =>{
        setGifts([])
    }
    const addGifts = () =>{
        setAdd(prevState => !prevState)
    }
    const editGift = (gifts) =>{
  
        setGifts(prevState => {
            return prevState.map(gift =>{
                return gift.id === gifts.id ? gift : prevState
            })
        })
        
    } 
    let arrGift = gifts.map((gifts) => {
        return (
        <div className='container-gifts'>  
            <li className="list-gift" key={gifts.id}>
                <img src={gifts.img} alt="" className='img-gift' />
                <h3>
                    {`${gifts.gift}\n${gifts.name}\n(${gifts.qty}) `} 
                    <CiSquareRemove onClick={(event)=> handleRemove(event,gifts.id)}/> 
                    <CiEdit onClick={(event)=> editGift(gifts)} />
                </h3>
            </li>
        </div>
        
        );
    });
    return(
       <> 
            {add && <GiftsForm 
            handleAdd={handleAdd}
            removeAll={removeAll}
            handleFormChange={handleFormChange}
            addGifts={addGifts}
            />}
            
            
            <div className={add ? 'container-gift-opacity' : 'container-gift'}>
                <h1 className="title-gift">Regalos:</h1>
                <button className='input-gift' onClick={addGifts}>Agregar Regalo</button>
                <div className='container-gift-list'>
                    {gifts.length == 0 && <h1>!!NO HAY REGALOS¡¡ Es tu oportunidad para agregar nuevos</h1>}
                    <ul className='container-gift-ul'>{arrGift}</ul>
                </div>
                {gifts.length > 0 && <button className="btn-remove-all" onClick={removeAll}>Eliminar todos</button>}
            </div>
        </>
    )
};
