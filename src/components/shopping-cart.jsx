import React, { Component } from 'react';

class ShoppingCart extends Component {
    state = {
        showOverlay: false
    }

    calculateTotal = () => {
        return this.props.items.reduce((total, item) => {
            return total + (item.amount * item.price);
        }, 0).toFixed(2); // To get the total with two decimal places
    }

    handleBuy = () => {
        this.setState({ showOverlay: true });
    }

    handleReset = () => {
        this.props.onReset();
    }

    closeOverlay = () => {
        this.setState({ showOverlay: false });
    }

    handleCloseAndReset = () => {
        this.closeOverlay();
        this.handleReset();
    }

    render() {
        return (
            <div className='cart'>
                <h3>Shopping Cart</h3>
                {this.props.items.map((item, index) => (
                    <div key={index} className='basket-prods'>
                        {item.amount} x {item.name} for {item.price} $ {item.isDiscounted && "(Discounted)"}
                    </div>
                ))}
                <div className='total-frame'>
                    <b> Total: {this.calculateTotal()} $ </b>
                    <div>
                        <button className="btn cart-btn green" onClick={this.handleBuy}>buy</button>
                        <button className="btn cart-btn red" onClick={this.handleReset}>reset</button>
                    </div>
                </div>
                {this.state.showOverlay && (
                    <div className='overlay'>
                        <div className='overlay-content'>
                            <h2>Thanks for buying:</h2>
                            {this.props.items.map((item, index) => (
                                <div key={index}>
                                    {item.amount} x {item.name} for {item.price} $ {item.isDiscounted && "(Discounted)"}
                                </div>
                            ))}
                            <b> Total: {this.calculateTotal()} $ </b>
                            <button className="btn cart-btn red" onClick={this.handleCloseAndReset}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ShoppingCart;
