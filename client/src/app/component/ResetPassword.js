import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVER_ENDPOINT } from '../../utils/constants';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setJwt, jwt } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const response = await fetch(`${SERVER_ENDPOINT}/api/v1/user/resetPassword/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        const parsedResponse = await response.json();
        const data = parsedResponse.data;
        setMessage(data.message);
        setJwt(token);
        navigate('/enable2FA');
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
