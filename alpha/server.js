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


//api endpoints to be called in the code to make calls in the database

//gets all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const posts = await prisma.jobs.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//gets all jobs with specific criteria... takes in an object with the properties
app.get('/api/specificJobs', async (req, res) => {
  try {
    const { id, customer, startDate, endDate, status, setup, permit_number, notes, wo_number, po_number} = req.query
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

//updates the job with the id
app.put('/api/updateJob/:id', async (req, res) => {
  try {

    const jobId = parseInt(req.params.id) //id of job we are changing
    const { id, customer, startDate, endDate, status, setup, permit_number, notes, wo_number, po_number} = req.body
    const posts = await prisma.jobs.updateMany({
      where: {
        id: jobId
      },
      data:{
        customer: customer,
        id: id, 
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number
      }
    });
    res.json(posts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Deletes job with particular id
app.delete('/api/deleteJob/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id) 
    const deletedJob = await prisma.jobs.delete({
      where: {
        id: jobId
      },
    });
    res.json(deletedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//creates job with provided properties
app.post('/api/createJob', async (req, res) => {
  try {
    const { customer, startDate, endDate, status, setup, permit_number, notes, wo_number, po_number } = req.body;

    const newJob = await prisma.jobs.create({
      data: {
        customer: customer,
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
