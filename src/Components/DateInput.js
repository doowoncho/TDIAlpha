import { useState } from "react";

export default function DateInput({ date, index ,deleteDate, handleDateChange, handleCheckboxChanges }) {
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  const handleCheckboxChange = () => {
    setShowAdditionalInput(!showAdditionalInput);
  };

    return (
      <div className="d-flex align-items-center">
        {showAdditionalInput ? <label>Start Date</label> : <label>Date</label>}
        <input
          type="date"
          className="form-control mx-2"

          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'startDate', e.target.value)}
          required
          />

        <label>Start Time</label>
        <input
          type="time"
          className="form-control"

          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'startTime', e.target.value)}
          required
        />

      {showAdditionalInput && (
        <>
        <label>End Date</label>
        <input
          type="date"
          className="form-control mx-2"
 
          style={{ width: '200px' }}
          onChange={(e) => handleDateChange(index, 'endDate', e.target.value)}
          required
          />
        </>
      )}

        <label>End Time</label>
        <input
          type="time"
          className="form-control"

          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'endTime', e.target.value)}
          required
        />

      <input className="form-check-input mx-2" type="checkbox" value="" onChange={(e) => {handleCheckboxChanges(index, 'repeat', e.target.checked); handleCheckboxChange()}}/>
      <label className="form-check-label" for="flexCheckDefault"> Repeat Jobs</label>  

      <input className="form-check-input mx-2" type="checkbox" value="" onChange={(e) => {handleCheckboxChanges(index, 'twentyFour', e.target.checked); handleCheckboxChange()}}/>
      <label className="form-check-label" for="flexCheckDefault"> 24/7</label>  
      
      {showAdditionalInput && (
        <>
      <input className="form-check-input mx-2" type="checkbox" value=""onChange={(e) => {handleCheckboxChanges(index, 'exWeekend', e.target.checked)}}/>
      <label className="form-check-label" for="flexCheckDefault" > Exclude Weekends</label>
      </>
      )}

      <input className="form-check-input mx-2" type="checkbox" value="" onChange={(e) => {handleCheckboxChanges(index, 'NPAT', e.target.checked);}}/>
      <label className="form-check-label" for="flexCheckDefault"> NPAT</label>

        {index === 0 ? null : (
          <button type="button" className="btn btn-primary my-2 mx-2" onClick={() => deleteDate(index)}>
            X
          </button>
        )}
      </div>
    );
  }