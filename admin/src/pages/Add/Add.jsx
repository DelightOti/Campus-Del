import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets' // ✅ Make sure this import exists!
import axios from "axios"
import {toast} from "react-toastify";

const Add = ({url}) => {

    const [image,setImage]=useState(false)
    //whenever reload webpage first option is salad -- make mine burger
    const [data,setData] = useState({
      name:"",
      description:"",
      price:"",
      category:"Burgers"
    })

    const OnChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

      const onSubmitHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/food/add`,formData);
        if (response.data.success){
          setData({
            name:"",
            description:"",
            price:"",
            category:"Burgers"
          })
          setImage(false)
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      }
    

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        
        {/* Image Upload */}
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="Upload preview" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={OnChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={OnChangeHandler} value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        {/* Category and Price */}
        <div className="add-category-price">
          
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={OnChangeHandler} name="category" required>
              <option value="">Select category</option>
              <option value="Burgers">Burgers</option>
              <option value="Pasta">Pasta</option>
              <option value="Pizza">Pizza</option>
              <option value="Wraps">Wraps</option>
              <option value="Desserts">Desserts</option>
              <option value="Food Bowls">Food Bowls</option>
              <option value="Healthy Eats">Healthy Eats</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={OnChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">ADD</button>

      </form>
    </div>
  )
}

export default Add
