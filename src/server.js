// sk_test_51JqekRSIxt8Jkzzck8ZevhsLvYAlA0FuL6aSK69NR8a7K91ney6ukfpnOW9OFadFR1NfFsAnXkdLr1qMPg8xlVdZ00C4WPyGHG
// Electronic Fresh Computer: price_1NP5OdSIxt8JkzzcKqIkto7v
// Handmade Rubber Pizza: price_1NP5QrSIxt8JkzzcWMW1RPNh
// Elegant Plastic Cheese: price_1NP5ROSIxt8JkzzcreG5WXuD

const express = require('express')
const stripe = require('stripe')('sk_test_51JqekRSIxt8Jkzzck8ZevhsLvYAlA0FuL6aSK69NR8a7K91ney6ukfpnOW9OFadFR1NfFsAnXkdLr1qMPg8xlVdZ00C4WPyGHG')
var cors = require('cors')

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.static("public"));
app.use(express.json())

// _________________________________________________________________________________________________

app.get('/trial', (req, res) => {
    res.send('Trial')
})

app.post("/checkout", async (req, res) => {
    const items = req.body.items
    let lineItems = []

    console.log(req.body)

    items.forEach(item => {
        lineItems.push({
            price: item.priceId,
            quantity: item.quantity
        })
    });


    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/failed',
        currency: 'inr'
    })

    res.send(JSON.stringify({
        url: session.url
    }))
})

// _________________________________________________________________________________________________

app.use('/.netlify/functions/server', router);

app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000')
})