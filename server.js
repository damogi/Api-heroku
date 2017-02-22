var app=require("express")();
var fs=require("fs");
var bodyParser=require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var jugadores=fs.readFileSync('jugadores.json');
var jsonstring=JSON.parse(jugadores);
var port=process.env.PORT||3000;

app.get('/users/:id',function(req,res){
  var id=req.params.id;
  var find=false;

  for(i=0;i<jsonstring.length;i++)
  {
    if(id==jsonstring[i].id)
    {
      res.send("username= "+ jsonstring[i].username+"\n"+ "score= "+jsonstring[i].score);
      find=true;
    }
  }
  if(find==false){
    res.send("El usuario no existe");
  }
  find=false;
})

app.post('/users/:id',function(req,res){
  var id=req.params.id
  var find=false;

  var scoreBody=req.body.score;

  for(i=0;i<jsonstring.length;i++)
  {
    if(id==jsonstring[i].id)
    {
      jsonstring[i].score=scoreBody;

      var jsonstringify=JSON.stringify(jsonstring);

      fs.writeFileSync("jugadores.json",jsonstringify);
      res.send("Su score a sido guardado");
      find=true;
    }
  }
  if(find==false)
  {
    res.send("El usuario no existe");
  }
  find=false;
})

app.get('/leaderboard/:id', function(req,res){
  var id=req.params.id;
  var find=false;

  for(i=0;i<jsonstring.length;i++)
  {
    if(id==jsonstring[i].id)
    {
      res.send("Su posición es= "+jsonstring[i].position);
      find=true;
    }
  }
  if(find==false)
  {
    res.send("El usuario no existe");
  }
  find=false;
})

app.get('/leaderboard',function(req,res){
  var pageSize=req.query.pageSize;
  var page=req.query.page;

  if(pageSize==1)
  {
    res.send(jsonstring);
  }
  if(pageSize==2&&page==1)
  {
    res.send(JSON.stringify(jsonstring[0])+" "+JSON.stringify(jsonstring[1])+" "+JSON.stringify(jsonstring[2]));
  }else {
    if(pageSize==2&&page==2)
    {
      res.send(JSON.stringify(jsonstring[3])+" "+JSON.stringify(jsonstring[4]));
    }
  }
  if(pageSize>2)
  {
    res.send("No hay tantos jugadores en este juego")
  }
})

app.listen(port,function()
{
  console.log("App start listen!")
})
