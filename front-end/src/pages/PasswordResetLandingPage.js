import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';
import { useQueryParams } from "../util/useQueryParams";


export const PasswordResetLandingPage = () => {
    const [isSuccess,setIsSuccess] = useState(false);
    const [isFailure,setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue,setConfirmPasswordValue] = useState('');
    const [passwordResetCode,setPasswordResetCode] = useState('');
    const { email } = useQueryParams();

    const onResetClicked = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { email, newPassword: passwordValue });
            setIsSuccess(true);
        } catch (e) {
            setIsFailure(true);
        }
    }

    if (isFailure) return <PasswordResetFail />
    if (isSuccess) return <PasswordResetSuccess />

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <input
                value={passwordResetCode}
                onChange={e => setPasswordResetCode(e.target.value)}
                placeholder="Password Reset Code"
            />
            <p>Please enter a new password</p>
            <input
                type='password'
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="Password"
            />
            <input
                type='password'
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                placeholder="Confirm Password"
            />
            <button 
                disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
                onClick={onResetClicked}
                >
                Reset Password
            </button>
        </div>
    )

}