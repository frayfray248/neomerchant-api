// imports
const mongoose = require('mongoose')
const paypal = require('@paypal/checkout-server-sdk')
const { createError } = require('../../error/error')

// models
const Product = require('../models/Product.js')
const Order = require('../models/Orders')

// create a shopping cart
exports.createOrder = (req, res, next) => {
    (async () => {
        try {

            // get user id
            const userId = req.params.userId

            // get order items
            const orderItems = req.body

            // calculate order total
            const total = await orderItems.reduce(async (sum, item) => {
                const product = await Product.findById(item._id)

                if (!product) throw createError(404, `Product ${item._id} does not exist`)

                return await (sum) + product.price * item.quantity
            }, 0)

            const items = await Promise.all(await orderItems.map(async (item) => {
                const product = await Product.findById(item._id)

                return {
                    name: product.title,
                    unit_amount: {
                        currency_code: "USD",
                        value: product.price
                    },
                    quantity: item.quantity
                }
            }))

            const Environment = process.env.NODE_ENV === "production"
                ? paypal.core.LiveEnvironment
                : paypal.core.SandboxEnvironment

            // create paypal order and client
            const paypalRequest = new paypal.orders.OrdersCreateRequest()
            const paypalClient = new paypal.core.PayPalHttpClient(
                new Environment(
                    process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET
                )
            )

            paypalRequest.prefer("return=representation")

            paypalRequest.requestBody({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: total,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: total
                                }
                            }
                        },
                        items: items
                    }
                ]
            })


            const order = await paypalClient.execute(paypalRequest)
            console.log(order.result.id )


            res.status(200).json({ id : order.result.id })

        } catch (e) {
            next(e)
        }
    })()
}