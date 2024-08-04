import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { GiCutLemon } from "react-icons/gi";
import styles from '../App.module.css';

export const Clothes = () => {

    const [onAddProduct, products, cart, , , computeTotalPrice]= useOutletContext();
    
    const Clothes = products.filter(product => product.category === "men's clothing");

    useEffect(() => {

       // computeTotalPrice();
    },[])
   
     console.log(Clothes)
    return(
        <>

        <h1 className={styles.categoryTitle }> Welcome to Men's clothing</h1>
            <div className={styles.itemsContainer}> 
                

                {Clothes && Clothes?.length > 0 ? Clothes.map(product => {
                    return(
                        <div key={product.id}>
                    <ul className={styles.card}>
                            <li><img src={product.image} alt={product.title} className={styles.shirts}/></li>
                            <li>{product.title}</li>
                            <li>{product.description}</li>
                            <li>{product.price}</li>
                            <button type="button" onClick={()=> onAddProduct(product.id)} className={styles.addBtn}>  <GiCutLemon size="2rem"  className={styles.lemon}/>Add to cart</button>

                        </ul>      
                    </div>
                    )
                }):
                <div> No products available </div>
                
                }
            </div>
        </>
    )
}