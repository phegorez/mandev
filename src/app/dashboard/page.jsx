'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const DashboardPage = () => {

    const session = useSession()
    const router = useRouter()

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user?.name}`, fetcher)

    if (session.status === 'loading') {
        return <p>Loading...</p>;
    }
    if (session.status === 'unauthenticated') {
        router?.push('/dashboard/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const title = e.target[0].value
        const desc = e.target[1].value
        const imageUrl = e.target[2].value
        const content = e.target[3].value

        try {
            await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    desc,
                    imageUrl,
                    content, 
                    username: session.data.user.name
                })
            });
            mutate()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            mutate()
        } catch (err) {
            console.log(err);
        }
    }

    if (session.status === 'authenticated') {
        return <div className={styles.container}>
            <div className={styles.posts}>
                {isLoading ? 'loading' : data?.map(post => (
                    <div className={styles.post} key={post._id}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={post.imageUrl}
                                alt='post img'
                                fill={true}
                                className={styles.img}
                            />
                        </div>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <span onClick={() => handleDelete(post._id)} className={styles.delete}>X</span>
                    </div>
                ))}
            </div>
            <form className={styles.new} onSubmit={handleSubmit}>
                <h1>Add new Post</h1>
                <input type="text" placeholder='Title' className={styles.input} />
                <input type="text" placeholder='Desc' className={styles.input} />
                <input type="text" placeholder='Image' className={styles.input} />
                <textarea className={styles.textArea} placeholder='content'></textarea>
                <button className={styles.button}>
                    Send
                </button>
            </form>
        </div>
    }

}

export default DashboardPage