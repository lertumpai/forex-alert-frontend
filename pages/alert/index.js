import React from 'react'

const AlertIndexPage = () => {
  function Statistic() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3'>
        <div className='col-6 p-2 border'>
          <div className='row justify-content-center label-alert'>
            All Alert
          </div>
          <div className='row justify-content-center label-alert-count'>
            100
          </div>
        </div>
        <div className='col-6 p-2 border'>
          <div className='row justify-content-center label-alert'>
            Alerted
          </div>
          <div className='row justify-content-center label-alert-count'>
            30
          </div>
        </div>
        <style jsx>{`
          .label-alert {
            font-size: 30px;
          }
          .label-alert-count {
            font-size: 30px;
          }
      `}</style>
      </div>
    )
  }

  function SetUser() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3'>
        <div className='m-1'>
          <div className='label-set-user'>
            Set User
            <button className='btn btn-outline-primary ms-3' type='button' data-bs-toggle='collapse' data-bs-target='#collapse-setup-user'
                    aria-expanded='false' aria-controls='collapseExample'>
              <i className="fa fa-angle-down" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className='collapse' id='collapse-setup-user'>
          <div className='input-group'>
            <div className='col-12 col-md-6 my-1'>
              <input type='text' className='form-control' placeholder='Line User Id' />
            </div>
            <div className='col-12 col-md-6 my-1'>
              <input type='text' className='form-control' placeholder='Line Access Token' />
            </div>
          </div>
          <div className='mt-1 mt-md-2 d-grid gap-2'>
            <button type='button' className='btn btn-outline-primary'>Submit</button>
          </div>
        </div>
        <style jsx>{`
          .label-set-user {
            font-size: 30px;
          }
          .label-alert-count {
            font-size: 30px;
          }
      `}</style>
      </div>
    )
  }

  function CreateAlert() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3'>
        <div className='m-1'>
          <div className='label-alert'>
            Add Alert
            <button className='btn btn-outline-primary ms-3' type='button' data-bs-toggle='collapse' data-bs-target='#collapse-alert'
                    aria-expanded='false' aria-controls='collapseExample'>
              <i className="fa fa-angle-down" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className='collapse' id='collapse-alert'>
          <div className='input-group'>
            <div className='col-12 col-md-4 my-1'>
              <select className='form-select options-text' >
                <option value='DEFAULT'>Choose Product</option>
                <option value='1'>Gold</option>
                <option value='2'>Nasda100</option>
                <option value='3'>BITCOIN</option>
              </select>
            </div>
            <div className='col-12 col-md-4 my-1'>
              <select className='form-select options-text' >
                <option value='DEFAULT'>Choose Operation</option>
                <option value='1'>{'>='}</option>
                <option value='2'>{'<='}</option>
              </select>
            </div>
            <div className='col-12 col-md-4 my-1'>
              <input type='text' className='form-control' placeholder='product price' />
            </div>
          </div>
          <div className='mt-1 mt-md-2 d-grid gap-2'>
            <button type='button' className='btn btn-outline-primary'>Submit</button>
          </div>
        </div>
        <style jsx>{`
          .options-text {
            font-size: 16px;
          }
          .label-alert {
            font-size: 30px;
          }
      `}</style>
      </div>
    )
  }

  function GenListAlert() {
    return (
      <div className='input-group my-1'>
        {/*<input type='text' className='form-control' placeholder='Message' disabled/>*/}
        <h3 className='alert-container border border-primary form-control'>a</h3>
        <button className='btn btn-outline-danger alert-container' type='button'>x</button>
        <style jsx>{`
          .alert-container {
            height: 90%;
          }
      `}</style>
      </div>
    )
  }

  function ListAlert() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3'>
        <div className='row justify-content-start label-list mb-1'>
          List Alert
        </div>
        {GenListAlert()}
        {GenListAlert()}
        {GenListAlert()}
        {GenListAlert()}
        <style jsx>{`
          .label-list {
            font-size: 30px;
          }
      `}</style>
      </div>
    )
  }

  return (
    <div className='container'>
      {Statistic()}
      {SetUser()}
      {CreateAlert()}
      {ListAlert()}
    </div>
  )
}

export default AlertIndexPage
