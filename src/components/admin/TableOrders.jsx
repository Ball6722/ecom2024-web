import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";


const TableOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    hdlGetOrders(token);
  }, []);
  const hdlGetOrders = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("Update Status Success!!!");
        hdlGetOrders(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return 'bg-gray-200'
        break;
      case "Processing":
        return 'bg-blue-200'
        break;
      case "Completed":
        return 'bg-green-200'
        break;
      case "Cancelled":
        return 'bg-red-200'
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <div className="container mx-auto p-4 bg-white shadow-md">
        <div>
          <table className="border w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>ลำดับ</th>
                <th>ชื่อผู้ใช้</th>
                <th>วันที่</th>
                <th>สินค้า</th>
                <th>รวม</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item, index) => (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderBy.email}</p>
                    <p>{item.orderBy.address}</p>
                  </td>
                  <td>{dateFormat(item.createdAt)}</td>
                  <td className="px-2 py-4">
                    {item.products.map((product, index) => (
                      <li key={index}>
                        {product.product.title} {"  "}
                        <span className="text-sm">
                          {numberFormat(product.price)} x {product.count}
                        </span>
                      </li>
                    ))}
                  </td>
                  <td>{numberFormat(item.cartTotal)}</td>
                  <td>
                    <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableOrders;
