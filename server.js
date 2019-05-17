const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
	{
		customerName: "",
		phoneNumber: "",
		customerEmail: "",
		customerID: ""
	},
	{
		customerName: "",
		phoneNumber: "",
		customerEmail: "",
		customerID: ""
	},
	{
		customerName: "",
		phoneNumber: "",
		customerEmail: "",
		customerID: ""
	},
	{
		customerName: "",
		phoneNumber: "",
		customerEmail: "",
		customerID: ""
	},
	{
		customerName: "",
		phoneNumber: "",
		customerEmail: "",
		customerID: ""
	}
]

const waitlist = [
	{
		customerName: "Waity McWaiterson",
		phoneNumber: "90909090",
		customerEmail: "J@gmail.com",
		customerID: "2"
	}
]

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'home.html'))
})

app.get('/tables', function (req, res) {
	res.sendFile(path.join(__dirname, 'tables.html'))
})

app.get('/reserve', function (req, res) {
	res.sendFile(path.join(__dirname, 'reserve.html'))
})

app.get('/api/tables', function (req, res) {
	res.json(tables);
})

app.get('/api/waitlist', function (req, res) {
	res.json(waitlist);
})

app.post('/api/reserve', function (req, res) {
	const customer = req.body
	let openTableIndex = -1;
	for (let i = 0; i < tables.length; i++) {
		const table = tables[i];
		if (table.customerID === "") {
			openTableIndex = i;
			break;
		}
	}
	if (openTableIndex === -1) {
		waitlist.push(customer)
		return res.send(`${reservationConfirmationBefore} You've been added to the Waitlist at spot number ${waitlist.length} ${reservationConfirmationAfter}`)
	}
	tables[openTableIndex] = customer
	return res.send(`${reservationConfirmationBefore} You've Reserved Table ${openTableIndex+1} ${reservationConfirmationAfter}`)
})

const reservationConfirmationBefore = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Hot Restaurant - Reserve</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<div class="container">
<div class="jumbotron">
<h1 class="text-center"></h1>
<hr>
<h2 class="text-center">`

const reservationConfirmationAfter = `
</h2>
<hr>
<div class="text-center">
<a href="/"><button class="btn btn-lg btn-primary">Home</button></a>
<a href="/tables"><button class="btn btn-lg btn-secondary">View Tables</button></a>
<a href="/reserve"><button class="btn btn-lg btn-danger">Make A Reservation</button></a>
</div>
</div>
</div>
<body>`

app.listen(port)