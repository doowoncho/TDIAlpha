import moment from 'moment';
import { createtask } from '../Components/APICalls';
const { DateTime } = require('luxon');
   
   //DATE LOGIC
    export const createTaskForDate = async (startDate, startTime, endDate, endTime, job, location, taskType = "SameDay") => {
        let startDateTime 
        let endDateTime 
        const startDateTimeCalgary = DateTime.fromISO(`${startDate}T${startTime}`, { zone: 'America/Edmonton' });

        console.log(startDateTimeCalgary, startDateTimeCalgary.toUTC().toISO())
        //different pick up and place days
        if(startDate && endDate){
          startDateTime= DateTime.fromISO(`${startDate}T${startTime}`, { zone: 'America/Edmonton' });
          endDateTime= DateTime.fromISO(`${endDate}T${endTime}`, { zone: 'America/Edmonton' })
        }
        // same day pickup and place
        else if (startDate && endTime){
          startDateTime= DateTime.fromISO(`${startDate}T${startTime}`, { zone: 'America/Edmonton' });
          endDateTime= DateTime.fromISO(`${startDate}T${endTime}`, { zone: 'America/Edmonton' })
        }
        // just place
        else if (startDate && startTime){
          startDateTime= DateTime.fromISO(`${startDate}T${startTime}`, { zone: 'America/Edmonton' });     
        }
        //npat 
        else if(startDate){
          startDateTime = startDate
        }
        //just pickup
        else{
          endDateTime= DateTime.fromISO(`${endDate}T${endTime}`, { zone: 'America/Edmonton' })
        }
      const newtask = {
        starttime: startDateTime.toUTC().toISO(),
        endtime: endDateTime.toUTC().toISO(),
        job_id: job.id,
        setup: location,
        completed: false,
        type: taskType
      };
      await createtask(newtask);
    };
    
    export const createTasksForExWeekend = async (startDate, startTime, endDate, endTime, job, location) => {
      let currentDate = new Date(startDate);
      //creates first task
      currentDate.setDate(currentDate.getDate() + 1)
      await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
  
      while (currentDate <= new Date(endDate)) {
        if (currentDate.getDay() === 5) {
          // Task to pick up the sign on Fridays
          await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "Takedown");
        }
        else if(currentDate.getDay() != 6 && currentDate.getDay() != 0){
          //Task to keep repeating
          await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
        //creates last task
        await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
    };
    
    export const createTasksForRepeat = async (startDate, startTime, endDate, endTime, job, location) => {
      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        currentDate.setDate(currentDate.getDate() + 1);
        await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
      }
    };