// pages/example.tsx or app/example/page.tsx
"use client"; // Add this if you're using the App Router

import { useSession } from "next-auth/react";

export default function ExamplePage() {
    const { data: session } = useSession();

    // Log whenever session changes
    console.log("Current user:", {
        role: session?.user?.role,
        id: session?.user?.id
    });

    return (
        <div>
            <h1>Example Page</h1>
            {/* Optional: Display the values */}
            <p>Role: {session?.user?.role}</p>
            <p>ID: {session?.user?.id}</p>
        </div>
    );
}