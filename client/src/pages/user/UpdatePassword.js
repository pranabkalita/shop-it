import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Metadata from '../../components/layout/Metadata'

import { updatePassword, clearError } from './../../store/actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../store/constants/userConstants'

function UpdatePassword({ history }) {
  const dispatch = useDispatch()
  const alert = useAlert()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { error, isUpdated, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }

    if (isUpdated) {
      alert.success('Password updated successfully !')
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })

      history.push('/me')
    }
  }, [dispatch, alert, error, history, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('oldPassword', oldPassword)
    formData.set('password', password)
    formData.set('confirmPassword', confirmPassword)

    dispatch(updatePassword(formData))
  }

  return (
    <Fragment>
      <Metadata title='Change Password' />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mt-2 mb-5'>Update Password</h1>
            <div className='form-group'>
              <label htmlFor='old_password_field'>Old Password</label>
              <input
                type='password'
                id='old_password_field'
                className='form-control'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='new_password_field'>New Password</label>
              <input
                type='password'
                id='new_password_field'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='new_password_confirmation_field'>
                Confirm Password
              </label>
              <input
                type='password'
                id='new_password_confirmation_field'
                className='form-control'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='btn update-btn btn-block mt-4 mb-3'
              disabled={loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdatePassword
