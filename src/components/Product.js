import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter"

const Max_Rating = 5;
const Min_Rating = 1;

const Product = ({id,title,price,description,category,image,rating}) => {
    const [starRating,setStarRating ]=useState(
        Math.floor(Math.random()*(Max_Rating-Min_Rating + 1))+Min_Rating
    );
    const [hasPrime,setHasPrime]=useState(Math.random() < 0.5);
    return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
        <Image src={image}
        height={200}
        width={200}
        objectFit="contain"/>
        <h4 className="my-3">{title}</h4>


        <div className="flex">
            {Array(starRating).fill().map((_,i)=>(
                <StarIcon className="h-5 text-yellow-500 "/>
            ))}
        </div>
        <div className="text-xs my-2 line-clamp-2">{description}</div>

        <div className="mb-5">
            <Currency quantity={price}/>
        </div>

        {true && (
            <div className="flex items-center space-x-2 -mt-5">
                <img className="w-12" src="https://links.papareact.com/fdw" alt=""/>
                <p className="text-xs text-gray-500">Free Next-day Delivery</p>
            </div>
        )}
        <button className="mt-auto button">Add to Basket</button>

    </div>
    );
}
 
export default Product;