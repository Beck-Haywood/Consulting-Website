import {useState} from 'react';
import '../../public/Contact/index.css'
import axios from 'axios'

export default function Contact() {
    const [name, changeName] = useState('')
    const [email, changeEmail] = useState('')
    const [msg, changeMsg] = useState('')
    const [status, changeStatus] = useState('')

    function onNameChange(e) {
        changeName(e.target.value)
    }
    function onEmailChange(e) {
        changeEmail(e.target.value)
    }
    function onMsgChange(e) {
        changeMsg(e.target.value)
    }
    function submitEmail(e){
        e.preventDefault();
        axios({
          method: "POST", 
          url:"http://localhost:5000/send", 
          data:  {name, email, msg}
        }).then((res) =>{
            changeStatus('Sent!')
            resetForm()
            console.log(res)
        }).catch(()=>{
            console.log("MsgNotFOund")
        })
        // }).then((res)=>{
        //   console.log(res)
        //   console.log(res.data.status)
        //   console.log('dafuq?')


        //   if (res.data.status === 'success'){
        //       alert("Message Sent."); 
        //       console.log("Message Sent.")
        //       this.resetForm()
        //   }else if(res.data.status === 'fail'){
        //       alert("Message failed to send.")
        //       console.log("Message failed to send.")

        //   }
        // })
    }
    function resetForm(){
        changeEmail('')
        changeName('')
        changeMsg('')
    }
    return (
        <div>
            <form className="form" onSubmit={(e)=>{
                submitEmail(e)
            }} method="POST">
                <h2>CONTACT ME</h2>
                <p type="Name:"><input required value={name} onChange={(e)=>{onNameChange(e)}} placeholder="Write your name here.."></input></p>
                <p type="Email:"><input required value={email} onChange={(e)=>{onEmailChange(e)}} placeholder="Let me know how to contact you back.."></input></p>
                <p type="Message:"><input required value={msg} onChange={(e)=>{onMsgChange(e)}} placeholder="What would you like to know?"></input></p>
                <button type="submit">Send Message</button>
                <div className="div">
                    <span className="fa fa-phone"></span>(907)123-4567
                    <span className="fa fa-envelope-o"></span> contact@company.com
                </div>
            </form>
            <h1>{status}</h1>
        </div>
    )
}