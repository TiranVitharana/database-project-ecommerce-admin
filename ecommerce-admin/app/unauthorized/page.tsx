"use client"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleRedirect = () => {
        if (session?.user.role === "Delivery Person") {
            router.replace("/dashboard/delivery");
        } else if (session?.user.role === "Inventory Manager") {
            router.replace("/dashboard/inventory");
        } else {
            router.replace("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-lg text-center">
                <div className="mb-4">
                    <Lock className="w-16 h-16 mx-auto text-red-600 animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700 mb-6">You are not authorized to access this page.</p>
                <button
                    onClick={handleRedirect}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
}