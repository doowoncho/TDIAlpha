import moment from 'moment';
import { createtask } from '../Components/APICalls';
const { DateTime } = require('luxon');
   
   //DATE LOGIC
    export const createTaskForDate = async (startDate, startTime, endDate, endTime, job, location, taskType) => {
        let startDateTime 
        let endDateTime 

        //different pick up and place days
        if(startDate && endDate){
          startDateTime = moment.tz(`${startDate}T${startTime}`, 'America/Edmonton').utc()
          endDateTime = moment.tz(`${endDate}T${endTime}`, 'America/Edmonton').utc()
        }
        // same day pickup and place
        else if (startDate && endTime){
          startDateTime= moment.tz(`${startDate}T${startTime}`, 'America/Edmonton').utc()
          endDateTime= moment.tz(`${startDate}T${endTime}`, 'America/Edmonton').utc()
        }
        // just place
        else if (startDate && startTime){
          startDateTime= moment.tz(`${startDate}T${startTime}`, 'America/Edmonton').utc()     
        }
        //npat 
        else if(startDate){
          startDateTime = moment(startDate)
        }
        //just pickup
        else{
          endDateTime= moment.tz(`${endDate}T${endTime}`, 'America/Edmonton').utc()
        }
      const newtask = {
        starttime: startDateTime,
        endtime: endDateTime,
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
      await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, null, null, job, location, "Place");
      await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "Takedown");
      currentDate.setDate(currentDate.getDate() + 1)
      while (currentDate <= new Date(endDate)) {

        if(currentDate.getDay() != 6 && currentDate.getDay() != 0){
          //Task to keep repeating
          await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, null, null, job, location, "Place");
          await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "Takedown");
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
        //creates last task
        await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, null, null, job, location, "Place");
        await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "Takedown");
    };
    
    export const createTasksForRepeat = async (startDate, startTime, endDate, endTime, job, location) => {
      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        currentDate.setDate(currentDate.getDate() + 1);
        await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, null, null, job, location, "Place");
        await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "Takedown");
      }
    };