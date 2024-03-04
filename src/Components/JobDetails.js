import { Box, Card, Chip, Divider, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";

export default function JobDetails({job, handleInputChange, isEditing, user}) {
    
    return (
        <div>
        {job && <div className="container text-center justify-content-center mt-4 d-flex">
            {user.permission == 1 &&
                <>
                    {isEditing
                    ? <>
                       <div className="card mx-4">
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
                        <input type="text" value={job.status || ''} className="form-control" readOnly/>
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
                        <div className="input-group d-sm-flex">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Start Time</span>
                        </div>
                                <input type="datetime-local" className="form-control" id="startDate" value={moment(job.starttime).format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) => handleInputChange(e, 'starttime')}/>
                        </div>
                        <div className="input-group d-sm-flex">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">End Time</span>
                        </div>
                                <input type="datetime-local" className="form-control" id="startDate" value={moment(job.endtime).format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) => handleInputChange(e, 'endtime')}/>
                        </div>
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
                            <Typography color="text.secondary" >
                                {`${job.email} - ${job.phone_number}`}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <Chip color={job.stamp === 'stamped' ? 'primary' : 'default'} label="Stamped" size="small"/>
                                <Chip color={job.stamp === 'reStamped' ? 'primary' : 'default'} label="Re-stamped" size="small"/>
                                <Chip color={job.stamp === 'rushedStamp' ? 'primary' : 'default'} label="Rushed Stamp" size="small"/>
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
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
                                {`Start: ${moment(job.starttime).format('MMMM DD YYYY h:mm A')}`}
                            </Typography>
                            <Typography color="text.primary" >
                                {`End: ${moment(job.endtime).format('MMMM DD YYYY h:mm A')}`}
                            </Typography>
                        </Box>
                    </Card>
                    }
                </>
            }
            </div> 
            }
        </div> 
    )
}