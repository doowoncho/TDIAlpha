import { useState } from "react";
import CustomTimePicker from "./CustomTimePicker";

export default function DateInput({ date, index ,deleteDate, handleDateChange, handleCheckboxChanges }) {
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [showExWeekend, setShowExWeekend] = useState(false);

  const handleCheckboxChange = (showExcludeWeekend) => {
    setShowExWeekend(showExcludeWeekend)
    setShowAdditionalInput(true);
  };

  const handleOneDaySelected = () => {
    setShowExWeekend(false)
    setShowAdditionalInput(false)
  }

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

        <label className="mx-2">Start Time</label>
        <CustomTimePicker onChange={(selectedTime) => handleDateChange(index, 'startTime', selectedTime)} required/>
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

        <label className="mx-2">End Time</label>
        <CustomTimePicker onChange={(selectedTime) => handleDateChange(index, 'endTime', selectedTime)} />
      
      <input className="form-check-input mx-2" type="radio" name="repeatOptions" value="repeat" onChange={(e) => {
        handleOneDaySelected();}} defaultChecked/>
      <label className="form-check-label" htmlFor="twentyFourOption">One Day</label>

      <input className="form-check-input mx-2" type="radio" name="repeatOptions" value="repeat" onChange={(e) => {
        handleCheckboxChanges(index, 'repeat', e.target.checked);
        handleCheckboxChange(false);}}/>
      <label className="form-check-label" htmlFor="repeatOption">Repeat Jobs</label>

      <input className="form-check-input mx-2" type="radio" name="repeatOptions" value="repeat" onChange={(e) => {
        handleCheckboxChanges(index, 'twentyFour', e.target.checked);
        handleCheckboxChange(true);}}/>
      <label className="form-check-label" htmlFor="twentyFourOption">24/7</label>
      
      {showExWeekend && (
        <>
          <input className="form-check-input mx-2" type="checkbox" value=""onChange={(e) => {handleCheckboxChanges(index, 'exWeekend', e.target.checked)}}/>
          <label className="form-check-label" for="flexCheckDefault" > Exclude Weekends</label>
        </>
      )}
        {index === 0 ? null : (
          <button type="button" className="btn btn-primary my-2 mx-2" onClick={() => deleteDate(index)}>
            X
          </button>
        )}
      </div>
    );
  }