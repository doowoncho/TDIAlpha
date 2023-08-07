const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
  }));


//api endpoints to be called in the code to make calls in the databse
app.get('/api/jobs', async (req, res) => {
  try {
    const posts = await prisma.jobs.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/specificJobs', async (req, res) => {
  try {
    const { id, customer, date, status, setup, permit_number, notes, wo_number, po_number} = req.query
    const posts = await prisma.jobs.findMany({
      where: {
        customer: customer,
        id: id, 
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/jobs-delete', async (req, res) => {
  try {
    const { id, customer, date, status, setup, permit_number, notes, wo_number, po_number} = req.body

    const deletedJob = await prisma.jobs.delete({
      where: {
        customer: customer,
        id: id, 
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number
      },
    });

    console.log(req.body)
    res.json(deletedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/create-job', async (req, res) => {
  try {
    const { id, customer, date, status, setup, permit_number, notes, wo_number, po_number } = req.body;

    const newJob = await prisma.jobs.create({
      data: {
        customer: customer,
        id: id, 
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number
      },
    });

    res.json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
