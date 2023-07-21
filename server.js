import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

//start Server
const app = express();
const port = 3030;
// Load environment variables
dotenv.config();

app.use(express.static('public'));
app.use(express.json());

let DOMAIN = process.env.DOMAIN;

// Home route
app.get('/', (req, res) => {
    return res.sendFile('index.html', { root: 'public' });
});

// Success
app.get('/success', (req, res) => {
    return res.sendFile('success.html', { root: 'public' });
});

// failed || cancel
app.get('/cancel', (req, res) => {
    return res.sendFile('cancel.html', { root: 'public' });
});

// Stripe
const stripes = stripe(process.env.stripe_api)

app.post("/stripe-checkout", async (req, res) => {
    try {
        const session = await stripes.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.title,
                            images: [item.productImg],
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${DOMAIN}/success`,
            cancel_url: `${DOMAIN}/cancel`,
            billing_address_collection: 'required',

        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
)
// Post req
// app.post('/stripe-checkout', async (res, req) => {
//     const lineItems = req.body.items.map((item) => {
//         const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
//         return {
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: item.title,
//                     images: [item.productImg]
//                 },
//                 unit_amount: unitAmount,
//             },
//             quantity: item.quantity,
//         };
//     });
//     console.log(`lineItems = ${lineItems}`)

//     // Create Checkout Session

//     const session = await stripeGateway.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         success_url: `${DOMAIN}/success`,
//         cancel_url: `${DOMAIN}/cancel`,
//         line_items: lineItems,
//         billing_address_collection: 'required'
//     });
//     res.json({ url: session.url });
// });


// Start server on
app.listen(port), () => {
    console.log('Server started at ' + port)
};

