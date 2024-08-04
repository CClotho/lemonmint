import {Link, Outlet} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProducts } from './api/api';
import {useNavigate} from 'react-router-dom';
import { RiShirtFill } from "react-icons/ri";
import { GiPearlNecklace } from "react-icons/gi";
import { FaLemon } from "react-icons/fa";
import styles from './App.module.css';


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [onEdit, setOnEdit] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

   setError(null);
    const AllProducts = async() => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts)
        
      }catch(error) {
        setError(error)
      }finally{
        setIsLoading(false);
      }
    }

    AllProducts();
  }, [])  

  
 
 // console.log("App Products",products)


 
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


  const onHandleCheckout = () => {
    
    //computeTotalPrice(); add this on useEffect on checkout component
    
    navigate("/checkout")
  }

 
  const onRemoveProduct =(id) => {
    
    const updatedCart = cart.filter((product, index) => index !== id)
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

 
  const onUpdateCart =(id, quantity, setQuantity) => {
    // edit this part to look for the index of the product inside the cart and update it rather than product id because if 2 ids are in the cart it will share the same quantity
    const updatedCart = cart.map((product, index) => {

      
      let newPrice = product.price * quantity
      if(id === index) {
        
        return {...product, quantity: quantity, price: newPrice }
      } else {
        return product
      }
      
      
    })

    setCart(updatedCart);
    setOnEdit(null)
    setQuantity(null)
    
    
  }


  console.log(products)

  return (
    <>
      <div className={styles.container}>
        <div>
        <Link to="/" className={styles.links}> <h1> Welcome to Lemonmint Shop</h1></Link>
        </div>
          {/* Add hamburger icon here*/}
     
        <div className={styles.dropdown}>
          <FaLemon size="2.5rem" cursor="pointer" className={styles.hidden}/>

         <div className={styles.menu}>
          
          <div >
          <Link to="/clothes" className={styles.links}> <RiShirtFill size="2rem" cursor="pointer"/></Link>
            <Link to="/clothes" className={styles.links}> Clothes</Link>
          </div>

          
          <div>
          <Link to="/jewelry" className={styles.links}>  <GiPearlNecklace size="2rem" cursor="pointer"/></Link>
            <Link to="/jewelry" className={styles.links}> Jewelry</Link>
          </div>
         </div>

        </div>

        
        <div>
          <div  onClick={onHandleCheckout} className={styles.links}>   Cart: {cart.length} </div>
        </div>


    
      </div>

        
    <Outlet context={[
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
      onChangeQuantity
    ]}
      />

   </>
  )
}

export default App
