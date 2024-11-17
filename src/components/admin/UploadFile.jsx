import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from 'lucide-react';

const UploadFile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);


  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; //emty array []
      for (let i = 0; i < files.length; i++) {
        //validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} บ่แม่นรูป`);
          continue;
        }

        //Image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(data, token)
              .then((res) => {
                console.log(res.data)
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images:allFiles
                })
                setIsLoading(false)
                toast.success("เพิ่มรูปภาพสำเร็จ!!!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          },
          "base64"
        );
      }
    }
  };
  const handleDelete = (public_id) =>{
    let allFiles = form.images.filter((item) => item.public_id !== public_id);
    setForm({
      ...form,
      images:allFiles
    })
    removeFiles(public_id, token)
    .then((res)=>{
      console.log(res)
      toast.success(res.data)
    }).catch((err)=>console.log(err))
  }

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
            isLoading &&   <Loader className="w-16 h-16 animate-spin" />
        }
       
        {
          form.images.map((item,index)=>
            <div key={index} className='relative'>
              <img className="w-24 h-24 hover:scale-105" src={item.url} />
              <span
              onClick={()=>handleDelete(item.public_id)} 
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-md">X</span>
            </div>
          )
        }
      </div>
      <div>
        <input
          className="border"
          type="file"
          name="images"
          multiple
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default UploadFile;
