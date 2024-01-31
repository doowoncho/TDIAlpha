  // const express = require('express');
  // const { PrismaClient } = require('@prisma/client');

  // const prisma = new PrismaClient();
  // const app = express();
  // const bodyParser = require('body-parser');
  // const cors = require('cors');
  // const { ReadableStreamDefaultController } = require('stream/web');

  // app.use(bodyParser.json());
  // app.use(cors({
  //     // origin: 'https://main.d3uj1gkliipo6a.amplifyapp.com',
  //        origin: 'http://localhost:3000',
  //   }));

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ReadableStreamDefaultController } = require('stream/web');
const path = require('path');

const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));

app.get("/", function(req, res) {
  res.sendFile(path.join(buildPath, 'index.html'),
    function(err) {
      if(err) {
        res.status(500).send(err);
      }
    }
  )
})

app.use(bodyParser.json());
app.use(cors({
    // // origin: 'https://main.d3uj1gkliipo6a.amplifyapp.com',
    //    origin: 'http://localhost:3001',
  }));

//api endpoints to be called in the code to make calls in the database

app.get('/api/tasks', async (req, res) => {
  try {
    const posts = await prisma.tasks.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const posts = await prisma.jobs.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//gets all tasks with specific criteria... takes in an object with the properties
app.get('/api/specifictasks', async (req, res) => {
  try {
    const { id, contact, starttime, endtime, status, setup, permit_number, notes, wo_number, po_number, assigned, npat} = req.query
    const posts = await prisma.tasks.findMany({
      where: {
        contact: contact,
        id: id, 
        status: status,
        setup: setup,
        permit_number: permit_number, 
        notes: notes, 
        wo_number: wo_number, 
        po_number: po_number,
        assigned : assigned,
        starttime: starttime ?? null,
        endtime: endtime ?? null,
        npat: npat
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//updates the task with the id
app.put('/api/updatetask/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id) //id of task we are changing
    const { starttime, endtime, setup, notes, assigned, jobId, completed } = req.body
    const task = await prisma.tasks.update({
      where: {
        id: taskId
      },
      data:{
        setup: setup,
        notes: notes, 
        starttime: starttime,
        endtime: endtime,
        job_id: jobId,
        assigned: assigned,
        completed: completed
      }
    });
    res.json(task);

    //complicated shit to make the job dates match the task earliest and latest dates
    const job = await prisma.jobs.findFirst({ where: { id: jobId } });
    if (job) {
      const earliestTask = await prisma.tasks.findFirst({
        where: { job_id: job.id, starttime: { not: null }  },
        orderBy: { starttime: 'asc' },
      });
    
      const latestTask = await prisma.tasks.findFirst({
        where: { job_id: job.id, endtime: { not: null } },
        orderBy: { endtime: 'desc' },
      });
    
      if (earliestTask || latestTask) {
        await prisma.jobs.update({
          where: {
            id: job.id,
          },
          data: {
            starttime: earliestTask.starttime,
            endtime: latestTask.endtime,
          },
        });
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//updates the task with the id
app.put('/api/updatejob/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id) //id of task we are changing
    const { contact, starttime, endtime, status, wo_number, po_number, email, phone_number, permit_number, map, photo, p_confirm, permit, request_id, company} = req.body
    const posts = await prisma.jobs.update({
      where: {
        id: jobId
      },
      data:{
        contact: contact,
        status: status,
        starttime: starttime,
        endtime: endtime,
        contact:contact,
        wo_number: wo_number,
        po_number: po_number,
        email: email,
        phone_number: phone_number,
        permit_number: permit_number,
        map: map,
        photo: photo,       
        p_confirm: p_confirm,    
        permit: permit,
        request_id: request_id,
        company: company
      }
    });
    res.json(posts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Deletes task with particular id
app.delete('/api/deletetask/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id) 
    const deletedtask = await prisma.tasks.delete({
      where: {
        id: taskId
      },
    });
    res.json(deletedtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Deletes task with particular id
app.delete('/api/deletejob/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id) 
    const deletedjob = await prisma.jobs.delete({
      where: {
        id: jobId
      },
    });

    const deletedTasks = await prisma.tasks.deleteMany({
      where: {
        job_id: jobId
      },
    });
    res.json(deletedjob, deletedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//creates task with provided properties
app.post('/api/createtask', async (req, res) => {
  const { starttime, endtime, job_id, notes, setup } = req.body
  try {
    const newtask = await prisma.tasks.create({
      data: {
        setup: setup,
        notes: notes, 
        starttime: starttime,
        endtime: endtime,
        job_id: job_id
      },
    });
    res.json(newtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//creates job with provided taskid
app.post('/api/createjob', async (req, res) => {
  try {
    const newJob = await prisma.jobs.create({
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
    
    const taskId = parseInt(req.params.id);
    
    const existingID = await prisma.files.findUnique({
      where: {
        id: taskId
      }
    });

    if (existingID) {
      const updatedID = await prisma.files.update({
        where: {
          id: taskId
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
          id: taskId,
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
    const taskId = parseInt(req.params.id);
    const files = await prisma.files.findUnique({
      where: {
        id: taskId
      }
    });
    if (files) {
      res.json(files);
    } else {
      res.status(404).json({ error: 'task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add this route to get a task by ID
app.get('/api/getjob/:id', async (req, res) => {
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
      res.status(404).json({ error: 'job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add this route to get a task by ID
app.get('/api/gettask/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await prisma.tasks.findUnique({
      where: {
        id: taskId
      }
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add this route to get a task by ID
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


// get tasks for a user by id
app.get('/api/gettaskByUserId/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.tasks.findMany({
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

// get tasks for a user by id
app.get('/api/gettasksbyjobid/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const tasks = await prisma.tasks.findMany({
      where: {
        job_id: jobId
      }
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/createUser', async (req, res) => {
  try {
    const { email, name, permission, password } = req.body;

    const newtask = await prisma.tasks.create({
      data: {
        email: email,
        name: name,
        permission: permission,
        password: password
      },
    });

    res.json(newtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});