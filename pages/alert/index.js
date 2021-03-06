import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import axios from 'axios'
import _ from 'lodash'

const { publicRuntimeConfig } = getConfig()
const {
  SERVER_URL,
} = publicRuntimeConfig

const AlertIndexPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({ line_access_token: '', line_user_id: '', mobileNo: '' })
  const [count, setCount] = useState({ countAll: 0, countAlert: 0, countNotAlert: 0 })

  // for create alert
  const [conditions, setConditions] = useState([])
  const [products, setProducts] = useState([])
  const [condition, setCondition] = useState('')
  const [productId, setProductId] = useState('')
  const [note, setNote] = useState('')
  const [price, setPrice] = useState('')
  const [updatedPriceTime, setUpdatedPriceTime] = useState('')

  // for list alert
  const [alerts, setAlerts] = useState([])

  // for sms credit
  const [smsCredit, setSmsCredit] = useState(0)

  // for all products price
  const [productPrices, setProductPrices] = useState([])

  const checkError = useCallback(error => {
    if (!error.response || error.response.data.name === 'TOKEN_INVALID_ERROR') {
      router.push('/')
    }
  }, [])

  async function getUser() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/users/`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setUser(response.data)
    } catch (e) {
      checkError(e)
    }
  }

  async function getCount() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/alerts/count_alert/`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setCount(response.data)
    } catch (e) {
      checkError(e)
    }
  }

  async function getConditions() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/alerts/conditions/`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setConditions(response.data)
    } catch (e) {
      checkError(e)
    }
  }

  async function getProducts() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/products/`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setProducts(response.data)
    } catch (e) {
      checkError(e)
    }
  }

  async function getAlerts() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/alerts/`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setAlerts(response.data)
    } catch (e) {
      checkError(e)
    }
  }

  async function getUpdatedPriceTime() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/products/updated_price_time`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setUpdatedPriceTime(response.data.updatedPriceTime)
    } catch (e) {
      checkError(e)
    }
  }

  async function getProductPrice(productId) {
    try {
      const response = await axios.get(
        `${SERVER_URL}/products/price?productId=${productId}`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })

      setPrice(Number(response.data.price).toFixed(3))
    } catch (e) {
      checkError(e)
    }
  }

  async function getSmsCredit() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/alerts/sms_credit`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setSmsCredit(response.data.credit)
    } catch (e) {
      checkError(e)
    }
  }

  async function getProductPrices() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/products/prices`
        , {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setProductPrices(response.data)
    } catch (e) {
      checkError(e)
    }
  }

  useEffect(async () => {
    await Promise.all([
      getUser(),
      getCount(),
      getConditions(),
      getProducts(),
      getAlerts(),
      getUpdatedPriceTime(),
      getSmsCredit(),
      getProductPrices(),
    ])
  }, [])

  useEffect(() => {
    setInterval(() => Promise.all([
      getProductPrices(),
      getUpdatedPriceTime(),
    ]), 2000)
  }, [])

  function ProductPrice(product) {
    const { product: productNameWithBroker, price } = product[1]
    const productName = productNameWithBroker.split(':')
    return(
      <div key={productNameWithBroker} className='border product-price'>
        <div className='row justify-content-center mt-2'>
          {productName[productName.length - 1]}
        </div>
        <div className='row justify-content-center mb-2'>
          {Number(price).toFixed(3)}
        </div>
        <style jsx>{`
          .product-price {
            font-size: 16px;
            width: 180px;
          }
      `}</style>
      </div>
    )
  }

  function ShowPrices() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3 border'>
        <div className='row justify-content-center updated-time'>
          Updated price at {updatedPriceTime}
        </div>
        <div className='row flex-row flex-nowrap overflow-auto mt-2 product-prices'>
          {Object.entries(productPrices).map(ProductPrice)}
        </div>
        <style jsx>{`
          .updated-time {
            font-size: 16px;
          }
          .product-prices {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .product-prices::-webkit-scrollbar {
            display: none;
          }
      `}</style>
      </div>
    )
  }

  function Statistic() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3'>
        <div className='col-4 p-2 border'>
          <div className='row justify-content-center label-alert'>
            All Alert
          </div>
          <div className='row justify-content-center label-alert-count'>
            {count.countAll}
          </div>
        </div>
        <div className='col-4 p-2 border'>
          <div className='row justify-content-center label-alert'>
            Alerted
          </div>
          <div className='row justify-content-center label-alert-count'>
            {count.countAlert}
          </div>
        </div>
        <div className='col-4 p-2 border'>
          <div className='row justify-content-center label-alert'>
            Sms
          </div>
          <div className='row justify-content-center label-alert-count'>
            {smsCredit || 0}
          </div>
        </div>
        <style jsx>{`
          .label-alert {
            font-size: 20px;
          }
          .label-alert-count {
            font-size: 18px;
          }
      `}</style>
      </div>
    )
  }

  // function onLineIdChange(e) {
  //   setUser(state => ({ ...state, line_user_id: e.target.value }))
  // }
  //
  // function onLineAccessTokenChange(e) {
  //   setUser(state => ({ ...state, line_access_token: e.target.value }))
  // }

  function onMobileNoChange(e) {
    setUser(state => ({ ...state, mobileNo: e.target.value }))
  }

  async function onSubmitSetUser() {
    try {
      const response = await axios.patch(
        `${SERVER_URL}/users/`,
        {
          // line_access_token: user.line_access_token,
          // line_user_id: user.line_user_id,
          mobileNo: user.mobileNo,
        }, {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      setUser(response.data)
      router.reload()
    } catch (error) {
      checkError(error)
    }
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
            {/*<div className='col-12 col-md-6 my-1'>*/}
            {/*  <input type='text' className='form-control' placeholder='Line User Id' value={user.line_user_id} onChange={onLineIdChange} />*/}
            {/*</div>*/}
            {/*<div className='col-12 col-md-6 my-1'>*/}
            {/*  <input type='text' className='form-control' placeholder='Line Access Token' value={user.line_access_token} onChange={onLineAccessTokenChange} />*/}
            {/*</div>*/}
            <div className='col-12 my-1'>
              <input type='text' className='form-control' placeholder='mobile no' value={user.mobileNo} onChange={onMobileNoChange} />
            </div>
          </div>
          <div className='mt-1 mt-md-2 d-grid gap-2'>
            <button type='button' className='btn btn-outline-primary' onClick={onSubmitSetUser}>Submit</button>
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

  function GenerateProductOptions(data) {
    return <option key={data._id} value={data._id}>{data.name}</option>
  }

  function GenerateConditionOptions(data) {
    return <option key={data.id} value={data.value}>{data.symbol}</option>
  }

  async function onProductChange(e) {
    setProductId(e.target.value)
    await getProductPrice(e.target.value)
  }

  function onConditionChange(e) {
    setCondition(e.target.value)
  }

  function onPriceChange(e) {
    setPrice(e.target.value)
  }

  function onNoteChange(e) {
    setNote(e.target.value)
  }

  async function onSubmitAlert() {
    try {
      if (!price || !condition || !productId) {
        return
      }
      await axios.post(
        `${SERVER_URL}/alerts`,
        {
          price,
          condition,
          note,
          productId,
        }, {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
      router.reload()
    } catch (error) {
      checkError(error)
    }
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
              <select className='form-select options-text' onChange={onProductChange} >
                <option value='DEFAULT'>Choose Product</option>
                {products.map(GenerateProductOptions)}
              </select>
            </div>
            <div className='col-12 col-md-4 my-1'>
              <select className='form-select options-text' onChange={onConditionChange} >
                <option value='DEFAULT'>Choose Operation</option>
                {conditions.map(GenerateConditionOptions)}
              </select>
            </div>
            <div className='col-12 col-md-4 my-1'>
              <input type='text' className='form-control' placeholder='product price' onChange={onPriceChange} value={price} />
            </div>
            <div className='my-1' style={{ width: '100%' }}>
              <textarea className='form-control' style={{ resize: 'none' }} placeholder='Note' onChange={onNoteChange} value={note} rows='3' />
            </div>
          </div>
          <div className='mt-1 mt-md-2 d-grid gap-2'>
            {
              user.mobileNo
                ? <button type='button' className='btn btn-outline-primary' onClick={onSubmitAlert} >Submit</button>
                : <button type='button' className='btn btn-outline-primary' onClick={onSubmitAlert} disabled>Submit</button>
            }
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

  function onDeleteAlert(id) {
    return async () => {
      try {
        await axios.delete(
          `${SERVER_URL}/alerts/${id}`,
          {
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
        router.reload()
      } catch (error) {
        checkError(error)
      }
    }
  }

  function GenListAlert(data) {
    return (
        <>
          <div key={data.id + '1'} className='input-group'>
            <h3 className='alert-container border border-primary form-control'>{`${data.productName} ${data.condition} ${data.price}`}</h3>
            <button className='btn btn-outline-danger alert-container' type='button' onClick={onDeleteAlert(data.id)}>x</button>
            <style jsx>
              {`
                .alert-container {
                  height: 80%;
                }
              `}
            </style>
          </div>
          {
            data.note
                ? <div key={data.id + '2'}>
                    <h3 className='alert-container border border-primary form-control alert-message'>{`Note: ${data.note}`}</h3>
                  <style jsx>
                    {`
                      .alert-message {
                        word-wrap: break-word;
                        margin-top: -9px;
                      }
                  ` }
                  </style>
                  </div>
                : ''
          }
        </>
    )
  }

  function ListAlert() {
    return (
      <div className='row justify-content-center p-2 m-1 mt-3'>
        <div className='row justify-content-start label-list mb-1'>
          List Alert
        </div>
        <div className='overflow-auto container-list-alert'>
          {_.sortBy(alerts, ['productName', 'price']).map(GenListAlert)}
        </div>
        <style jsx>{`
          .label-list {
            font-size: 30px;
          }
          .container-list-alert {
            height: 500px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .container-list-alert::-webkit-scrollbar {
            display: none;
          }
      `}</style>
      </div>
    )
  }

  return (
    <div className='container'>
      {ShowPrices()}
      <hr/>
      {Statistic()}
      {SetUser()}
      {CreateAlert()}
      {ListAlert()}
    </div>
  )
}

export default AlertIndexPage
