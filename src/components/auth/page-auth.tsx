"use client"
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [code, setCode] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [serverKey, setServerKey] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchKey = async () => {
            try {
                const response = await fetch('/api/generate-key');
                const data = await response.json();
                setServerKey(data.key);
            } catch (err) {
                console.error('Error fetching key:', err);
            }
        };

        fetchKey();
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value);
            if (value.length === 6) {
                handleSubmit(value);
            }
        }
    };

    const handleSubmit = async (code: string) => {
        try {
            const response = await fetch('/api/verify-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, serverKey }),
            });
            const data = await response.json();
            if (data.authenticated) {
                setAuthenticated(true);
            } else {
                setError('Invalid code. Please try again.');
                setCode('');
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        } catch (err) {
            setError('Error verifying code. Please try again.');
            setCode('');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    if (authenticated) {
        return <>{children}</>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative max-w-md p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <h2 className="mb-4 text-center text-black">Please enter code</h2>
                <div className="flex justify-between gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <motion.div
                            key={index}
                            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center text-xl"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 0.2 }}
                        >
                            {code[index] || ''}
                        </motion.div>
                    ))}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={code}
                    onChange={handleChange}
                    maxLength={6}
                    className="absolute opacity-0 w-full h-12 text-center text-black text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
                {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Auth;