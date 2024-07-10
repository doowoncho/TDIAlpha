import { DateRange } from "@mui/icons-material";
import { Box, Button, Card, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, LinearProgress, List, Select, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import DateInput2 from "./DateInput2.0";
import { deleteTasksByJobId, getAllStatusTypes, getTasksByJobId, updateJob } from "./APICalls";
import { DateTime } from "luxon";
import { createTaskForDate, createTasksForExWeekend, createTasksForRepeat } from "../Helpers/DateUtils";
import ReactSelect from "react-select";

function DateEditBox(props) {
    const [dates, setDates] = useState([{ startDate: '', startTime: '', endDate: '', endTime: '', exWeekend: false, twentyFour: false, repeat: false }]);
    const { onClose, open, job } = props;
    const [loading, setLoading] = useState(false);
    const [npatCheck, setNpatCheck] = useState(false);
    const handleClose = () => {
        onClose();
        setNpatCheck(false)
    };

    const handleDateChange = (index, field, value) => {
        const updatedDates = [...dates];
        updatedDates[index][field] = value;
        setDates(updatedDates);
      };
      
      const handleCheckboxChanges = (index, field, value) => {
        const updatedDates = [...dates];
        updatedDates[index][field] = value;
        setDates(updatedDates);
      };
    
      const addDate = () => {
        setDates([...dates, { startDate: '', startTime: '', endDate: '', endTime: '', exWeekend: false, twentyFour: false, repeat: false }]);
      };

      const deleteDate = (index) => {
        const updatedDates = [...dates];
        updatedDates.splice(index, 1);
        setDates(updatedDates);
      };
    
      const handleNpatCheck = () => {
        setNpatCheck(!npatCheck)
        console.log(npatCheck)
      };

      const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        // Delete all tasks
        await deleteTasksByJobId(job.id);
      
        let earliestStartDate = null;
        let latestEndDate = null;
      
        await Promise.all(
          dates.map(async (dateTime) => {
            const startDateTime = DateTime.fromISO(`${dateTime.startDate}T${dateTime.startTime}`, { zone: 'America/Edmonton' });
            const endDateTime = dateTime.endDate ? DateTime.fromISO(`${dateTime.endDate}T${dateTime.endTime}`, { zone: 'America/Edmonton' }) : DateTime.fromISO(`${dateTime.startDate}T${dateTime.endTime}`, { zone: 'America/Edmonton' });
      
            if (!earliestStartDate || startDateTime < earliestStartDate) {
              earliestStartDate = startDateTime;
            }
      
            if (!latestEndDate || endDateTime > latestEndDate) {
              latestEndDate = endDateTime;
            }
      
            if (dateTime.repeat) {
              if (dateTime.exWeekend) {
                // Creating tasks for the in-between
                await createTasksForExWeekend(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, job.setup);
              } else {
                await createTasksForRepeat(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, job.setup);
              }
            } else if (dateTime.twentyFour) {
              await createTaskForDate(dateTime.startDate, dateTime.startTime, null, null, job, job.setup, 'Place');
              await createTaskForDate(null, null, dateTime.endDate, dateTime.endTime, job, job.setup, 'Knockdown');
            } else {
              // Non-twentyFour task
              await createTaskForDate(dateTime.startDate, dateTime.startTime, null, null, job, job.setup, 'Place');
              await createTaskForDate(null, null, dateTime.startDate, dateTime.endTime, job, job.setup, 'Knockdown');
            }
          })
        );
      
        // NPAT task
        if (npatCheck) {
          // Using just the date part for earliestStartDate
          let npatStartDate = earliestStartDate.startOf('day').minus({ days: 1 }).set({ hour: 12 });
          console.log(npatStartDate);
          await createTaskForDate(npatStartDate.toISO(), null, null, null, job, job.setup, "NPAT");
        }
      
        await updateJob(job.id, { starttime: earliestStartDate.toISO(), endtime: latestEndDate.toISO() });
        setLoading(false);
        handleClose();
        window.location.reload();
      };        

    if(loading == true){
        return <LinearProgress />
    }

    return (
      <> 
          <Dialog onClose={handleClose} open={open} maxWidth="lg"> {/* Set maxWidth to lg for a larger dialog */}
            <DialogTitle>Job Date Editor</DialogTitle>
            <DialogContent>   
                <form onSubmit={handleSubmit}>  
                <div className='container justify-content-center d-sm-flex overflow-auto'>
                    <div className="flex-column">
                        <div className="mb-3">
                            <input className="form-check-input mx-2" type="checkbox" onClick={handleNpatCheck}/>
                            <label className="form-check-label">NPAT Job</label>
                        </div>
                    {dates.map((date, index) => (
                        <DateInput2
                        key={index}
                        date={date}
                        index={index}
                        handleDateChange={handleDateChange}
                        handleCheckboxChanges={handleCheckboxChanges}
                        deleteDate={deleteDate}
                        />
                    ))}
                    <button type="button" className="btn btn-primary my-2" onClick={addDate}> Add Date and Time </button>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
            </DialogContent>
            </Dialog>
      </>
    );
  }

export default function JobDetails({job, handleInputChange, isEditing, user, handleCancelClick, saveChanges, handleEditClick}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const populateOptions = async () => {
          try {
            const statusOptions = await getAllStatusTypes();
            setOptions(statusOptions.map(status => ({
              value: status.name,
              label: status.name
            })))

        } catch (error) {
          console.error('Error fetching status types:', error);
        }
      };
    
          populateOptions();

    return (
        <div>
        {job && <div className="container text-center justify-content-center mt-4 d-flex">
                    {isEditing
                    ? <>
                       <div className="card mx-4" style={{width: "340px"}}>
                    <div className="card-header">Job Details</div>
                    <fieldset disabled={!isEditing}>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Contact</span>
                        </div>
                        <input type="text" value={job.contact || ''} className="form-control" onChange={(e)=>handleInputChange(e, 'contact')}/>
                        </div>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Company</span>
                        </div>
                        <input type="text" value={job.company || ''} onChange={(e)=>handleInputChange(e, 'company')} className="form-control"/>
                        </div>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Email</span>
                        </div>
                        <input type="text" value={job.email || ''} className="form-control" onChange={(e)=>handleInputChange(e, 'email')}/>
                        </div>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Phone Number</span>
                        </div>
                        <input type="text" value={job.phone_number || ''} onChange={(e)=>handleInputChange(e, 'phone_number')} className="form-control"/>
                        </div>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Status</span>
                        </div>
                        <ReactSelect
                            value={{ label: job?.status, value: job?.status }}
                            options={options}
                            onChange={(selectedOption) => handleInputChange({ target: { value: selectedOption?.value } }, 'status')}
                        />
                        </div>
                        <div className="input-group d-sm-flex">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">WO Number</span>
                        </div>
                        <input type="text" value={job.wo_number || ''} onChange={(e)=>handleInputChange(e, 'wo_number')} className="form-control"/>
                        </div>
                        <div className="input-group d-sm-flex">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Permit Number</span>
                        </div>
                        <input type="text" value={job.permit_number || ''} onChange={(e)=>handleInputChange(e, 'permit_number')} className="form-control"/>
                        </div>
                        <div className="input-group d-sm-flex">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">PO Number</span>
                        </div>
                        <input type="text" value={job.po_number || ''} onChange={(e)=>handleInputChange(e, 'po_number')} className="form-control"/>
                        </div>
                        <div className="input-group d-sm-flex">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Request ID</span>
                        </div>
                        <input type="text" value={job.request_id || ''} onChange={(e)=>handleInputChange(e, 'request_id')} className="form-control"/>
                        </div>
                    
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Stamp</span>
                        </div>
                        <select value={job.stamp == null ? "none" : job.stamp} onChange={(e) => handleInputChange(e, 'stamp')}>
                            <option value="stamped">Stamped</option>
                            <option value="reStamped">Re-stamped</option>
                            <option value="rushedStamp">Rushed Stamp</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                        <Button variant="outlined" style={{width: "100%"}} onClick={() => handleClickOpen()}>Edit Dates</Button>
                        <DateEditBox open={open} onClose={handleClose} job = {job}></DateEditBox>
                    </fieldset>
                </div> 
                      </>
                    : 
                    <Card variant="outlined" sx={{ maxWidth: 360 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" >
                                <Typography gutterBottom variant="h5" component="div">
                                    {job.company}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {job.status}
                                </Typography>
                            </Stack>
                            <Typography>
                                {`${job.contact}`}
                            </Typography>
                            <Typography color="text.secondary" >
                                {`${job.email} - ${job.phone_number}`}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <Chip color={job.stamp === 'none' || job.stamp == null || job.stamp == "" ? 'primary' : 'default'} label="None" size="small"/>
                                <Chip color={job.stamp === 'stamped' ? 'primary' : 'default'} label="Stamped" size="small"/>
                                <Chip color={job.stamp === 'reStamped' ? 'primary' : 'default'} label="Re-stamped" size="small"/>
                                <Chip color={job.stamp === 'rushedStamp' ? 'primary' : 'default'} label="Rushed Stamp" size="small"/>
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2, textAlign: "left" }}>
                            <Typography color="text.secondary">
                                {`WO #: ${job.wo_number}`}
                            </Typography>
                            <Typography color="text.secondary" >
                                {`Permit #: ${job.permit_number}`}
                            </Typography>
                            <Typography color="text.secondary" >
                                {`PO #: ${job.po_number}`}
                            </Typography>
                            <Typography color="text.secondary" >
                                {`Request Id: ${job.request_id}`}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Typography color="text.primary" >
                                {job.starttime && `Start: ${moment.tz(job.starttime, 'America/Edmonton').format('MMMM DD YYYY h:mm A')}`}
                            </Typography>
                            <Typography color="text.primary" >
                                {job.endtime && `End: ${moment.tz(job.endtime, 'America/Edmonton').format('MMMM DD YYYY h:mm A')}`}
                            </Typography>
                        </Box>
                    </Card>
            }
            </div> 
            }
                {user.permission == 1 &&
                <>
                    {isEditing
                    ?   <>
                            <button className="btn btn-primary my-3 px-4" onClick={handleCancelClick}>Cancel</button>
                            <button className="btn btn-warning mx-2 my-3 px-4" onClick={saveChanges}>Save Changes</button>
                        </>
                    : <button className="btn btn-primary px-4 mb-2 my-2" onClick={handleEditClick}>Edit</button> 
                    }
                </>
                } 
        </div> 
    )
}