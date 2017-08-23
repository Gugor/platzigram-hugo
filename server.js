var express = require("express");
var app = express();
var multer = require('multer');
var ext = require('file-extension');

// Objeto que especifica dónde y bajo qué nombre se guardará un archivo. Este deberá ser pasado como parámetro a una petición post
var storage = multer.diskStorage({
	destination: function (req,file,cb) 
	{
		cb(null,'./uploads');
	},
	filename: function (req, file, cb) 
	{
		cb(null, +Date.now() + '.' + ext(file.originalname));
	}
})

// Recibimos el archivo a almacenar desde el input y le decimos dónde debe almacenarse
var upload = multer({storage: storage}).single('picture'); // 'picture' (name="picture")  es el nombre del input que recibe el archivo


// Le decimos a node que el motor que gestiona las vistas por defecto es pug
app.set('view engine', 'pug'); 
/*-->Para seleccionar la carpeta de vistas podemos usar
     app.set('views','./carpeta donde guardamos las vistas');<---*/

// Indicamos al servidor que puede acceder a la carpeta '/public' donde se encuentran los archivos estáticos como los estilos
// Primero busca en la carpeta public y luego en las demas carpetas indicadas en este documento
app.use(express.static('public'));

// app.param('user', function(req, res, next, value) 
// {
// 	console.log('Valor param :user = ' + value);
// 	return value;
// });

app.get("/", inicio);
function inicio (req, res) 
{
	// Render devuelve la vista indicada por el motor de vistas seleccionado app.set('view engine')
	console.log('Requiriendo vista index home...');
	res.render("index",{ title: 'Plaztigram' });
}

app.get("/signup", function (req, res) 
{
	console.log('Requiriendo vista index /signup...');
	res.render("index",{ title: 'Plaztigram - Signup' });	
});

app.get("/signin", function (req, res)
{
	console.log('Requiriendo vista index /signin...');
	res.render("index",{ title: 'Plaztigram - Signin' });	
});


app.get('/api/pictures', function(req, res) 
{
	var pictures = [

		{
			user : {

				username: 'Monete81',
				avatar: 'hugo.png'
			},
			url: 'http://materializecss.com/images/office.jpg',
			likes: 0,
			liked: false,
			createdAt: +new Date()
		},
		{
			user : {

					username: 'Humunculo86',
					avatar: 'hugo2.jpg'
			},
			url: 'https://www.dondevive.org/wp-content/uploads/2015/12/donde-viven-las-aranas.jpg',
			likes: 1,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		},
		{
			user : {

					username: 'Babica',
					avatar: 'hugo2.jpg'
			},
			url: 'https://www.dondevive.org/wp-content/uploads/2015/12/donde-viven-las-aranas.jpg',
			likes: 3,
			liked: false,
			createdAt: new Date().setDate(new Date().getDate() - 13)
		}
	];

			console.log(pictures);
			res.send(pictures);
});

// Escuchamos las peticiones post que se hagan a '/api/pictures'. 
// El resultado de la petición debería ser un archivo de imagen que guardaremos en la carpeta uploads
app.post('/api/pictures',function (req,res) 
{
	console.log("Lo que la variable upload guarda...");
	console.log(upload);  // 'upload' en este caso guarda multer que es el middelware que utilizamos para gestionar el envio del formulario
	upload(req,res, function(err) 
	{
		if(err) 
		{
			return res.send(500, "Error uploading file")
		}
		console.log("El archivo...");
		console.log(req.file);
		console.log("El body del archivo");
		console.log(req.body);
		res.send('File uploaded succsessfully');
		console.log("Archivo subido con éxito")
	})


});

app.get('api/:username', function (req,res) 
{
	var user = {
			username : "Monete81",
			avatar : "hugo.png",
			pictures : [
				{
					id: 1,
					src: "https://scontent.fmad3-3.fna.fbcdn.net/v/t1.0-0/p206x206/13731447_10154337903684486_1127326420537130131_n.jpg?oh=ef85b0634f4f461e57017fd7ae29184e&oe=5A31FD34",
					likes: 3
				},
				{
					id: 2,
					src: "https://scontent.fmad3-3.fna.fbcdn.net/v/t1.0-0/q81/r270/p206x206/13092110_10153494304290986_7858501944768676167_n.jpg?oh=ca679007254fc25e4359945e3f9cedb3&oe=59EB4B83",
					likes: 1
				},
				{
					id: 3,
					src: "https://scontent.fmad3-3.fna.fbcdn.net/v/t1.0-0/p206x206/1909880_1155292936664_6299768_n.jpg?oh=46a4e4b0a67a7b23d13c6b83260eaa08&oe=5A20CDC6",
					likes: 1
				},
				{
					id: 4,
					src: "https://scontent.fmad3-3.fna.fbcdn.net/v/t1.0-0/p206x206/13729060_10153637298050986_275733639565468305_n.jpg?oh=57cafb6e9092d60fe26f191029584fc5&oe=5A22DEEF",
					likes: 6
				}
			]
			
		};

	console.log(JSON.parse(user));
	res.send(user);
});

app.get("/:username", function(req, res, next)
{
	res.render('index', {title: `Platzigram: ${req.params.username}`});

});

var puerto = 3000;
app.listen(puerto, function (err)
	{
		if(err) return console.log(err), process.exti(1);

		console.log("Platzigram escuchando en el puerto " + puerto);

	});