import { useState } from "react"
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectsList from '../../components/ProjectsList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {

  const [currentFilter, setCurrentFilter] = useState('all')
  const { documents, error } = useCollection('projects')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(file => {
          if (user.uid === file.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        return document.category === currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
      )}
      {projects && (
        <ProjectsList projects = {projects} />
      )}
    </div>
  )
}