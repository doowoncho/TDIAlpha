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
app.use(cors());

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

app.get('/api/contacts', async (req, res) => {
  try {
    const posts = await prisma.contacts.findMany();
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
    const { starttime, endtime, setup, notes, assigned, jobId, completed, type } = req.body
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
        completed: completed,
        type: type
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
    const { contact, starttime, endtime, status, wo_number, po_number, email, phone_number, permit_number, request_id, company, setup, stamp, qb_invoice, permit_cost} = req.body
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
        request_id: request_id,
        company: company,
        setup: setup,
        stamp: stamp,
        qb_invoice: qb_invoice,
        permit_cost: permit_cost
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
  const { starttime, endtime, job_id, notes, setup, type } = req.body
  try {
    const newtask = await prisma.tasks.create({
      data: {
        setup: setup,
        notes: notes, 
        starttime: starttime,
        endtime: endtime,
        job_id: job_id,
        type: type
      },
    });
    res.json(newtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/createContact', async (req, res) => {
  const { name, company, phone_number, email } = req.body
  try {
    const newContact = await prisma.contacts.create({
      data: {
        name: name,
        company: company, 
        phone_number: phone_number,
        email: email
      },
    });
    res.json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


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

app.post('/api/uploadReceipts/', async (req, res) => {
  try {
    const { name, file } = req.body;
    
      const createdFile = await prisma.receipts.create({
        data: {
          name: name,
          file: file
        }
      });
      res.json(createdFile);
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.post('/api/uploadPhoto/', async (req, res) => {
  try {
    const { job_id, name, file } = req.body;
    
      const createdFile = await prisma.photos.create({
        data: {
          job_id: job_id,
          name: name,
          file: file
        }
      });
      res.json(createdFile);
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.post('/api/uploadPermitCon/', async (req, res) => {
  try {
    const { job_id, name, file } = req.body;
    
      const createdFile = await prisma.permitConfirmations.create({
        data: {
          job_id: job_id,
          name: name,
          file: file,
        }
      });
      res.json(createdFile);
      console.log(createdFile);
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.post('/api/uploadPermit/', async (req, res) => {
  try {
    const { job_id, name, file } = req.body;
    
      const createdFile = await prisma.permits.create({
        data: {
          job_id: job_id,
          name: name,
          file: file,
        }
      });
      res.json(createdFile);
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.post('/api/uploadPlan/', async (req, res) => {
  try {
    const { job_id, name, file } = req.body;
    
      const createdFile = await prisma.plans.create({
        data: {
          job_id: job_id,
          name: name,
          file: file 
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

app.delete('/api/deleteFile', async (req, res) => {
  try {
    const { name } = req.body;
    
    const deletedPhoto = await prisma.photos.deleteMany({
      where: {
        name: name,
      },
    });

    const deletedPermitCon = await prisma.permitConfirmations.deleteMany({
      where: {
        name: name,
      },
    });

    const deletedPermits = await prisma.permits.deleteMany({
      where: {
        name: name,
      },
    });

    const deletedPlans = await prisma.plans.deleteMany({
      where: {
        name: name,
      },
    });

    console.log(deletedPermitCon, deletedPermits, deletedPhoto, deletedPlans);

    if (deletedPhoto || deletedPermitCon || deletedPermits || deletedPlans) {
      return res.json({ message: 'File deleted successfully' });
    } else {
      return res.status(404).json({ error: 'File not found' });
    }

    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.delete('/api/deleteReceipts', async (req, res) => {
  try {
    const { name } = req.body;
    
    const deletedReceipts = await prisma.receipts.deleteMany({
      where: {
        name: name,
      },
    });

    return res.json({ message: 'File deleted successfully' });
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
})

app.get('/api/getFiles/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    // const files = await prisma.files.findUnique({
    //   where: {
    //     id: taskId
    //   }
    // });
    // Fetch data from all tables based on the job_id
    const photo = await prisma.photos.findMany({ where: { job_id: jobId } });
    const permit = await prisma.permits.findMany({ where: { job_id: jobId } });
    const permitConfirmation = await prisma.permitConfirmations.findMany({ where: { job_id: jobId } });
    const plan = await prisma.plans.findMany({ where: { job_id: jobId } });
    
    const files = {
      photo,
      permit,
      permitConfirmation,
      plan
    }
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

app.get('/api/getReceipts', async (req, res) => {
  try {
    const receipts = await prisma.receipts.findMany();
    res.json(receipts);
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