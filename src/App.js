import React,{useEffect, useState} from 'react';
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";


function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle]= useState("");
  const [newDiscription,setNewDescription] = useState("");
  const[CompletedTodos,setCompletedTodos] = useState([]);


  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDiscription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
  };


  const handleDeleteTodo = (index)=>{
    let reducedTodo =[...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }

  const handleCompleteTodo =(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completeOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      commpleteOn : completeOn,
    };

    let updatedCompletedArr = [...CompletedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify (updatedCompletedArr))
  }
  
  const handleDeleteCompletedTodo =(index)=>{
    let reducedTodo =[...CompletedTodos];
    reducedTodo.splice(index);

    localStorage.setItem('completeTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }


  useEffect(()=>{
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompletedTodo = JSON.parse(localStorage.getItem('CompletedTodo'));
    if(saveTodo){
      setTodos(saveTodo);
    }

    if(saveCompletedTodo){
      setCompletedTodos(saveCompletedTodo);
    }

  },[])

  return (
    <><div className="App">
      <h1>My Work List</h1>
    </div>
    <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className="todo-input-item">
            <label>Discription</label>
            <input type="text" value={newDiscription} onChange={(e)=> setNewDescription(e.target.value)} placeholder="What's the task discription?" />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primarybtn">Add</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondarybtn  ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondarybtn  ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
          {isCompleteScreen=== false && allTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
            <TiTick className='check-icon' onClick={()=>handleCompleteTodo(index)} title='Completed'/>

            </div>
          </div>  
            )
          })}

            {isCompleteScreen=== true && CompletedTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>completed on:</small></p>
            </div>
            <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?'/>

            </div>
          </div>  
            )
          })}   

        </div>
      </div></>
  );
}

export default App;
