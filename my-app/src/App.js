import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from "react"
import AddItem from './AddItem'
import Search  from './Search'

function App() {


  const list = [
    {id:1,
    checked:false,
    item:"1"},
    {id:2,
        checked:false,
        item:"1"},
        {id:3,
            checked:false,
            item:"1"},
    ]
    const[items,setItems]=useState(JSON.parse(localStorage.getItem('shoppinglist')));

    const [newItem,setNewItem] = useState('')
    const [search,setSearch] = useState('')

    const addItem = (item)=>{
      const id = items.length?items[items.length-1].id+1:1
      const myNewItem = {id,checked:false,item};
      const listItems =[...items,myNewItem];
    }

    const setAndSaveItems = (newItem)=>{
      setItems(newItem);
        localStorage.setItem('shoppinglist',JSON.stringify(newItem))
    }

    const handleCheck = (id)=>{
        const listItems = items.map((item)=>item.id===id?{...item,checked:!item.checked}:item);
        setAndSaveItems(listItems)
    }
   
    const handleDelete = (id) =>{
        const listItems = items.filter((item)=>item.id!==id)
        setAndSaveItems(listItems)
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(!newItem) return;
      addItem(newItem)
      setNewItem("")
      console.log('submitted')
    }

  return (
    <div>
      <Header title="Grocery list"/>

      <AddItem newItem = {newItem}
               setNewItem={setNewItem}
               handleSubmit={handleSubmit} />
      <Search 
        search = {search}
        setSearch = {setSearch}
      />
      <Content items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
               handleCheck = {handleCheck}
               handleDelete = {handleDelete}
              />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
