import { useState, useEffect } from 'react'
import { projectFirestore, projectAuth, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        //sign up user

        try {
            // sign up
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            
            if (!res) {
                throw new Error("Could not complete the signup")
            }

            // upload user thumbnail
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgURL = await img.ref.getDownloadURL()

            // add display name to user
            await res.user.updateProfile({ displayName, photoURL: imgURL })

            // create a user document
            await projectFirestore.collection('friends').doc(res.user.uid).set(
                {
                    online: true,
                    displayName,
                    photoURL: imgURL
                }
            )

            // dispatch the login user
            dispatch({ type: 'LOGIN', payload: res.user })

            //update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)   
            }
        }

        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}