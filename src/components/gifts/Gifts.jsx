import './../../App.css'
import './Gifts.css'
import React, { useState } from "react";
import { nanoid } from 'nanoid'
import { CiSquareRemove } from "react-icons/ci";
import GiftsForm from '../giftsForm/GiftsForm';
import { useEffect } from 'react';



export default function Gifts() {
    const [gifts, setGifts] = useState([]);
    const [input,setInput] = useState('');
    const [qty, setQty] = useState(1);
    const [img, setImg] = useState('');
    // const [formData, setFormData] = useState(
    //     {gift:'',img:'',qty:0}
    // )
    const [add, setAdd] = useState(false)
    
    
    // const handleFormChange = (event) =>{
    //     setFormData(prevState =>{
    //         return{
    //             ...prevState,
    //             [event.target.name]:event.target.value
    //         }
    //     })
    // }
    
    
    useEffect(()=>{
        localStorage.setItem('gifts', JSON.stringify(gifts))
    },[gifts])
    
    // const cont = gifts.reduce((acc, elemt)=>{
    //     if(acc[elemt.gift]){
    //         acc[elemt.gift]++;
    //     }else{
    //         acc[elemt.gift] = 1;
    //     }
    //     return acc
    // },{})
    
    const duplicates = gifts.map((elem)=> {if(elem.gift === input.toUpperCase())return true})
    
    
    function handleAdd (){
        
        !duplicates.includes(true) && input !== '' && qty !== 0 && img !== '' ? setGifts(prevState => [...prevState, {id:nanoid(),gift:input.toUpperCase(),quantity:qty,imagen:img}]) : alert('Verifique si su regalo esta repetido, o lo campos estan vacios')
        setInput('')
        
    }

    function handleChange (event){
        setInput(event.target.value)
    }
    function handleimg (event){
        setImg(event.target.value)
    }

    const handleRemove = (event, giftId) => {
        setGifts(prevState => prevState.filter(gift => gift.id !== giftId))
    }


    const removeAll = () =>{
        setGifts([])
    }
    const handleQty = (event) =>{
        const cant = event.target.value
        cant < 0 ? setQty(0) : setQty(cant)
    }
    const addGifts = () =>{
        setAdd(prevState => !prevState)
    }

    let arrGift = gifts.map((gifts) => {
        return (
        <div className='container-gifts'>  
            <li className="list-gift" key={gifts.id}>
                <img src={gifts.imagen} alt="" className='img-gift' />
                <h3>
                    {`${gifts.gift} (${gifts.quantity}) `} 
                    <CiSquareRemove onClick={(event)=> handleRemove(event,gifts.id)}/> 
                </h3>
            </li>
        </div>
        
        );
    });
    return(
       <> 
            {add && <GiftsForm 
            handleAdd={handleAdd}
            handleChange={handleChange}
            removeAll={removeAll}
            handleQty={handleQty}
            handleimg={handleimg}
            // handleFormChange={handleFormChange}
            addGifts={addGifts}
            />}
            
            
            <div className={add ? 'container-gift-opacity' : 'container-gift'}>
                <h1 className="title-gift">Regalos:</h1>
                <button onClick={addGifts}>Agregar Regalo</button>
                {gifts.length == 0 && <h1>!!NO HAY REGALOS¡¡ Es tu oportunidad para agregar nuevos</h1>}
                <ul className='container-gift-ul'>{arrGift}</ul>
            </div>
            {gifts.length > 0 && <button className="btn-remove-all" onClick={removeAll}>Eliminar todos</button>}
        </>
    )
};
