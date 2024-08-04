import {vi, describe, it, expect} from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Clothes } from '../components/Clothes';
import {Cart} from '../components/Checkout';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';


vi.mock('../components/Checkout', () => ({
    __esModule: true,
    Cart: () => <div>Cart Page</div>
}))

vi.mock('../components/Clothes', () => ({
    __esModule: true,
    Clothes: () => <div>Clothes Page</div>
  }));

describe('../App', () => {
    it('It should render the homepage', () => {

     const {container} = render(
            <BrowserRouter>
            <App/>
            
            </BrowserRouter>);
    
            const welcomeMessage = screen.getByText('Welcome to Lemonmint Shop');
    
            // Assert that the element is in the document
            expect(welcomeMessage).toBeInTheDocument(); 
          
    })

    

    it('It should render the right page according to the link (route) that is clicked', async() => {
        const user = userEvent.setup(); 
        render(
        <BrowserRouter>
            <App/>   
        </BrowserRouter>);

        const clothesPage = screen.getByRole('link',{name: 'Clothes'});

        await user.click(clothesPage);  

        const {container} = render(<Clothes/>);

        expect(container).toMatchSnapshot();
       
    }) 

    it('It should navigate to cart when the Cart button is clicked', async() => {
        const user = userEvent.setup(); 
       
        

        render(<BrowserRouter>
            <App/>
        </BrowserRouter>)

        const CartButton = screen.getByText(/cart/i);

        await user.click(CartButton);

        const {container} = render(<Cart/>);

        expect(container).toMatchSnapshot();


    })
})
