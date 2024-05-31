import React, { Component } from 'react';
import Navbar from "./components/navbar";
import About from './components/about';
import Legal from './components/legal';
import "bootstrap/dist/css/bootstrap.min.css";
import Product from './components/product';
import ShoppingCart from './components/shopping-cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


class App extends Component {
    state = {
        items: [],
        discountProduct: null,
        displayCart: false, // New state to manage the display of ShoppingCart
    }

    // Lifecycle method that runs after the component is mounted
    componentDidMount() {
        this.startDiscountCycle();
        window.addEventListener('resize', this.handleResize);
        this.handleResize(); // Check initial window size
    }

    // Lifecycle method that runs before the component is unmounted
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    // Handles window resize events
    handleResize = () => {
        if (window.innerWidth > 420) {
            this.setState({ displayCart: false });
        }
    }

    // Starts a cycle to apply a random discount at random intervals
    startDiscountCycle = () => {
        setInterval(() => {
            this.applyRandomDiscount();
        }, Math.random() * (4000 - 2000) + 2000);
    }

    // Applies a random discount to a product
    applyRandomDiscount = () => {
        const products = ["apples", "tomatos", "cherries", "strawberries", "salad", "spinach", "herbs"];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        this.setState({ discountProduct: randomProduct });

        // Reset the discount after 2 seconds
        setTimeout(() => {
            this.setState({ discountProduct: null });
        }, 2000);
    }

    // Rounds a number to two decimal places
    roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    }

    // Adds an item to the cart
    addItem = (name, amount, price, isDiscounted) => {
        price = this.roundToTwoDecimals(price); // Round the price to two decimal places
        console.log(name, amount, price, isDiscounted);
        let currentItems = [...this.state.items];
        let existingItem = currentItems.find(item => item.name === name && item.isDiscounted === isDiscounted);
        if (existingItem) {
            existingItem.amount++;
        } else {
            currentItems.push({
                name: name,
                amount: amount,
                price: price,
                isDiscounted: isDiscounted
            });
        }
        // Set state with updated items
        this.setState({ items: currentItems });
    }

    // Resets the cart by clearing all items
    resetCart = () => {
        this.setState({ items: [] });
    }

    // Toggles the display of the shopping cart
    toggleDisplay = () => {
        if (window.innerWidth <= 560) {
            this.setState(prevState => ({ displayCart: !prevState.displayCart }));
        }
    }

    render() {
        const discount = 0.90; // 10% discount
        // Array of product data
        const productData = [
            { title: "apples", price: 0.99, img: "apples.jpeg", text: "buy these yummy apples" },
            { title: "tomatos", price: 1.99, img: "tomatos.jpeg", text: "buy these yummy tomatos" },
            { title: "cherries", price: 2.99, img: "cherries.jpeg", text: "buy these yummy cherries" },
            { title: "strawberries", price: 4.99, img: "strawberries.jpeg", text: "buy these yummy strawberries" },
            { title: "salad", price: 1.99, img: "salad.jpeg", text: "buy this yummy salad" },
            { title: "spinach", price: 0.99, img: "spinach.jpeg", text: "buy this yummy spinach" },
            { title: "herbs", price: 3.99, img: "herbs.jpeg", text: "buy this mix of yummy herbs" },
            { title: "lemons", price: 3.99, img: "lemons.jpeg", text: "buy this yummy lemons" },
            { title: "oranges", price: 3.99, img: "oranges.jpeg", text: "buy this yummy herbs" },
            { title: "carrots", price: 3.99, img: "carrots.jpeg", text: "buy this yummy carrots" },
            { title: "broccoli", price: 3.99, img: "broccoli.jpeg", text: "buy this yummy broccoli" },
            { title: "cauliflower", price: 3.99, img: "cauliflower.jpeg", text: "buy this yummy cauliflower" },
        ];

        return (
            <Router>
                <div className='main-frame'>
                    <Navbar className='navbar' />
                    <div className='shop-frame'>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <div className="toggle-btn" onClick={this.toggleDisplay}>
                                        toggle-btn
                                    </div>
                                    <div className='prod-frame'>
                                        {productData.map(product => (
                                            <Product
                                                key={product.title}
                                                title={product.title}
                                                onAdd={() => this.addItem(
                                                    product.title,
                                                    1,
                                                    this.state.discountProduct === product.title ? product.price * discount : product.price,
                                                    this.state.discountProduct === product.title
                                                )}
                                                img={product.img}
                                                text={product.text}
                                                price={product.price}
                                                discount={this.state.discountProduct === product.title}
                                            />
                                        ))}
                                    </div>
                                    {(window.innerWidth > 560 || this.state.displayCart) && (
                                        <ShoppingCart items={this.state.items} onAdd={this.addItem} onReset={this.resetCart} />
                                    )}
                                </>
                            } />
                            <Route path="/about" element={<About />} />
                            <Route path="/legal" element={<Legal />} />
                        </Routes>
                    </div>
                    <div className="footer">
                    &copy; Lars Mensching
                    <img src="/assets/images/favicon-left-62kb.png" alt="menu" />
                    
                    </div>
                </div>
            </Router>
        );

    }
}

export default App;
