import { useEffect, useState } from "react";
import {useOutletContext} from "react-router-dom";


export const Cart = ()=> {
    
    // You have to use all of the shared value in the parent context can't only choose products, cart etc like it has to be in sequence else use ",, " to skip items
    const [,, cart, onRemoveProduct, onUpdateCart, computeTotalPrice, totalPrice, , onEdit, setOnEdit] = useOutletContext();
    const [quantity, setQuantity] = useState(null);
    console.log(cart)
    
    useEffect(() => {

        computeTotalPrice();


    },[cart])
    return(

        <div> 
        <h1> Checkout</h1>

       <div>
       {Array.isArray(cart) && cart?.length > 0 ? cart.map((product, index) => {
            return(
                <div key={index}>
               <ul>
                    <li><img src={product.image ? product.image : "-"} alt={product.title}/></li>
                    <li>{product.title}</li>
                    <li>{product.description}</li>
                    <li>{product.price}</li>
                    <button type="button" onClick={()=> onRemoveProduct(index)}> Remove Item</button>
                    <button type="button" onClick={()=> setOnEdit(index)}> Update Quantity</button>
                    {onEdit === index ? (
                        <>
                            <input type="number" value={quantity > 0 ? quantity : product.quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                            <button type="button" onClick={() => onUpdateCart(index, quantity, setQuantity)}>Confirm</button>
                            <button type="button" onClick={() => setOnEdit(null)}>Cancel</button>
                        </>
                    ) :   <li>{product.quantity}</li> }

                </ul>      
            </div>
            )
        }):
         <div> You currently do not have items in your cart </div>
        
        }
       </div>

       <div>
        <h2> Checkout: {totalPrice}</h2>
       </div>
    </div>

    )
}