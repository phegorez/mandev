'use client'

import Link from 'next/link'
import React from 'react'

import DarkModeToggle from '../darkmodeToggle/DarkModeToggle'

import { LINKS_MENU } from '../../constant/index'
import styles from "./navbar.module.css";
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {

    const session = useSession()

    return (
        <div className={styles.container}>
            <Link
                href='/'
                className={styles.logo}
            >
                Mandev
            </Link>
            <div className={styles.links}>
                <DarkModeToggle />
                {LINKS_MENU.map((link) => (
                    <Link className={styles.link} key={link.id} href={link.url}>{link.label}</Link>
                ))}

                {session.status === 'authenticated' && (
                    <button
                        onClick={signOut}
                        className={styles.logout}
                    >
                        Logout
                    </button>
                )}


            </div>
        </div>
    )
}

export default Navbar