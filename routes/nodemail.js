const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");
// let transporter = nodemailer.createTransport(options[, defaults])

// nodemailer.createTransport({
//     host: "smtp.example.com", //replace with your email provider
//     port: 587,
//     auth: {
//       user: "username", //replace with the email address
//       pass: "password" //replace with the password
//     }
// });
// // verify connection configuration
// transporter.verify(function(error, success) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });

router.post('/send', (req, res, next) => {
    console.log(req.data)
    console.log("Hey Listen!")
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `

    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: '465',
        auth: {
            user: "haywoodbeck12@gmail.com", //replace with the email address
            pass: "Bghbgh123321" //replace with the password
        }
    });

    let mailOptions = {
        from: email,
        to: 'haywoodbeck12@gmail.com',
        subject: `Message from ${name}`,
        html: `
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Message: ${message}</li>
        </ul>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, res)=>{
        if (err){
            res.send(err)
        } else {
            res.send('Success')
        }
    })
    smtpTransport.close();
})

module.exports = router;
//     var mail = {
//       from: name,
//       to: 'haywoodbeck12@gmail.com',
//       text: content
//     }
//     transporter.sendMail(mail, (err, data) => {
//       if (err) {
//         res.json({
//           status: 'fail'
//         })
//       } else {
//         res.json({
//          status: 'success'
//         })
//       }
//     })
// })