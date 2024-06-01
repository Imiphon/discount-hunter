import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {
        dropdownOpen: false
    }

    toggleDropdown = () => {
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    }

    closeDropdown = () => {
        this.setState({ dropdownOpen: false });
    }

    render() {
        return (
            <nav className="navbar bg-body-tertiary">
                <img className='nav-icon' src={process.env.PUBLIC_URL + "/assets/images/bow.png"} alt="icon" />
                <div className='headline'>
                    <h2>disco-Hunter</h2>
                    <p>Chase your discount!</p>
                </div>
                <div className="dropdown-container">
                    <img id='burger' src={process.env.PUBLIC_URL + "/assets/images/burger-black-50kb.png"} alt="menu" onClick={this.toggleDropdown} />
                    {this.state.dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/" onClick={this.closeDropdown}>Home</Link>
                            <Link to="/about" onClick={this.closeDropdown}>About the shop</Link>
                            <Link to="/legal" onClick={this.closeDropdown}>Legal Notice</Link>
                        </div>
                    )}
                </div>
            </nav>
        );
    }
}

export default Navbar;
