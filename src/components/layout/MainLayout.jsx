import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Header from "./Header";
import Navbar from "./Navbar";
import './Layout.css';

export default function MainLayout()
{
    return (
        <TopBar />
        <Header />
        <Navbar />
        <main className='site-container main-page'>
            <Outlet />
        </main>
        <footer className='home-footer'>© 2026 VHDSTORE. All rights reserved.</footer>
    )
}