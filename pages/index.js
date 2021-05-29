import React, { useState } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const {
  SERVER_URL,
} = publicRuntimeConfig

const IndexPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onUsernameChange(e) {
    setUsername(e.target.value)
  }

  function onPasswordChange(e) {
    setPassword(e.target.value)
  }

  async function onLogin() {
    try {
      const response = await axios.post(
        `${SERVER_URL}/users/login`,
        {
        username,
        password,
      }, {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })

      if (response.status === 200) {
        router.push('/alert')
      }
    } catch (error) {
      setError('Username or Password is incorrect')
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center p-3'>
        <div className='col-12 col-md-10 col-lg-8 col-xl-6 border border-2 rounded-3'>
          <div className='p-3'>
            <div className='error-text'>
              {error}
            </div>
            <div className='my-2'>
              <label htmlFor='form-username' className='form-label'>Username</label>
              <input type='text' className='form-control' id='form-username' value={username} onChange={onUsernameChange} />
            </div>
            <div className='my-2'>
              <label htmlFor='form-password' className='form-label'>Password</label>
              <input type='password' className='form-control' id='form-password' value={password} onChange={onPasswordChange} />
            </div>
            <div className='mt-4 mb-2 d-grid gap-2'>
              <button type='button' className='btn btn-outline-primary' onClick={onLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
          .error-text {
            color: red;
          }
      `}</style>
    </div>
  )
}

export default IndexPage
