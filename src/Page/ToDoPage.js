import React, { useEffect, useState } from 'react';
import { getJobByUserId } from '../Components/APICalls';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enCA } from 'date-fns/locale';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-CA": enCA
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export default function ToDoPage() {
  const [events, setEvents] = useState([]);

  async function getJobsForPage() {
    try {
      console.log(window.sessionStorage.getItem("user").id)
      let jobs = await getJobByUserId(window.sessionStorage.getItem("user"));
      let tempEvents = [];
      for (let job of jobs) {
        let event = {
          title: job.customer,
          start: new Date(job.starttime),
          end: new Date(job.endtime),
        };
        tempEvents.push(event);
      }
      setEvents(tempEvents);
      console.log(tempEvents)
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }

  useEffect(() => {
    getJobsForPage();
  }, []); // Empty dependency array to mimic componentDidMount

  return (
    <div>
      <Calendar
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 23, 0, 0)}
        tooltipAccessor={"start"}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      >
      </Calendar>
    </div>
  );
}
