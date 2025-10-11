
import React, {useState, useEffect} from "react";
import './App.css'

function ProductManager() {
    const [products,setProducts]= useState([]);
    const [name, setName]=useState("");
    const [price,setPrice]= useState("");
    const [editIndex,setEditIndex]=useState(null);
useEffect(() => {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  setProducts(savedProducts);
}, []); 

    useEffect(()=>{
      localStorage.setItem("products",JSON.stringify(products));
    },[products]);
    const addProduct =()=> {
     if(!name||!price) return alert("Hãy nhập đủ  tên sản phẩm và giá!");
     const newProduct = {name,price:parseFloat(price)};
     setProducts([... products,newProduct]);
     setName("");
     setPrice("");
  };
const deleteProduct =(index)=>{
     const updated =[...products];
     updated.splice(index,1);
     setProducts(updated);
    };
  const editProduct = (index)=>{
    setEditIndex(index);
    setName(index);
    setPrice(index);
  };
  const updatedProduct =()=>{
    if(!name||!price) return alert("Hãy nhập đủ  tên sản phẩm và giá!");
    const updatedproducts =[...products];
    updatedproducts[editIndex]={
      name,
      price: parseFloat(price),
    }
    setProducts(updatedproducts);
    setEditIndex(null);
    setName("");
    setPrice("");
  };

  return (
    <>
    <div style={{textAlgin:"center"}}>
     <h2>Quản lý sản phẩm</h2>
     <input
     type="text"
     placeholder="Tển sản phẩm"
     value = {name}
     onChange ={(e) => setName(e.target.value)}
     />
     <input
     type= "number"
     placeholder= "Giá tiền"
     value= { price}
     onChange={(e)=>setPrice(e.target.value)}
     />
     {editIndex==null?(<button onClick ={addProduct}>Thêm sản phẩm</button>)
        : (<button onClick ={updatedProduct}>SỬa sản phẩm </button>)
      }
    <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.name} - {p.price}₫
            <button onClick={() => editProduct(index)}>Sửa</button>
            <button onClick={() => deleteProduct(index)}>Xóa</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}
export default ProductManager;
