const config = require('../configs');
const stripe = require('stripe')(config.checkout.stripe.sk);

const initiateStripeSession = async (req) => {

    const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
        expand: ['data.product'],
    });
  
    const result = prices.data.find((e) => e.lookup_key == req.body.subscription);
    console.log(result);

    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: result.id,
            quantity: 1,
          },
        ],
        metadata: {
            userId: req.user.id,
            token: req.headers.authorization
        },
        mode: 'subscription',
        success_url: `${config.checkout.stripe.next_url}/confirmation?amount=${req.body.total}`,
        cancel_url: `${config.checkout.stripe.next_url}/cancel`,
    });
    return session;
  };
  
exports.createSession = async function (req, res) {
    try{
        const session = await initiateStripeSession(req);
        res.status(200).json({
            id: session.id,
            price: session.amout_total,
            currency: session.currency,
        });
    }catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};