import React from 'react'
import orderdetails from "@/tempData/orderdetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
function orderdetail() {
  return (
    <div>
      <div className='w-[78%] bg-white h-[700px] m-auto mt-5 pt-8' style={{ borderRadius: '20px', fontWeight: 'bold' }}>
        <div className='w-[90%]  h-[150px] m-auto'>
          <h1 className='text-xl '>User Name</h1>
          <h3 className='text-xl '>E-mail</h3>
          <h3 className='text-xl '>Phone</h3>
          <h2 className='text-xl '>Address</h2>
        </div>
        <div
          className='w-[90%] flex  h-[360px] m-auto mt-5  gap-[20px]'

        >
          <div className='w-[38%]  h-[370px] m-auto '
            style={{ borderRight: '5px solid rgb(12, 53, 106)' }}>
            {orderdetails.map(ele => (
              <div className='text-xl mb-6'>
                <h1>Product name (Product Description)</h1>
                <pre>Category  {ele.productName} </pre>
              </div >
            ))}


          </div>
          <div className='w-[35%]  h-[360px]' style={{ borderRight: '5px solid rgb(12, 53, 106)' }}>
            <div style={{ justifyContent: 'space-around' }}
              className='w-[100%] flex  h-[30px] m-auto gap-[10px] text-xl'

            >
              <h2>Product Cost</h2>
              <h2>Qty :</h2>
              <h2>Total</h2>
            </div>
            {orderdetails.map(ele => (
              <div
                className='w-[100%] flex  h-[30px] m-auto gap-[10px] text-xl '
                style={{ justifyContent: 'space-around', marginTop: '20px', color: 'blue' }}>
                <h2 style={{ color: '#1C82AD' }}>{ele.productCost}</h2>
                <h2 style={{ marginLeft: '80px', color: '#1C82AD' }}>{ele.quantity}</h2>
                <h2 style={{ color: '#1C82AD' }}>{ele.price}</h2>
              </div>
            ))}
          </div>
          <div
            className='w-[35%]  h-[360px] pl-[20px]'
          >
            <div style={{ marginBottom: "20px" }}
              className='w-[35%]  text-xl flex'
            >
              <pre> <h1>On the way :   <FontAwesomeIcon icon={faCheck}
                className='bg-green-600 text-white  rounded-full'
              /></h1>
              </pre>
            </div >
            <div className='mb-5 text-20'>
              <h1>Delivered :</h1>

            </div>
            <div className='mb-5 text-20'>
              <h1>Canceled :</h1>

            </div>
            <div className='mb-5 text-20'>
              <h1>Returned :</h1>

            </div>

          </div>
        </div>

        <div
          className='w-[90%] h-auto m-auto mt-4'
          
        >
          <div
            className='w-[30%] flex  h-auto m-auto text-xl   gap-[20px]'
            style={{ justifyContent: 'space-around' }}>
            <h3>Payment Status : <span className='text-[#03C988]'>Successful</span></h3>
          </div>
        </div>

        <div
          className='w-[90%]   h-[85px] m-auto  '
         
        >
          <div
            className='w-[40%]  m-auto flex gap-20 mt-6 '
           >
            <button

              className="w-[190px] h-[30px] bg-blue-700 text-white rounded-md text-20 ">Invoice</button>
            <button className="w-[200px] h-[30px] bg-blue-700 text-white rounded-md text-20">Profile</button>
            <button className="w-[170px] h-[30px] bg-blue-700 text-white rounded-md text-20">Track</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default orderdetail