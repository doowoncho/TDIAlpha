const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
  }));

app.use(
  '/api', // Define the base URL path that should be proxied
  createProxyMiddleware({
    target: 'http://3.147.57.120:3001', // Specify the target URL of your HTTP server
    changeOrigin: true, // Add this line to handle the change in origin
  })
);
  
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
    const { id, customer, starttime, endtime, status, setup, permit_number, notes, wo_number, po_number, assigned} = req.query
    const posts = await prisma.jobs.findMany({
      where: {
        customer: customer,
        id: id, 
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number,
        assigned : assigned,
        starttime: starttime,
        endtime: endtime
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
    const { id, customer, starttime, endtime, status, setup, permit_number, notes, wo_number, po_number, assigned, p_confirm, permit, map, photo } = req.body
    const posts = await prisma.jobs.update({
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
        po_number: po_number,
        assigned: assigned,
        p_confirm: p_confirm,
        permit: permit,
        map: map,
        starttime: starttime,
        endtime: endtime,
        photo: photo
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
    const { customer, starttime, endtime, status, setup, permit_number, notes, wo_number, po_number, email } = req.body;

    const newJob = await prisma.jobs.create({
      data: {
        customer: customer,
        email: email,
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number,
        starttime: starttime,
        endtime: endtime
      },
    });
    res.json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/uploadfile/', async (req, res) => {
  try {
    const { photo_name, photo_file, permit_name, permit_file, permit_confirmation_name, permit_confirmation_file, map_drawing_name, map_file } = req.body;
    
      const createdFile = await prisma.files.create({
        data: {
          photo_name: photo_name,
          photo_file: photo_file,
          permit_name: permit_name,
          permit_file: permit_file,
          permit_confirmation_name: permit_confirmation_name,
          permit_confirmation_file: permit_confirmation_file,
          map_drawing_name: map_drawing_name,
          map_file: map_file 
        }
      });
      res.json(createdFile);
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.post('/api/file/:id', async (req, res) => {
  try {
    const { id, photo_name, photo_file, permit_name, permit_file, permit_confirmation_name, permit_confirmation_file, map_drawing_name, map_file } = req.body;
    
    const jobId = parseInt(req.params.id);
    
    const existingID = await prisma.files.findUnique({
      where: {
        id: jobId
      }
    });

    if (existingID) {
      const updatedID = await prisma.files.update({
        where: {
          id: jobId
        },
        data: {
          photo_name: photo_name,
          photo_file: photo_file,
          permit_name: permit_name,
          permit_file: permit_file,
          permit_confirmation_name: permit_confirmation_name,
          permit_confirmation_file: permit_confirmation_file,
          map_drawing_name: map_drawing_name,
          map_file: map_file                 
        }
      });

      res.json(updatedID);
    }else {
      const createID = await prisma.files.create({
        data: {
          id: jobId,
          photo_name: photo_name,
          photo_file: photo_file,
          permit_name: permit_name,
          permit_file: permit_file,
          permit_confirmation_name: permit_confirmation_name,
          permit_confirmation_file: permit_confirmation_file,
          map_drawing_name: map_drawing_name,
          map_file: map_file 
        }
      });

      res.json(createID);
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.get('/api/getFiles/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const files = await prisma.files.findUnique({
      where: {
        id: jobId
      }
    });
    if (files) {
      res.json(files);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Add this route to get a job by ID
app.get('/api/getJob/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await prisma.jobs.findUnique({
      where: {
        id: jobId
      }
    });
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add this route to get a job by ID
app.get('/api/getUser/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.users.findFirst({
      where: {
        id: userId
      }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//gets all users
app.get('/api/users', async (req, res) => {
  try {
    const posts = await prisma.users.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getUserByEmail/:email', async (req, res) => {
  try {
    const emailID = req.params.email;
    const user = await prisma.users.findFirst({
      where: {
        email: emailID
      }
    });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// get jobs for a user by id
app.get('/api/getJobByUserId/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.jobs.findMany({
      where: {
        assigned: userId

      }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/createUser', async (req, res) => {
  try {
    const { email, name, permission, password } = req.body;

    const newJob = await prisma.jobs.create({
      data: {
        email: email,
        name: name,
        permission: permission,
        password: password
      },
    });

    res.json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

