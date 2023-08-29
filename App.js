import AppNavigation from "./components/AppNavigation";
import CartProvider from "./context/cartProvider";

export default function App() {
    return (
        <CartProvider>
            <AppNavigation />
        </CartProvider>
    );
}
