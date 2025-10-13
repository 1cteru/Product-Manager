
import React, {useState, useEffect} from "react";
import './App.css'

function ProductManager() {
    const [products,setProducts]= useState([]);
    const [name, setName]=useState("");
    const [price,setPrice]= useState("");
    const [editIndex,setEditIndex]=useState(null);
    const [qty,setQty]=useState("");
    const [code,setCode]=useState("");
    const [image,setImage]= useState("");
useEffect(() => {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  setProducts(savedProducts);
}, []); 

    useEffect(()=>{
      localStorage.setItem("products",JSON.stringify(products));
    },[products]);
    const addProduct =()=> {
     if(!name||!price||!qty||!code) return alert("Hãy nhập đầy đủ thông tin về sản phẩm");
     const newProduct = {name,qty,code,image,price :parseFloat(price)};
     setProducts([... products,newProduct]);
     setName("");
     setPrice("");
     setQty("");
     setCode("");
     setImage("");
  };
const deleteProduct =(index)=>{
     const updated =[...products];
     updated.splice(index,1);
     setProducts(updated);
    };
  const editProduct = (index)=>{
    const p = products[index];
    setEditIndex(index);
    setName(p.name);
    setPrice(p.price);
    setQty(p.qty);
    setCode(p.code);
    setImage(p.image);
    
  };
  const updatedProduct =()=>{
    if(!name||!price||!qty||!code) return alert("Hãy nhập đủ  tên sản phẩm và giá!");
    const updatedproducts =[...products];
    updatedproducts[editIndex]={
      name,
      price: parseFloat(price),
      qty,
      code,
      image,
    }
    setProducts(updatedproducts);
    setEditIndex(null);
    setName("");
    setPrice("");
    setQty("");
    setCode("");
    setImage("");
  };

  return (
 <div className="container">
      <h1 className="title">Quản Lý Sản Phẩm</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Tên Sản Phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá Tiền"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
        type= "number"
        placeholder="Số Lượng"
        value={qty}
        onChange={(e)=>setQty(e.target.value)}
        />
        <input
        type= "text"
        placeholder="Mã Sản Phẩm"
        value={code}
        onChange={(e)=>setCode(e.target.value)}
        />
        <input
        type="file"
        accept="image/*"
        placeholder="Ảnh sản phẩm"
        onChange={(e)=>{
          const file= e.target.files[0];
          if(file){
            const reader= new FileReader();
            reader.onloadend = ()=>{
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          } 
        }}
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
            <th>Số Lượng</th>
            <th>Mã Sản Phẩm</th>
            <th>Ảnh Sản Phẩm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} vn₫</td>
              <td>{p.qty}</td>
              <td>{p.code}</td>
              <td>{p.image &&(
                <img 
                   src= {p.image}
                   alt= {p.name}
                   width="160"
                   height = "140"
                   />
              )}
                </td>
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
