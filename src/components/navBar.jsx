import React from 'react'
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar navbar-light" style={{ background: "#e3f2fd" }}>
            <div className="container-fluid">
                <nav className="nav">
                    <Link to="/" className="nav-link" style={{ padding: '0.5rem 1rem 0.5rem 0' }}>Главная</Link>
                    <Link to="/login" className="nav-link">Логин</Link>
                    <Link to="/users" className="nav-link">Пользователи</Link>
                </nav>
            </div>
        </nav>
    )
}
export default NavBar