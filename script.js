import mongoose from 'mongoose'
import express, { response } from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'

const {Schema,model}=mongoose;
            
            const userSchema = new Schema({
                     fname:String,
                     lname:String,
                     username:{type:String,
                               unique:true},
                     password:String
                                 })
            const User = model("User",userSchema)
            

            mongoose.connect("mongodb://localhost:27017/user")
            
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));



app.get('/login',(req,res)=>{
  
   res.sendFile(__dirname+'/web.html')
   
})
app.get('/css',(req,res)=>{
  res.sendFile((__dirname+'/style.css'));
   })
   app.get('/cr',(req,res)=>{
      res.sendFile((__dirname+'/createacc.html'));
       })

app.post('/',async(req,res)=>{
   try{
      const u_ = await User.find({username:req.body.username},{_id: 0,lname: 0,fname: 0,username:0,__v: 0})
      const pass = String(u_[0].password)
      
      
      var k =  await bcrypt.compare(req.body.password, pass)
      if (k==true){
         res.sendFile(__dirname+'/logged.html')

      }
      else if (k==false){
         res.sendFile(__dirname+'/web.html')
         
      }
       
   }catch(error){
      console.log(error)
   }
      
   
})
   
   
      
  
 
  

app.post('/c',(req,res)=>{
   async function s(){
      const pass = req.body.password
   
     req.body.password = await bcrypt.hash(pass,10)
     const f = await User.find({username:req.body.username})
     if (f.length=0){
      const user = new User(req.body)
      user.save()
      res.sendFile(__dirname+'/web.html')
     }
     else{
      res.sendFile(__dirname+'/createacc.html')
     }
     }
      s()
   
})

app.listen('3000','192.168.0.104',()=>{
   console.log('server started at https://localhost:${port}');
})

            
          
            




    
