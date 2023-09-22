import twilio from "twilio";

const accountSid = "AC7a8e15512b927e2ac4f8d1177055b19b";
const authToken = "3345b3fdf3616401cbd2284bfb348f3c";
const client = twilio(accountSid, authToken);

export const sendNotification = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { to, body } = req.body;

    // Validate input
    if (!to || !body) {
      return res
        .status(400)
        .json({ error: "Both 'to' and 'body' are required." });
    }

    // sms
    client.messages
      .create({
        body: " A case has been filed against you. Your case number is #12345. Please contact your attorney for details.",
        from: "+19134164029",
        to: "+918762593391",
      })
      .then((message) => console.log(message.sid))
      .catch((error) => {
        console.error("Error while sending notification:", error);
        res.status(500).json({ error: "Failed to send notification" });
      });
    //whatsapp
    // client.messages
    //   .create({
    //     body: " A case has been filed against you. Your case number is #12345. Please contact your attorney for details.",
    //     from: "whatsapp:+14155238886",
    //     to: "whatsapp:+918762593391",
    //   })
    //   .then((message) => console.log(message.sid))
    //   .done();
    res
      .status(200)
      .json({ message: `Notification sent successfully to ${to}` });
  } catch (error) {
    console.error("Error while sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
};
