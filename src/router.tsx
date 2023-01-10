import { Navigate, Route, Routes } from 'react-router-dom';

import LoginForm from './features/login/LoginForm';
import SignUpForm from './features/signUp/SignUpForm';
import Dashboard from './features/dashboard';

export default function Router() {
    return (
        <Routes>
            <Route>
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Route>

            <Route path="/" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
