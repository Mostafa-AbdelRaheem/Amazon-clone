// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export default async (req,res)=>{
    const {items,email}=req.body;
    // console.log("this is a stripe data",stripe)
    
    // console.log(items);
    // console.log(email);
    const transformedItems=items.map(item=>({
        description:item.description,
        quantity:1,
        price_data:{
            currency:'usd',
            unit_amount:item.price*100,
            product_data:{
                name:item.title,
                images:[item.image],
            },
        }
    }));
    
  const session = await require('stripe')(process.env.STRIPE_SECRET_KEY).checkout.sessions.create({
        payment_method_types:["card"],
        shipping_address_collection:{
            allowed_countries:['GB','US','CA'],
        },
        line_items:transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
});
res.status(200);

};

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));