import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from "react"
import AddItem from './AddItem'
import Search  from './Search'
import apiRequest from './apiRequest';


function App() {
  const API_URL ='http://localhost:3500/items';


  const [items, setItem] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError,setFetchError] =useState(null)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    // console.log('updating items state')
    //localStorage.setItem('shoppinglist',JSON.stringify(items))
    const fetchItems = async()=>{
      try{
        const response = await fetch(API_URL)
        if(!response.ok)throw Error('Dis not received expected data')
        const listItems = await response.json()
        console.log(listItems)
        setItem(listItems)
        setFetchError(null)
      }catch(err){
        console.log(err.stack)
        setFetchError(err.message);
      }finally{
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      (async()=>await fetchItems())()

    },2000)


  },[])//run when the dependency state changes

  

  const addItem = async(item)=>{
    const id= items.length?items[items.length-1].id+1:1
    const myNewItem = {id,checked:false,item}
    const listItems = [...items,myNewItem]
    setItem(listItems)
    const postOptions = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions);
    if(result) setFetchError(result)

  }
  const handleCheck =  async(id)=>{
    const listItems = items.map((item)=>item.id===id?{...item,checked:!item.checked}:item)
    setItem(listItems)
    const myItem = listItems.filter((item) =>item.id===id)
    const updateOptions = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,updateOptions)
    if(result) setFetchError(result)

  }

  const handleDelete =async(id)=>{
    const listItems = items.filter((item)=>item.id!==id)
    setItem(listItems)
    const deleteOption = {method:'DELETE'}
    const reqUrl =  `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOption)
    if(result) setFetchError(result)
  }

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!newItem) return;
  addItem(newItem)
  setNewItem("")
  console.log("submitted")
}
  return (
    <div>
      <Header title = "GroceryList"/>
      <Search search={search}
              setSearch = {setSearch}
        />


     <AddItem newItem = {newItem}
              setNewItem = {setNewItem}
              handleSubmit={handleSubmit}/>
              <main>
                {isLoading && <p>Loading Items...</p>}
                {fetchError && <p style={{color:"red"}}>{`Error:${fetchError}`}</p>}
              {!fetchError && !isLoading&& <Content items = {items.filter(item=>(item.item).toLowerCase()).includes(search.toLowerCase())}
                setItem = {setItem}
                handleCheck={handleCheck}
                handleDelete = {handleDelete}
              />}
              </main>
     
      <Footer length={items.length} />
    </div>
  );
}

export default App;
