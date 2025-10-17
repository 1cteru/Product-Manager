import React from "react";

function ProductForm({
  name, setName,
  price, setPrice,
  qty, setQty,
  code, setCode,
  setImage,
  addProduct, updatedProduct,
  editIndex
}) {
  return (
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
        type="number"
        placeholder="Số Lượng"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mã Sản Phẩm"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        placeholder="Ảnh sản phẩm"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
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
  );
}

export default ProductForm;
