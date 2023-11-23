import React, { useState } from 'react';

export default function DateInput({ date, index, handleDateChange, deleteDate, editMode, selectedJobType }) {
  const [showAdditionalDate, setShowAdditionalDate] = useState(false);

  const handleRadioChange = (e) => {
    setShowAdditionalDate(e.target.checked);
  };

    return (
      <div className="d-flex align-items-center">
        <label>Date</label>
        <input
          type="date"
          className="form-control mx-2"
          value={date.date}
          style={{ width: '200px' }}
          onChange={(e) => handleDateChange(index, 'date', e.target.value)}
          required
        />
        {showAdditionalDate && (
        <div className="input-group">
          <lable>End Date</lable>
          <input
            type="date"
            className="form-control"
            value={date.additionalDate}
            onChange={(e) => handleDateChange(index, 'additionalDate', e.target.value)}
          />
        </div>
      )}
        <label>Start Time</label>
        <input
          type="time"
          className="form-control"
          value={date.startTime}
          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'startTime', e.target.value)}
          required
        />
        <label>End Time</label>
        <input
          type="time"
          className="form-control"
          value={date.endTime}
          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'endTime', e.target.value)}
          required
        />
        <div class="btn-group" id={`jobType${index}`} data-toggle="buttons">
            <input class="form-check-input" type="checkbox" name="exampleRadios" id="longJob" value="option1" onChange={handleRadioChange}/>
            <label class="form-check-label" for="longJob">
              Long Job
            </label>
            <input class="form-check-input" type="checkbox" name="exampleRadios" id="longJobWeekend" value="option2" onChange={handleRadioChange}/>
            <label class="form-check-label" for="longJobWeekend">
              Long Job Exclude Weekends
            </label>
            <input class="form-check-input" type="checkbox" name="exampleRadios" id="longJob24" value="option3" onChange={handleRadioChange}/>
            <label class="form-check-label" for="longJob24">
              Long Job 24/7
            </label>
          </div>
        {index === 0 ? null : (
          <button type="button" className="btn btn-primary my-2" onClick={() => deleteDate(index)}>
            X
          </button>
        )}
      </div>
    );
  }