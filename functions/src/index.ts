import * as functions from 'firebase-functions';
import Stripe from 'stripe';

import * as express from 'express';
import * as cors from 'cors';

import bodyParser = require('body-parser');

const secretKey = process.env.STRIPE_SECRET_KEY as string
const stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' });

const app = express();
app.use(cors({origin: true}));


app.post(
    '/webhook',
    bodyParser.raw({type: 'application/json'}),  // ????
    async (req: express.Request, res: express.Response) => {
  functions.logger.info('Webhook start');

  // Validate that the request came from Stripe
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret); // ????
  } catch(err) {
    functions.logger.error(err);
    res.status(400).end();
    return;
  }

  // Handle type of webhook
  // const intent: any = event.data.object;
  switch(event.type){
    case 'payment_intent.succeeded':
      // Update database, send email, etc...
      functions.logger.info('SUCCESS!!!');
      break;
      case 'payment_intent.payment_failed':
        // Send email, etc...
        functions.logger.info('FAILURE!!!');
      break;
  }

  res.sendStatus(200);
});

export const payments = functions.https.onRequest(app)
