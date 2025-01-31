"use client"
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as Form from '@radix-ui/react-form'
import * as Label from '@radix-ui/react-label'

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
        } catch {
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
        <div className="flex items-center justify-center min-h-screen bg-brand-white-100 dark:bg-brand-black-1000">
            <Form.Root className="relative max-w-md p-4 border border-brand-black-500 dark:border-brand-white-500 rounded-lg shadow-md bg-brand-white-500 dark:bg-brand-black-500">
                <Form.Field name="code">
                    <div className="flex flex-col gap-2">
                        <Label.Root className="mb-4 text-center text-brand-black-500 dark:text-brand-white-500 text-lg font-medium">
                            Please enter verification code
                        </Label.Root>
                        <div className="flex justify-between gap-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <motion.div
                                    key={index}
                                    className="w-12 h-12 border border-brand-black-100 dark:border-brand-white-100 rounded-md flex items-center justify-center text-xl text-brand-black-500 dark:text-brand-white-500 bg-brand-white-100 dark:bg-brand-black-100"
                                    animate={{ scale: code[index] ? [1, 1.05, 1] : 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {code[index] || ''}
                                </motion.div>
                            ))}
                        </div>
                        <Form.Control asChild>
                            <input
                                ref={inputRef}
                                type="text"
                                value={code}
                                onChange={handleChange}
                                maxLength={6}
                                className="absolute opacity-0 w-full h-12 text-center text-brand-black-500 dark:text-brand-white-500 text-xl border border-brand-black-100 dark:border-brand-white-100 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                                aria-label="Verification code input"
                            />
                        </Form.Control>
                        {error && (
                            <Form.Message className="text-center text-brand-blue-500 dark:text-brand-blue-100 mt-4">
                                {error}
                            </Form.Message>
                        )}
                    </div>
                </Form.Field>
            </Form.Root>
        </div>
    );
};

export default Auth;