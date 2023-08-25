const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require("express");
const jwt = require("jsonwebtoken");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const { UserModel } = require("../model/user.model");
const { authorize } = require("../middleware/authorize.middleware");
require("dotenv").config();

const apiRoute = express.Router();

apiRoute.post("/auth", async (req, res) => {
    try {
        const user = req.body.phone || req.body.email;
        const token = jwt.sign({
            user
        }, process.env.SECRET, { expiresIn: '1h' });
        const check = await UserModel.find({ user })
        if (!check.length) {
            const details = new UserModel({ user })
            await details.save();
        }
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ "message": error.message })
    }
})

apiRoute.use(authorize)

apiRoute.post("/send-report", async (req, res) => {
    try {
        const user = req.body.phone || req.body.email;
        const emaileRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emaileRegex.test(user)){
            return res.status(400).send({"message":"Please enter valid email, Example: rishab@gmail.com"})
        }
        const doc = new PDFDocument(); // Create a document

        const timestamp = new Date().toLocaleString(); // Add the current timestamp
        doc.fontSize(12)
            .text(`Timestamp: ${timestamp}`, 100, 150);
        doc.text(`Email: ${user}`, 100, 170); // Add the email

        const pdfBuffer = await new Promise(resolve => {
            const buffers = [];
            doc.on("data", buffer => buffers.push(buffer));
            doc.on("end", () => resolve(Buffer.concat(buffers)));
            doc.end();
        });

        const pdfBase64 = pdfBuffer.toString("base64");

        sgMail.setApiKey(process.env.MAIL);
        const msg = {
            to: user,
            from: 'rkc3660@gmail.com', // Use the email address or domain you verified above
            subject: 'Attachment here!',
            html: `<p>Here is your attachment!</p>`,
            attachments: [
                {
                    content: pdfBase64,
                    filename: 'output.pdf',
                    type: 'application/pdf',
                    disposition: 'attachment'
                }
            ]
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log("Mail sent via sendgrid")
            }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });
        
        
        const data = {
            "date_created": new Date().getTime(), // Current timestamp in milliseconds
            "sent_to": user
        }
        await UserModel.findOneAndUpdate(
            { "user": req.user },
            { $push: { history: data } }
        )
        res.status(200).send({ "success": true })
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
})

apiRoute.get("/get-history", async (req, res) => {
    try {
        const { history } = await UserModel.findOne({ "user": req.user })
        res.status(200).send([...history]);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
})

module.exports = {
    apiRoute
}