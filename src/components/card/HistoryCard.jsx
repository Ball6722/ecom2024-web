import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    hdlGetOrders(token);
  }, []);
  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>
      {/* คลุม table */}
      <div className="space-y-4">
        {/* Card Loop Order */}
        {orders?.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            {/* ทีมงาน header */}
            <div className="flex justify-between">
              <div>
                <p className="text-sm">Order Date</p>
                <p className="font-bold">{dateFormat(item.updatedAt)}</p>
              </div>
              <div>
              <p className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>{item.orderStatus}</p>
              </div>
            </div>
            {/* ทีมงาน table  Loop Product*/}

            <div>
              <table className="border w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th>สินค้า</th>
                    <th>ราคา</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {item.products?.map((products, index) => (
                    
                    <tr key={index}>
                      <td>{products.product.title}</td>
                      <td>{numberFormat(products.product.price)}</td>
                      <td>{products.count}</td>
                      <td>{numberFormat(products.product.price * products.count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ทีมงาน total */}
            <div>
              <div className="text-right">
                <p>ราคาสุทธิ</p>
                <p>{numberFormat(item.cartTotal)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;
