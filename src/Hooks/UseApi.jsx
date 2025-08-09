import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export default function UseApi(endpoint) {
    let req =useQuery({
        queryKey:{endpoint},
        queryFn:function(){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}`)
        }
    })
  return req;
}
