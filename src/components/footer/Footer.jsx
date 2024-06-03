import React from 'react'
import styles from "./footer.module.css";
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div>
                ©2024 Man. All rights reserved.
            </div>
            <div className={styles.socials}>
                <Image
                    src='/1.png'
                    width={15}
                    height={15}
                    alt='mandev Facebook'
                    className={styles.icon}
                />
                <Image
                    src='/2.png'
                    width={15}
                    height={15}
                    alt='mandev Instragram'
                    className={styles.icon}
                />
                <Image
                    src='/3.png'
                    width={15}
                    height={15}
                    alt='mandev Twitter'
                    className={styles.icon}
                />
                <Image
                    src='/4.png'
                    width={15}
                    height={15}
                    alt='mandev Youtube'
                    className={styles.icon}
                />
            </div>
        </div>
    )
}

export default Footer