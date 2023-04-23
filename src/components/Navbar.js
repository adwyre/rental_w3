
import React, { useState, useEffect } from 'react';


function Navbar() {

  return (
    <nav className="nav-bar">
      <div className='nav-container'>
        <ul>
            <li>
              <a href="#">link</a>
            </li>
        </ul>
        <button type="button" className='nav-connect button primary'>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;