import axios from "axios"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import UseApi from "../../Hooks/UseApi"


export default function Categoryslider() {
let{data}= UseApi("Categories")
  return (
    <div className=" my-5">
        <Slider slidesToShow={6} infinite autoplay speed={300} slidesToScroll={6}>
        {data?.data?.data?.map((category)=>{
            return (
              <div key={category._id}>
                <img src={category.image} className="h-48 w-full object-cover object-top" alt="" />
                <h5 className="text-center">{category.name}</h5>
                </div>
            );
        })}
       


        </Slider></div>
  )
}
