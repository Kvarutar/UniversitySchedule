import React from 'react';
import './header.css'

const Header = () => {
    return(
        <div className="header">
            <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" className="header__logo"></img>
            <div className="header__title">Расписание</div>
        </div>
    );
}

export default Header;