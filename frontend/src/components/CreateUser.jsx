import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [dob, setdob] = useState('')

	const [errorMessage, setErrorMessage] = useState('')
	const [passwordVisible, setPasswordVisible] = useState(false)

	const [isValid, setIsValid] = useState(false)
	const [errorMessagepswd, setErrorMessagePswd] = useState('')

	//function to validation Date of birth
	const validateDate = (inputDate) => {
		const currentDate = new Date()
		const selectedDate = new Date(inputDate)

		if (selectedDate > currentDate) {
			setErrorMessage('Date of birth cannot be future date.')
		} else {
			setErrorMessage('')
		}
	};

	//regex pattern to validate password
	const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

	//function to validate password
	const validateInput = (value) => {
		if (regexPattern.test(value)) {
			setIsValid(true);
			setErrorMessagePswd('');
		} else {
			setIsValid(false);
			setErrorMessagePswd('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character @$!%*#?&');
		}
	};

	const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault();
		axios.post('http://localhost:8082/create', { name, email, password, dob })
			.then(res => {
				navigate('/')
			})
			.catch(err => console.log(err));
	}


	return (
		<div className='d-flex vh-100 justify-content-center align-items-center'>
			<div className='col-md-6 col-sm-12 bg-white rounded p-3'>
				<form onSubmit={handleSubmit}>
					<h2>Add User</h2>
					<div className='mb-2'>
						<label htmlFor='name'>Name</label>
						<input type='text' placeholder='Enter Name' className='form-control' id='name' value={name} onChange={e => setName(e.target.value.replace(/\s/g, ''))} required />
					</div>

					<div className='mb-2'>
						<label htmlFor='email'>Email</label>
						<input type='email' placeholder='Enter Email' className='form-control' id='email' value={email} onChange={e => setEmail(e.target.value.replace(/\s/g, ''))} required />
					</div>


					<div className='mb-2'>
						<label htmlFor='password'>Password</label>
						<div className="input-group">
							<input type={passwordVisible ? 'text' : 'password'} placeholder='Enter password' className='form-control' id='password' value={password} onChange={e => { setPassword(e.target.value); validateInput(e.target.value); }} required />
							<button className="btn btn-secondary" type="button" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? 'Hide' : 'show'}</button>
						</div>
						{errorMessagepswd && <p style={{ color: 'red' }}>{errorMessagepswd}</p>}
						{isValid && <p style={{ color: 'green' }}>Strong Password!</p>}
					</div>



					<div className='mb-2'>
						<label htmlFor='dob'>Date of Birth</label>
						<input type='date' placeholder='Enter dob' className='form-control' id='dob' value={dob} onChange={e => { setdob(e.target.value); validateDate(e.target.value); }} required />
					</div>

					{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

					<button className={errorMessage ? 'btn btn-success mt-3 disabled' : 'btn btn-success  mt-3'} >Submit</button>
					<Link to='/' className='btn btn-primary ms-2  mt-3' > Back </Link>

				</form>
			</div>
		</div>
	)
}

export default CreateUser