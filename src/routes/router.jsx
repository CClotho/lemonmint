import { createBrowserRouter, Navigate} from "react-router-dom";
import App from "../App";
import { Jewelry } from "../components/Jewelry";
import { Clothes } from "../components/Clothes";
import { Cart } from "../components/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <div> 404 Not Found</div>,
            children:[
                {path:"/", element: <Navigate to="/clothes" />},
                {path:"/checkout", element: <Cart/>},
                {path:"/clothes", element: <Clothes/>},
                {path:"/jewelry", element:<Jewelry/>},
               

        ],
        
    }
    
])