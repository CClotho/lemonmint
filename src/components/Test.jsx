import { useEffect } from "react";
import {useOutletContext} from "react-router-dom";

export const Cart = ()=> {
    
    // You have to use all of the shared value in the parent context can't only choose products, cart etc like it has to be in sequence else use ",, " to skip items
    const [,, cart, onRemoveProduct, onUpdateCart, computeTotalPrice, totalPrice, quantity, onEdit, setOnEdit, onChangeQuantity] = useOutletContext();
   
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
                    <li><img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.title}/></li>
                    <li>{product.title}</li>
                    <li>{product.description}</li>
                    <li>{product.price}</li>
                    <button type="button" onClick={()=> onRemoveProduct(product.id)}> Remove Item</button>
                    <button type="button" onClick={()=> setOnEdit(product.id)}> Update Quantity</button>
                    {onEdit === product.id ? (
                        <>
                            <input type="number" value={quantity > 0 ? quantity : 1} onChange={(e)=> onChangeQuantity(e.target.value)}/>
                            <button type="button" onClick={() => onUpdateCart(product.id)}>Confirm</button>
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


const Component = (props) => { // Accessing the object property by dot notation

    return (
        <div>
            {props.name}  {/* Accessing the 'name' property using dot notation */}
        </div>
    )

}


const Component2 = ({name}) => { // accessing object's property by object destructuring
    return (
        <div>
            {name} {/* Accessing the 'name' property directly through object destructuring */}
        </div>
    )
}


export const DisplayComponents = () => {


    return(
        <>
            <Component name={"Kay"}/> {/* you can technically give any name for your object property that you will eventually pass something in your component*/}
            <Component2 name={"Ray"}/> {/* here though you use the object destructuring as your parameter so you can directly access the object property's directly by their property name*/}
        </>
    )
}


