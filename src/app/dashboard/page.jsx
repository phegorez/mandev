'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storage } from '../../../utils/filebase'

const DashboardPage = () => {

    const session = useSession()
    const router = useRouter()
    const [isUploadImage, setIsUploadImage] = useState(false);
    const [defaultImagePreview, setDefaultImagePreview] = useState('')


    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user?.name}`, fetcher)

    if (session.status === 'loading') {
        return <p>Loading...</p>;
    }
    if (session.status === 'unauthenticated') {
        router?.push('/dashboard/login')
    }

    const handleFileUpload = async (e) => {
        e.preventDefault()
        const file = e.target.files[0];

        if (file) {
            const userName = session.data.user.name

            //Set reference in Firebase
            const uploadRef = storageRef(
                storage,
                `users/${userName}/${file.name}`
            )
            //Find path
            const defaultPath = uploadRef._location.path
            const imageFloder = defaultPath.split('/')[1]

            //compare userId and imageFloder
            if (userName === imageFloder) {
                //Upload file
                const snapShot = await uploadBytes(uploadRef, file)

                //Get download file
                const downloadUrl = await getDownloadURL(snapShot.ref)
                setDefaultImagePreview(downloadUrl)
            } else {
                throw new Error(`You don't have permission to upload profile image`);
            }
        }
        setIsUploadImage(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const title = e.target[0].value
        const desc = e.target[1].value
        const imageUrl = defaultImagePreview
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
                {isUploadImage ? <Image alt='preview' src={defaultImagePreview} width={150} height={150} /> : <div>Please Upload image</div>}
                <input type="file" onChange={handleFileUpload} />
                <textarea className={styles.textArea} placeholder='content'></textarea>
                <button className={styles.button}>
                    Send
                </button>
            </form>
        </div>
    }

}

export default DashboardPage