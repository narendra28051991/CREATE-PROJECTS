// styles
import './Friend.css'

export default function Friend({ src }) {
  return (
    <div className="friend">
      <img src={src} alt="User Details" />
    </div>
  )
}
