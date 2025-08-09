import React from 'react'
import UseApi from '../../Hooks/UseApi';

export default function Prands() {
     let{data,isloading}=UseApi("brands")
  if(isloading){
    return
  }
  
    return<>
    
  <div className="flex flex-wrap">
  
    {data?.data?.data?.map((brand)=>{
      return (
        <div key={brand._id} className="w-3/12">
          <img src={brand.image} className="h-48 w-full object-cover object-top" alt="" />
          <h5 className="text-center">{brand.name}</h5>
          </div>
      );
  })}</div>
    
    
    
    
    </>
}