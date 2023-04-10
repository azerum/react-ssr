import React from 'react'
import { Greetings, type GreetingsProps } from './Greetings'
import './App.css'
import dog from './cat.jpg'
import { Routes, Route, Link } from 'react-router-dom'

export interface AppProps extends GreetingsProps {}

export function App({ name }: AppProps) {
    return (
        <div>
            <Routes>
                <Route path='/a' element={<p>A</p>}></Route>
                <Route path='/b' element={<Link to="/a">B, go to A</Link>}></Route>
                <Route path='*' element={<Greetings name={name} />}></Route>
            </Routes>
            
            <img src={dog} alt="Dog"></img>
        </div>
    )
}
