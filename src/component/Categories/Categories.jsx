import UseApi from "../../Hooks/UseApi";


export default function Categories() {
  let{data,isloading}=UseApi("Categories")
if(isloading){
  return
}

  return<>
  
<div className="flex flex-wrap">

  {data?.data?.data?.map((category)=>{
    return (
      <div key={category._id} className="w-3/12">
        <img src={category.image} className="h-48 w-full object-cover object-top" alt="" />
        <h5 className="text-center">{category.name}</h5>
        </div>
    );
})}</div>
  
  
  
  
  </>
    
  
}
