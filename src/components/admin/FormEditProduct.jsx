import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, listProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useNavigate, useParams } from "react-router-dom";


const initailState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};
const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initailState);

  useEffect(() => {
    getCategory();
    fetchProduct(token,id,form)
  }, []);

  const fetchProduct = async(token, id, form) => {
    try {
        const res = await readProduct(token, id, form)
        console.log(res)
        setForm(res.data)
    } catch (err) {
        console.log('Err fetch data',err)
    }
  }

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await updateProduct(token, id, form);
      toast.success(`แก้ไข ${resp.data.title} สำเร็จ`);
      setForm(initailState)
      navigate('/admin/product')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>แก้ไขข้อมูลสินค้า</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border"
          type="text"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />

        <input
          className="border"
          type="text"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />

        <input
          className="border"
          type="number"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
        />

        <input
          className="border"
          type="number"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
        />

        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Upload File */}
        <UploadFile form={form} setForm={setForm} />

        <button className="bg-blue-500">แก้ไขข้อมูลสินค้า</button>
      </form>
      <br />
      <hr />
      <br />
    </div>
  );
};

export default FormEditProduct;