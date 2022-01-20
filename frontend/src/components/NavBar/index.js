import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavBarElements'

const Navbar = () => {
  return (
    <>
      <Nav>
          <Bars/>
          <NavMenu>
            <NavLink to="/" activestyle>
                <img src={require('../../images/home.png')} alt='home'/>
                STRONA GŁÓWNA
            </NavLink>
            <NavLink to="/profile" activestyle="true">
                <img src={require('../../images/person.png')} alt='profile'/>
                PROFIL
            </NavLink>
            <NavLink to="/search" activestyle="true">
                <img src={require('../../images/search.png')} alt='search'/>
                SZUKAJ TRASY
            </NavLink>
             <NavLink to="/stretch" activestyle="true">
                 <img src={require('../../images/path.png')} alt='paths'/>
                ODCINKI
            </NavLink>
          </NavMenu>
          <NavBtn>
                <img src={require('../../images/logout.png')} alt='home'/>
              <NavBtnLink to="/logout">wyloguj</NavBtnLink>
          </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar;
