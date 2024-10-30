"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRoleBasedRedirect = (role: string) => {
        switch (role) {
            case 'Admin':
                router.push('/dashboard');
                break;
            case 'Delivery Person':
                router.push('/dashboard/delivery');
                break;
            case 'Inventory Manager':
                router.push('/dashboard/inventory');
                break;
            default:
                router.push('/dashboard');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        // Add a slight delay to show the animation
        setTimeout(async () => {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setLoading(false);
                setError(result.error);
            } else {
                // Fetch the user's role after successful authentication
                try {
                    const response = await fetch('/api/auth/session');
                    const session = await response.json();

                    if (session?.user.role) {
                        handleRoleBasedRedirect(session.user.role);
                    } else {
                        // Fallback to default dashboard if role is not available
                        router.push('/dashboard');
                    }
                } catch (error) {
                    setError("Error fetching user role");
                } finally {
                    setLoading(false);
                }
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 bg-backgroundSoft rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-text mb-6 text-center">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-textSoft mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-text bg-background border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-textSoft mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-text bg-background border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 ${
                            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold rounded focus:outline-none focus:ring focus:ring-blue-500`}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>

            {/* Popup Modal for Loading */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <p className="text-lg font-semibold mb-4">Signing you in...</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full animate-pulse"
                                style={{ width: '75%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}