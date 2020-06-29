import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateLogEntry, getLogEntryById } from './API'

const UpdateLogEntryForm = ({ id, onClose }) => {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [logEntry, setLogEntry] = useState({})
  const [error, setError] = useState('')
  
  const getEntry = async () => {
    const entry = await getLogEntryById(id)
    setLogEntry(entry)
  }
  useEffect(() => {
    getEntry()
  }, [])

  const onChange = event => {
    setLogEntry({...logEntry, [event.target.name]: event.target.value})
  }

  const onSubmit = () => {
    try {
      setLoading(true)
      updateLogEntry(id, logEntry)
      onClose()
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  return (
    <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className='error'>{error}</h3> : null}
      <label htmlFor='title'>Title</label>
      <input name='title' value={logEntry.title}  onChange={onChange} required ref={register} />
      <label htmlFor='latitude'>Latitude</label>
      <input name='latitude' type='number' value={logEntry.latitude}  onChange={onChange} required ref={register} />
      <label htmlFor='longitude'>Longitude</label>
      <input name='longitude' type='number' value={logEntry.longitude}  onChange={onChange} required ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' rows={3} value={logEntry.comments}  onChange={onChange} ref={register} ></textarea>
      <label htmlFor='description'>Description</label>
      <textarea name='description' row={3} value={logEntry.description} onChange={onChange} ref={register} ></textarea>
      <label htmlFor='image'>Image</label>
      <input name='image' onChange={onChange} ref={register} />
      <label htmlFor='visitDate' >Visit Date</label>
      <input name='visitDate' type='date' value={logEntry.visitDate}  onChange={onChange} ref={register} />
      <button disabled={loading} >{loading ? 'Loading...' : 'Update'}</button>
    </form>
  )
}

export default UpdateLogEntryForm