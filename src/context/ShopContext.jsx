import { useContext, createContext, useState } from "react";

const ShopContext = createContext();

export const useShopContext = () => {
    return useContext(ShopContext);
}


export const ShopProvider =() => {

    
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [onEdit, setOnEdit] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  
  
  const onAddProduct =(id) => {
    
    const addProduct = products.find(product => {
      if(product.id === id) {
        return {...product, quantity: 1};
      }
      
    })

    console.log("Add product", cart)
    if(addProduct) {

      setCart([...cart, addProduct]);
      setQuantity(1)
      computeTotalPrice();
     
    }
   

    return addProduct;

    
    
  }

 
  const computeTotalPrice= () => {
    let products = 0;
    
    const total = cart.map(product => {
    
    
    products += product.price
    
    return products
    })

    setTotalPrice(products)
    
  }



 
  const onRemoveProduct =(id) => {
    
    const updatedCart = cart.filter(product => product.id !== id)
     console.log(updatedCart)
    if(updatedCart) {
      setCart(updatedCart);
      return true;
    }
    else {
      return false;
    }
    
    
  }

  const onChangeQuantity = (userQuantity) => {
    setQuantity(userQuantity);
  }

 
  const onUpdateCart =(id) => {
    
    const updatedCart = cart.map(product => {

      
      let newPrice = product.price * quantity
      if(product.id === id) {
        
        return {...product, quantity: quantity, price: newPrice }
      } else {
        return product
      }
      
      
    })

    setCart(updatedCart);
    setOnEdit(null)
    setQuantity(null)
    
    
  }



  
  const contextValue = {

    onAddProduct,
    products,
    cart,
    onRemoveProduct,
    onUpdateCart,
    computeTotalPrice,
    totalPrice,
    quantity,
    onEdit,
    setOnEdit,
    onChangeQuantity,
    setProducts
    
     };
    

    return (

       <ShopContext.Provider value={contextValue}>
       
       </ShopContext.Provider>

    )
}