import React from "react";

function ProductTable({ products, editProduct, deleteProduct }) {
  return (
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
            <td>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  width="160"
                  height="140"
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
  );
}

export default ProductTable;
