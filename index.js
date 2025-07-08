let express=require(`express`);

let app=express();
//this app.use() is middleware that we used
app.use(function (req,res,next){
  console.log("middleware working");
  next();
})// here we use next because in middle at the end of code we want to provide next () so that it can execute next route or next task;



//we use app.set because we want to use ejs
app.set("view engine","ejs");

//now we use static  files
app.use(express.static('./public'));



//this routs in express js this how we add url and open webpages
app.get('/',function (req,res){
   throw Error ("જાવા દેય લોડા")
})

app.get("/info",function (req,res){

  const {name,roll}=req.query;
  res.send(`
    <h1>HELLO</h1>
    name: ${name}, roll no: ${roll}
  `);
})

//here :username is params of routs u can see we can dynamcally change name of person and send it
app.get('/info/:username',function (req,res){
    res.send(`person name is ${req.params.username}`);
})


//this is template engine which convert markup style into convert into html  
app.get('/ecommarce',function (req,res){
    res.render("ecommarce",{age:12});//here we can see it convert age name into 12 we can change in file like <%= age%> like this 
})

app.get('/ecommarce/contact',function (req,res){
    res.render("contact");
})

//error halder create

app.get ("/ecommarce/contact/error",function (req,res,next){
  throw Error("oops sorry error");
})

//error handling
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000);


