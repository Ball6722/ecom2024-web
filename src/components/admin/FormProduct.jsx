import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";


const initailState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};
const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const products = useEcomStore((state) => state.products);
  const getProducts = useEcomStore((state) => state.getProducts);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProducts(20);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await createProduct(form, token);
      toast.success(`เพิ่ม ${resp.data.title} สำเร็จ`);
      setForm(initailState);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("จะลบจริงๆ หรอครับ")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("ลบสินค้าสำเร็จ!!!");
        getProducts();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>เพิ่มข้อมูลสินค้า</h1>
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

        <button className="bg-blue-500 p-2 rounded-md shadow-md
        hover:scale-105 hover:-translate-y-1 hover:duration-200">เพิ่มข้อมูลสินค้า</button>
      </form>
      <br />
      <hr />
      <br />
      <table className="table w-full border">
        <thead className="bg-gray-200 border">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">ภาพสินค้า</th>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ราคา</th>
            <th scope="col">จำนวน</th>
            <th scope="col">จำนวยที่ขาย</th>
            <th scope="col">วันที่อัพเดท</th>
            <th scope="col">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <th>
                {item.images.length > 0 ? (
                  <img
                    className="w-24 h-24 rounded-lg shadow-md"
                    src={item.images[0].url}
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-md bg-gray-500 flex 
                  items-center justify-center shadow-md"
                  >
                    No Image
                  </div>
                )}
              </th>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{numberFormat(item.price)}</td>
              <td>{item.quantity}</td>
              <td>{item.sold}</td>
              <td>{dateFormat(item.updatedAt)}</td>
              <td>
                <div className="flex items-center justify-center">
                  <p className="bg-yellow-500 mr-2 p-1 hover:scale-105 hover:-translate-y-1 hover:duration-200">
                    <Link to={"/admin/product/" + item.id}>
                      <Pencil />
                    </Link>
                  </p>
                  <p
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 p-1 hover:scale-105 hover:-translate-y-1 hover:duration-200"
                  >
                    <Trash />
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;
