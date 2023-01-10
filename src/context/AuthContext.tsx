import { useContext, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { createUser, signInUser, signOutUser, auth } from '../features/auth/Auth';
import { UserCredentials } from '../features/auth/types';

interface User {
    email: string | null;
    accessToken: string | null;
    uid: string;
}

interface AuthContextProps {
    currentUser: User;
    signUp: ({ email, password }: UserCredentials) => Promise<void>;
    login: ({ email, password }: UserCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => {
    return useContext(AuthContext);
};

interface Props {
    children?: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const signUp = async ({ email, password }: UserCredentials) => {
        await createUser({ email, password });
    };

    const login = async ({ email, password }: UserCredentials): Promise<void> => {
        await signInUser({ email, password });
    };

    const logout = async () => {
        await signOutUser();
        localStorage.removeItem('email');
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            setCurrentUser(user as any);
            localStorage.setItem('email', user.email ?? '');
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        login,
        logout,
    } as AuthContextProps;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
