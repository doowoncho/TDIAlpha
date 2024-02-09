import moment from 'moment';
import { createtask } from '../Components/APICalls';
   
   //DATE LOGIC
    export const createTaskForDate = async (startDate, startTime, endDate, endTime, job, location, taskType = "both") => {
        let startDateTime 
        let endDateTime 
        
        //different pick up and place days
        if(startDate && endDate){
          startDateTime= new Date(startDate + 'T' + startTime);
          endDateTime= new Date(endDate + 'T' + endTime);
        }
        // same day pickup and place
        else if (startDate && endTime){
          startDateTime = new Date(startDate + 'T' + startTime);
          endDateTime = new Date(startDate + 'T' + endTime);
        }
        // just place
        else if (startDate && startTime){
          startDateTime = new Date(startDate + 'T' + startTime);
        }
        //npat 
        else if(startDate){
          startDateTime = startDate
        }
        //just pickup
        else{
          endDateTime = new Date(endDate + 'T' + endTime);
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
      await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
  
      while (currentDate <= new Date(endDate)) {
        if (currentDate.getDay() === 5) {
          // Task to pick up the sign on Fridays
          await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "pickup");
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