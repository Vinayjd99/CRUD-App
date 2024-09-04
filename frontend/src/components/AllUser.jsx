import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AllUser() {

    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8082/')
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [])

    //handleDelete function will run on click of delete button
    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8082/delete/' + id);
            window.location.reload()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='col col-md-8 col-sm-12 bg-white rounded p-3'>
                <h2 className='text-center text-decoration-underline'>User Management</h2>
                <Link to="/create" className='btn btn-success mb-3'>Add user</Link>
                {user.length > 0 ?
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.Name}</td>
                                            <td>{data.Email}</td>
                                            <td>
                                                <div className='custom-flex'>
                                                    <Link to={`read/${data.Id}`} className='btn btn-primary'>View</Link>
                                                    <Link to={`update/${data.Id}`} className='btn btn-primary ms-2'>Update</Link>
                                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.Id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> : <div className='text-center'>No records available!! <br /> Insert new user to display records.</div>

                }
            </div>
        </div>
    )
}

export default AllUser