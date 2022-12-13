import './../../App.css'
import './GiftsForm.css'
import React from "react";



export default function GiftsForm(props) {
    
    // const [formData, setFormData] = useState(
    //     {gift:'',img:'',qty:0}
    // )
    
   
    
    // const handleFormChange = (event) =>{
    //     setFormData(prevState =>{
    //         return{
    //             ...prevState,
    //             [event.target.name]:event.target.value
    //         }
    //     })
    // }

    return(
        <section>
            <form action=""
                className='giftsForm' 
                onSubmit={event =>{
                event.preventDefault();
                event.target.reset();
                }}>
                
                <div className='container-input-gift'>
                    <input  type="text" 
                            className="input-gift"
                            name="gift"
                            placeholder='Que vas a regalar?'
                            onChange={props.handleChange}
                            // onChange={props.handleFormChange}
                            />
                    <input type="text" 
                           className='input-gift'
                           name='img'
                           placeholder='http://imagen.jpg'
                           onChange={props.handleimg}
                        // onChange={props.handleFormChange} 
                    />        
                    <input type="number"
                            className='input-gift'
                            name='qty'
                            placeholder='Cantidad'
                            onChange={props.handleQty}
                            // onChange={props.handleFormChange}
                    />        
                </div>

                <div className="container-form">
                    <button className="btn-gift-add"  onClick={props.handleAdd}>Agregar</button>
                    <button className='btn-gift-close' onClick={props.addGifts}>Cerrar</button>
                </div>
            
            </form>
        </section>
        
    )
};
