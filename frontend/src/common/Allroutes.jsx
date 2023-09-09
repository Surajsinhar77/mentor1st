import React from 'react'
import {Route, Routes } from 'react-router-dom';
import About from '../components/About';
import Contact from '../components/Contact';
import Home from '../components/Home';
import ServicePage from '../components/ServicePage'


function Allroutes() {
    return (
        <>
            <Routes>
                <Route exact path="/"  element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/service" element={<ServicePage/>} />
            </Routes>
        </>
    )
}


export default Allroutes