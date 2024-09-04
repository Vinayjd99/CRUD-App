import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AllUser from './components/AllUser';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import ViewUser from './components/ViewUser';

function App() {

	return (
		<div className='bg'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AllUser />} ></Route>
					<Route path='/create' element={<CreateUser />} ></Route>
					<Route path='/update/:id' element={<UpdateUser />} ></Route>
					<Route path='/read/:id' element={<ViewUser />} ></Route>
				</Routes>
			</BrowserRouter>
			<span style={{ position: 'fixed', bottom: '10px' }}> &copy; Created by Vinay Jadhav</span>
		</div>

	)
}

export default App
