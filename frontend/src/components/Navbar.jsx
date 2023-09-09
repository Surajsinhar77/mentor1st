import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className='border flex bg-slate-400 items-center justify-around rounded-lg m-4'>
                <div className="logo">
                    <h1>LOGO</h1>
                </div>
                
                <div className="linkItems items-center">
                    <ul className='flex p-3'>
                        <li className='px-3'><Link to="/"> Home</Link></li>
                        <li className='px-3'><Link to="/about"> About</Link></li>
                        <li className='px-3'><Link to="/contact"> Contact</Link></li>
                        <li className='px-3'><Link to="/service"> Service</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;