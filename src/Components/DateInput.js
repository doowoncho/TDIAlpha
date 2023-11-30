import { useState } from "react";

export default function DateInput({ date, index, handleDateChange, deleteDate }) {
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
          value={date.date}
          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'date', e.target.value)}
          required
          />

        <label>Start Time</label>
        <input
          type="time"
          className="form-control"
          value={date.startTime}
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
          value={date.date}
          style={{ width: '200px' }}
          onChange={(e) => handleDateChange(index, 'date', e.target.value)}
          required
          />
        </>
      )}

        <label>End Time</label>
        <input
          type="time"
          className="form-control"
          value={date.endTime}
          style={{ width: '150px' }}
          onChange={(e) => handleDateChange(index, 'endTime', e.target.value)}
          required
        />
      <input className="form-check-input mx-2" type="checkbox" value="" onChange={handleCheckboxChange}/>
      <label className="form-check-label" for="flexCheckDefault"> 24/7</label>  
      
      {showAdditionalInput && (
        <>
      <input className="form-check-input mx-2" type="checkbox" value=""/>
      <label className="form-check-label" for="flexCheckDefault"> Exclude Weekends</label>
      </>
      )}

      <input className="form-check-input mx-2" type="checkbox" value=""/>
      <label className="form-check-label" for="flexCheckDefault"> NPAT</label>

        {index === 0 ? null : (
          <button type="button" className="btn btn-primary my-2" onClick={() => deleteDate(index)}>
            X
          </button>
        )}
      </div>
    );
  }