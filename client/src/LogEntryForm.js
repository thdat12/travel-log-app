import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createLogEntry } from './API'

const LogEntryForm = ({ location, onClose, method }) => {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  console.log(method)
  const onSubmit = (data) => {
    try {
      setLoading(true)
      data.latitude = location.latitude
      data.longitude = location.longitude
      createLogEntry(data)
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
      <input name='title' required ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' rows={3} ref={register} ></textarea>
      <label htmlFor='description'>Description</label>
      <textarea name='description' row={3} ref={register} ></textarea>
      <label htmlFor='image'>Image</label>
      <input name='image' ref={register} />
      <label htmlFor='visitDate' >Visit Date</label>
      <input name='visitDate' type='date' ref={register} />
      <button disabled={loading} >{loading ? 'Loading...' : 'Create'}</button>
    </form>
  )
}

export default LogEntryForm