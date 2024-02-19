import {FaTrashAlt}from 'react-icons/fa'

const LineItem=({item,handleCheck,handleDelete})=>{

    return (
        <li key={item.id}>
        <input
            type="checkbox"
            checked = {item.checked}
            onChange={()=>handleCheck(item.id)}
            />
            <label
                onDoubleClick={()=>handleCheck(item.id)}
                style={(item.checked)?{textDecoration:'line-through'}:null}
            >{item.item}</label>
            <FaTrashAlt onClick={()=>handleDelete(item.id)} role = "button" 
            aria-label={`Delete ${item.item}`}
            tabIndex="0"/>
    </li>
    )
}

export default LineItem