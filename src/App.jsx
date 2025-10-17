import '@fortawesome/fontawesome-free/css/all.min.css';
import React, {useState, useEffect} from "react";
import './App.css'
import ProductForm from "./Components/ProductForm";
import ProductTable from "./Components/ProductTable";

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
      <h1 className="title">
        <i className="fa-utility fa-semibold fa-house" style={{ marginRight: "10px", color: "#23359cff" }}></i>
        Quản Lý Sản Phẩm
      </h1>

      <ProductForm
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                qty={qty}
                setQty={setQty}
                code={code}
                setCode={setCode}
                image={image}
                setImage={setImage}
                addProduct={addProduct}
                updatedProduct={updatedProduct}
                editIndex={editIndex}
            />

            <ProductTable
                products={products}
                editProduct={editProduct}
                deleteProduct={deleteProduct}
            />
        </div>
    );
}

export default ProductManager;
