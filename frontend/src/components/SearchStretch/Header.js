import React from 'react';
import PropTypes from 'prop-types';

function Header({title}) {
  return (
  <section className='header__container'>
      <h1>{title}</h1>
  </section>
  );
}

Header.propTypes = {};

export default Header;
