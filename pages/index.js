import React from 'react'

const IndexPage = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center p-3'>
        <div className='col-12 col-md-10 col-lg-8 col-xl-6 border border-2 rounded-3'>
          <div className='p-3'>
            <div className='my-2'>
              <label htmlFor='form-username' className='form-label'>Username</label>
              <input type='text' className='form-control' id='form-username' />
            </div>
            <div className='my-2'>
              <label htmlFor='form-password' className='form-label'>Password</label>
              <input type='password' className='form-control' id='form-password' />
            </div>
            <div className='mt-4 mb-2 d-grid gap-2'>
              <button type='button' className='btn btn-outline-primary'>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
