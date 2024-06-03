import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '../../components/button/Button'

export const metadata = {
    title: "Man Dev Contact Information",
    description: "This is contact page",
};


const ContactPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Let's Keep in Touch</h1>
            <div className={styles.content}>
                <div className={styles.imgContainer}>
                    <Image
                        src='/contact.png'
                        alt='contact'
                        fill={true}
                        className={styles.image}
                    />
                </div>
                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder='name'
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder='email'
                        className={styles.input}
                    />
                    <textarea
                        className={styles.textArea}
                        placeholder='message'
                        cols='30'
                        rows='10'
                    />
                    <Button text='Send' url='#' />
                </form>
            </div>
        </div>
    )
}

export default ContactPage