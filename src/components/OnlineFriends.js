import { useCollection } from '../hooks/useCollection'

// components
import Friend from './Friend'

// styles
import './OnlineFriends.css'

export default function OnlineFriends() {

    const { documents, error } = useCollection('friends')
    
    return (
        <div className="friends-list">
            <h2>All Friends</h2>
            {error && <div className="error">{error}</div>}
            {documents && documents.map(friend => (
                <div key={friend.id} className="friends-list-item">
                    {friend.online && <span className="online-friend"></span>}
                    <span>{friend.displayName}</span>
                    <Friend src={friend.photoURL} />
                </div>
            )) }
        </div>
    )
}
