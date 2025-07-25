import React, { useState } from 'react';
import '../Administrator/Admin.css';

function RolesAndPermission() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const rolesData = [
        { id: 1, role: 'Admin', date: '2025-07-20', status: 'Active' },
        { id: 2, role: 'Manager', date: '2025-06-15', status: 'Inactive' },
        { id: 3, role: 'User', date: '2025-05-10', status: 'Active' },
    ];

    const handlePermissionClick = (role) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRole(null);
    };

    return (
        <div className='role-page'>
            <div className='role-containers'>
                <div className='role-header'>
                    <h2>Roles</h2>
                    <div className='admin-search-container'>
                        <input type='text' className='search' placeholder='Search Roles' />
                    </div>
                    <button className='btn-export'>Export</button>
                    <button className='btn-addRole'>Add Role</button>
                </div>

                <div className='role-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Role</th>
                                <th>Create Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolesData.map((role, index) => (
                                <tr key={role.id}>
                                    <td>{index + 1}</td>
                                    <td>{role.role}</td>
                                    <td>{role.date}</td>
                                    <td>{role.status}</td>
                                    <td>
                                        <button className='btn-action'>Edit</button>
                                        <button className='btn-action'>Delete</button>
                                        <button className='btn-action' onClick={() => handlePermissionClick(role)}>Permission</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className='modal-overlay'>
                        <div className='modal'>
                            <h3>Permissions for: {selectedRole?.role}</h3>
                            <p>Modal content for permissions goes here...</p>
                            <button className='btn-close' onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RolesAndPermission;
