import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function ViewUser() {
	const { id } = useParams();
	const [data, setData] = useState([])
	const [passwordVisible, setPasswordVisible] = useState(false)

	useEffect(() => {
		axios.get('http://localhost:8082/read/' + id)
			.then(res => {
				setData(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div className='d-flex vh-100 justify-content-center align-items-center'>
			<div className='col-md-6 col-sm-12 bg-white rounded p-3'>
				<form >
					<h2>User Details</h2>
					{

						data.map((item, i) => (


							<div key={i}>
								<div className='mb-2'>
									<label htmlFor='name'>Name</label>
									<input type='text' placeholder='Enter Name' className='form-control' id='name' value={item.Name} disabled readOnly />
								</div>

								<div className='mb-2'>
									<label htmlFor='email'>Email</label>
									<input type='email' placeholder='Enter Email' className='form-control' id='email' value={item.Email} disabled readOnly />
								</div>
								<div className='mb-2'>
									<label htmlFor='password'>Password</label>
									<div className="input-group">
										<input type={passwordVisible ? 'text' : 'password'} placeholder='Enter password' className='form-control' id='password' value={item.Password} disabled readOnly />
										<button className="btn btn-secondary" type="button" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? 'Hide' : 'show'}</button>
									</div>
								</div>
								<div className='mb-2'>
									<label htmlFor='dob'>Date of Birth</label>
									<input type='date' placeholder='Enter dob' className='form-control' id='dob' value={item.DOB} disabled readOnly />
								</div>
							</div>



						))
					}

					<Link to='/' className='btn btn-primary mt-3' > Back </Link>

				</form>
			</div>
		</div>
	)
}

export default ViewUser