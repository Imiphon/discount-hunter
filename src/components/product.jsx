import React, { Component } from 'react';

class Product extends Component {
    state = {}

    roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    }

    render() {
        const price = this.props.discount ? this.roundToTwoDecimals(this.props.price * 0.90) : this.props.price;
        return (
            <div className="card" onClick={() => this.props.onAdd(this.props.title, 1, price, this.props.discount)}>
                {this.props.discount && <div className="discount-overlay">Discount!</div>}
                <img src={process.env.PUBLIC_URL + "/assets/images/" + this.props.img} className="card-img-top" alt={this.props.title} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.text} for <span className="product-price">${price.toFixed(2)}</span></p>
                    
                </div>
            </div>
        );
    }
}

export default Product;