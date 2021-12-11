import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from './../slices/basketSlice';
import Product from './../components/Product';
import CheckoutProduct from "../components/CheckoutProduct";
import Currency  from 'react-currency-formatter';
import { useSession } from 'next-auth/react';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = () => {
    const items =useSelector(selectItems)
    const total =useSelector(selectTotal)
    const { data: session } = useSession()
    
    const createCheckoutSession=async()=>{
        const stripe=await stripePromise;
        // call the back end to create acheckout session...
        const checkoutSession=await axios.post('/api/create-checkout-session',
        {
            items:items,
            email:session.user.email
        })
    }


    return (
    <div className="bg-gray-100 ">
        <Header/>
        <main className="lg:flex max-w-screen-xl mx-auto">
            {/* left */}
            <div className="flex-grow m-5 shadow-sm">
                <Image
                src="https://links.papareact.com/ikj"
                width={1020}
                height={250}
                objectFit="contain"
                />
                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className="text-3xl border-b pd-4">{items.length===0?"Your Amazon Basket is empty.":"Your Shopping Basket"}</h1>
                    {items.map((item,i)=>(
                        <CheckoutProduct 
                        key={i} 
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        category={item.category}
                        starRating={item.starRating}
                        image={item.image}
                        hasPrime={item.hasPrime}
                        />
                    ))}
                </div>
            </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length>0&&(
                <>
                    <h2 className="whitespace-nowrap">
                        subtotal({items.length} itmes): {" "}
                        <span className="font-bold ">
                            <Currency quantity={total}/>
                        </span>
                    </h2>
                        <button 
                        role="link"
                        onClick={createCheckoutSession}
                        disabled={!session}
                        className={`button mt-2 ${!session&& 'from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed'}`}>
                            {!session?"Sign in to checkout":"Process to checkout"}
                        </button>
                </>
            )}
        </div>
        </main>

    </div>
    );
}
 
export default Checkout;