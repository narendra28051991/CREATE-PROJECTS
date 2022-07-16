import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState('')
    const [error, setError] = useState(null)

    // real time data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            }
            else {
                setError('no such document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('failed to get the document')
        })

        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}