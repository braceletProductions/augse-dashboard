import React from 'react'
import orderdetails from "@/tempData/orderdetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
function orderdetail() {
  return (
    <div>
        <div style={{width:'80%',backgroundColor:'white',height:'700px',margin:'auto',marginTop:'25px',borderRadius:'20px',paddingTop:'30px',fontWeight:'bold'}}>
         <div style={{width:'90%',height:'150px',margin:'auto'}}>
             <h1 style={{fontSize:"20px",color:'#191A19'}}>User Name</h1>
             <h3 style={{fontSize:"20px"}}>E-mail</h3>
             <h3 style={{fontSize:"20px"}}>Phone</h3>
             <h2 style={{fontSize:"20px"}}>Address</h2>
         </div>
         <div style={{width:'90%',height:'360px',margin:'auto',marginTop:'20px',display:'flex',gap:'20px'}}>
             <div style={{width:'35%',height:'360px',borderRight:'5px solid rgb(12, 53, 106)'}}>
             {orderdetails.map(ele => (
                 <div style={{marginBottom:"20px",fontSize:"20px"}}>
                 <h1>Product name (Product Description)</h1>
                   <pre>Category  {ele.productName} </pre>
                 </div >
                ))}
              

             </div>
             <div style={{width:'35%',height:'360px',borderRight:'5px solid rgb(12, 53, 106)'}}>
                 <div style={{width:'100%',display:'flex',height:'30px',margin:'auto',gap:'10px',justifyContent:'space-around',fontSize:"20px"}}>
                  <h2>Product Cost</h2>
                  <h2>Qty :</h2>
                  <h2>Total</h2>
                 </div>
                 {orderdetails.map(ele => (
                 <div style={{width:'100%',display:'flex',height:'30px',margin:'auto',gap:'10px',justifyContent:'space-around',fontSize:"20px",marginTop:'20px',color:'blue'}}>
                  <h2 style={{color:'#1C82AD'}}>{ele.productCost}</h2>
                  <h2 style={{marginLeft:'80px',color:'#1C82AD'}}>{ele.quantity}</h2>
                  <h2 style={{color:'#1C82AD'}}>{ele.price}</h2>
                 </div>
                    ))}
             </div>
             <div style={{width:'35%',height:'360px',paddingLeft:'20px'}}>
             <div style={{marginBottom:"20px",fontSize:"20px"}}>
                 <h1>On the way :   <FontAwesomeIcon icon={faCheck} style={{backgroundColor:'#4E9F3D',color:"white",padding:"5px",borderRadius:'50%'}} /></h1>
                  
                 </div >
                 <div style={{marginBottom:"20px",fontSize:"20px"}}>
                 <h1>Delivered :</h1>
                 
                 </div>
                 <div style={{marginBottom:"20px",fontSize:"20px"}}>
                 <h1>Canceled :</h1>
                  
                 </div>
                 <div style={{marginBottom:"20px",fontSize:"20px"}}>
                 <h1>Returned :</h1>
                  
                 </div>

             </div>
         </div>

         <div style={{width:'90%',height:'auto',margin:'auto'}}>
         <div style={{width:'30%',margin:'auto',display:'flex',gap:'20px',justifyContent:'space-around',fontSize:'20px'}}>
           <h3>Payment Status : <span style={{color:'#03C988'}}>Successful</span></h3>
         </div>
         </div>

         <div style={{width:'90%',height:'90px',margin:'auto',marginTop:'20px'}}>
         <div style={{width:'30%',height:'40px',margin:'auto',marginTop:'25px',display:'flex',gap:'20px',justifyContent:'space-around'}}>
            <button style={{width:'100px',height:'35px',backgroundColor:'rgb(12, 53, 106)',color:"white",borderRadius:"2px",fontSize:'20px'}}>Invoice</button> 
            <button style={{width:'100px',height:'35px',backgroundColor:'rgb(12, 53, 106)',color:"white",borderRadius:"2px",fontSize:'20px'}}>Profile</button> 
            <button style={{width:'100px',height:'35px',backgroundColor:'rgb(12, 53, 106)',color:"white",borderRadius:"2px",fontSize:'20px'}}>Track</button> 
         </div>
         </div>
        </div>
    </div>
  )
}

export default orderdetail