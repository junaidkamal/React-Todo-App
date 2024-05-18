import React, { useEffect, useState } from 'react'
import { GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

const localdata=()=>{
  let list = localStorage.getItem("data");
  if (list) {
    return JSON.parse(localStorage.getItem("data"))
}
else {
  return [];
}
}

const App = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(localdata());
  const [togglebtn, settogglebtn] = useState(true)
  const[isedit, setIsEdit] = useState(null)

  const deleteall =() =>{
    setItem([]);
  }

  const deletedata=(id)=>{
    const updateitem = item.filter((val,index) =>{
     return val.id !==id 
    })
    setItem(updateitem)
  }

  const editdata =(id)=>{
    let newdata = item.find((elem)=>{
      return elem.id ===id
    })
    settogglebtn(false)
    setInput(newdata.name)
    setIsEdit(id)
  }

  const itemsadded = () =>{
    if(!input) {
      alert("Please enter a task")
    }
    else if(input && !togglebtn){
      setItem(item.map((elem) =>{
        if(elem.id === isedit){
          return {...elem,name:input}
        }
        return elem;
      }))
      settogglebtn(true)
      setInput('')
      setIsEdit(null)
    }
     else {
      const inputdata = {id:new Date().getTime().toString(),name:input}
       setItem([...item,inputdata]);
       setInput("");
    }
  }
  useEffect(()=> {
    localStorage.setItem("data", JSON.stringify(item));
  })
  return (
    <div className='bg-[#34ebe8] w-[100%] h-[100vh] flex flex-col justify-center items-center'>
      <div className='w-[400px] h-[60px] flex'>
      <input type="text"
      placeholder="Add a task"
      value={input}
      onChange={(e)=> setInput(e.target.value)}
      className='w-[300px] h-[60px] rounded-lg indent-6 font-bold text-xl' />
      {
        togglebtn ? <GrAdd className='bg-white mt-4 ml-[-2rem] text-[1.3rem]' onClick={itemsadded} />
         :    <AiFillEdit className='bg-white mt-4 ml-[-2rem]  ' onClick={itemsadded} />
      }
      </div>
      <div>
        {
          item.map((val)=>(
            <div className='text-white font-semibold bg-[#101298] w-[300px] h-[60px]
             mt-[2rem] ml-[-6rem] rounded-lg p-4 flex justify-between'>
            <h1>{val.name}</h1>
               <AiFillDelete onClick={()=>deletedata(val.id)}/>
              <AiFillEdit className='ml-[-10rem]' onClick={()=>editdata(val.id)} />
              </div>
          )
          )
        }
      </div>
      <div className='bg-[#f0690a] w-[200px] mt-3 ml-[-3.5rem] p-2 
      text-center font-extrabold rounded-full h-[40px]'>
        <button onClick={deleteall}
        >Delete All</button>
      </div>
    </div>
  )
}

export default App
