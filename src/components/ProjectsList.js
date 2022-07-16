import { Link } from 'react-router-dom'

import Friend from './Friend'

// styles
import './ProjectsList.css'

export default function ProjectsList({projects}) {
  return (
    <div className="project-list">
        {projects.length === 0 && <p>No Projects yet!</p>}
        {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
                <p>Due by {project.dueDate.toDate().toDateString()}</p>
                <div className="assigned-to">
                    <ul>
                        {project.assignedUsersList.map((assignedFriend) => (
                            <li key={assignedFriend.photoURL}>
                                <Friend src={assignedFriend.photoURL} />
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        ))}
    </div>
  )
}
