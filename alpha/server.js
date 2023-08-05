const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const cors = require('cors');

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

app.get('/api/specificJobs/:customer', async (req, res) => {
  try {
    const { customer } = req.params;
    const posts = await prisma.jobs.findMany({
      where: {
        customer: customer,
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/jobs-delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.jobs.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const deletedJob = await prisma.jobs.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(deletedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/create-job/:customer', async (req, res) => {
  try {
    const { customer } = req.params;
    res.json(req.params)
    const newJob = await prisma.jobs.create({
      data: {
        customer,
        setup
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
