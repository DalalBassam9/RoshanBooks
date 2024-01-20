import type { Metadata } from 'next'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Box from "@mui/material/Box";
import { Inter } from 'next/font/google'
import '../../globals.css'



export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                </Box>
            </Box>
        </div>
    )
}

