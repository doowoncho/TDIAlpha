export default function DateInput({ date, index, handleDateChange, deleteDate }) {
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
        {index === 0 ? null : (
          <button type="button" className="btn btn-primary my-2" onClick={() => deleteDate(index)}>
            X
          </button>
        )}
      </div>
    );
  }