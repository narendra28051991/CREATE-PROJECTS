import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { timestamp } from '../../firebase/config'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// options
import Select from 'react-select'

// styles
import './Create.css'

export default function Create() {

  const { documents } = useCollection('friends')
  const [friends, setFriends] = useState([])
  const { user } = useAuthContext()
  const { response, addDocument } = useFirestore('projects')
  const navigate = useNavigate()

  const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
  ]

  useEffect(() => {
    if (documents) {
      const options = documents.map(friend => {
        return { value: friend, label: friend.displayName }
      })
      setFriends(options)
    }
  }, [documents])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!categories) {
      setFormError('Please select a Project Category')
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to atleast 1 user')
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((selectedFriend) => {
      return {
        displayName: selectedFriend.value.displayName,
        photoURL: selectedFriend.value.photoURL,
        id: selectedFriend.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }
    await addDocument(project)
    if (!response.error) {
      navigate("/")
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>

        <label>
          <span>Project due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={friends}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
