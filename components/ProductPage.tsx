"use client";
import { useProducts, useCreateProduct } from "@/hooks/queries/useProducts";
import { useState } from "react";

export default function ProductPage() {
  // 1. Lấy dữ liệu
  const { data: products, isLoading, isError } = useProducts();

  // 2. Hàm mutation
  const createProductMutation = useCreateProduct();

  const [name, setName] = useState("");

  const handleAdd = () => {
    createProductMutation.mutate(
      { name, price: 100 },
      {
        onSuccess: () => {
          alert("Thêm thành công!");
          setName("");
        },
        onError: (error) => {
          alert("Lỗi: " + error);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div>
      <h1>Product List</h1>

      {/* Form thêm mới */}
      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleAdd} disabled={createProductMutation.isPending}>
          {createProductMutation.isPending ? "Saving..." : "Add Product"}
        </button>
      </div>

      {/* Danh sách */}
      <ul>
        {products?.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
