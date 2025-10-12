
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
     if(!name||!price) return alert("Hãy nhập đủ tên sản phẩm và giá!");
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
 <div className="container">
      <h1 className="title">Quản lý sản phẩm</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá tiền"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {editIndex === null ? (
          <button onClick={addProduct}>Thêm sản phẩm</button>
        ) : (
          <button onClick={updatedProduct}>Sửa sản phẩm</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} ₫</td>
              <td>
                <button className="edit" onClick={() => editProduct(index)}>
                  Sửa
                </button>
                <button className="delete" onClick={() => deleteProduct(index)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductManager;
