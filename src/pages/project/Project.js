import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

// styles
import './Project.css'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

export default function Project() {

  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if (error) {
    return <p className="error">{error}</p>
  }

  if (!document) {
    return <p className="loading">loading...</p>
  }

  return (
    <div className="project-details">
      <ProjectSummary project = {document} />
      <ProjectComments project = {document} />
    </div>
  )
}
