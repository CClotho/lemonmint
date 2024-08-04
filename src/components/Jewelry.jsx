import {useOutletContext} from 'react-router-dom';
import { useEffect } from 'react';
import { GiCutLemon } from "react-icons/gi";
import styles from '../App.module.css';

export const Jewelry = ()=> {

        const [onAddProduct, products, cart, , , computeTotalPrice] = useOutletContext();

        const Jewelry = products.filter(product => product.category === 'jewelery');   
        
        useEffect(() => {

            computeTotalPrice();
        },[])
        
    return(
        <>
            <h1 className={styles.categoryTitle }> Welcome to Jewelry </h1>
            <div className={styles.itemsContainer}> 
            

                {Jewelry?.length > 0 ? Jewelry.map(product => {
                    return(
                        <div key={product.id}>
                        
                        <ul className={styles.card}>
                            <li><img src={product.image} alt={product.title} className={styles.accessories}/></li>
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