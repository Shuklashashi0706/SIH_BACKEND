import express from "express";
const accountSid = "AC7a8e15512b927e2ac4f8d1177055b19b";
const authToken = "caf164d0f01fce89bf0c0d21371d842a";
const router = express.Router();
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: "Hello Bhosdike",
    to: "+91 8861123901", // Recipient's phone number
    from: "+19134164029", // Your Twilio phone number
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error)); // Add error handling


export default router;
