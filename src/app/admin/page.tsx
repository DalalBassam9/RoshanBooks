"use client";
import useAuth from "../lib/useAuth";
export default function home() {

    const { user, isLoading } = useAuth({ middleware: 'auth' })

    return (
        <div className="bgcolor">
        </div>
    )
}

