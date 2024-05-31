import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar bg-body-tertiary">
                <img className='nav-icon' src="/assets/images/bow.png" alt="" />
                <div className='headline'>
                    <h2>disco-Hunter</h2>
                    <p>Chase your discount!</p>
                </div>
                <div className="dropdown-container">
                    <img id='burger' src="/assets/images/burger-black-50kb.png" alt="menu" />
                    
                        <div className="dropdown-menu">
                            <Link to="/">Home</Link>
                            <Link to="/about">About the shop</Link>
                            <Link to="/legal">Legal Notice</Link>
                        </div>
                  
                </div>
            </nav>
        );
    }
}

export default Navbar;
