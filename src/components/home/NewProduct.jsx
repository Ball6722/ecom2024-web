import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../../components/card/ProductCard";
import { SwiperSlide } from "swiper/react";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
const NewProduct = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    listProductBy("createdAt", "desc", 10)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <SwiperShowProduct>
      {data?.map((item, index) => (
        <SwiperSlide>
          <ProductCard item={item} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default NewProduct;
