const express=require('express')
const dbconnect=require('./mongodb')
const path=require('path')
const { log } = require('console')
const app=express()

app.set('view engine','ejs')


app.use(express.urlencoded({extended:true}))

app.get('/addres',(req,res)=>
{
    res.render("addres");
    
    if(req.query.b1!=null)
    {   
        var num = parseInt(req.query.t)
        var c= req.query.l
        if((num)==51210262 && c=='pranjal')
    {
        res.render("studentRecord")
    }
   }else
     console.log('invalid user')
    
});

app.get('/address2',async(req,res)=>
{   
    
    if(req.query.b1!=null)
    {
        let gid=parseInt(req.query.t1)
        let gname=req.query.t2
        let gcourse=req.query.t3
        let gsec=req.query.t4

        let collection=await dbconnect()
        let r=await collection.insertOne({'id':gid,'name':gname,'course':gcourse,'sec':gsec})
        if(r.acknowledged==true)
        {
            let msg='Record Inserted'
            res.render('studentRecord',{msg})
        }
        else
        {
            let msg='Record not inserted'
            res.render('studentRecord',{msg})
        }
    }
    else
    {
      let msg=''
      res.render('studentRecord',{msg})
    }
});
app.listen(5000,()=>console.log('server running'))