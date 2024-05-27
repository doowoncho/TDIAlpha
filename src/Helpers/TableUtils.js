import { Input, Switch, ToggleButton } from '@mui/material';
import { deleteJob, deletetask, getAllUsers, getUserById } from '../Components/APICalls';
import PopUp from '../Components/PopUp';
import { CheckBox } from '@mui/icons-material';

const { GridActionsCellItem, GridDeleteIcon, GridDeleteForeverIcon, getGridNumericOperators, getGridDateOperators } = require('@mui/x-data-grid');
const moment = require('moment-timezone');
const statusChoices = ['Approved', 'New', 'Completed', 'Invoiced', 'Declined', 'Submitted', 'Waiting', 'Work Off Existing Closure']
const colorChoices = [' ','Green', 'Orange', 'Blue']
const taskChoices = ['NPAT', 'SameDay', 'Place', 'Pickup', 'Knockdown', 'Finished', 'Cancelled', 'Cancelled OS']
const minWidthStartTime = 180;
const minWidthEndTime = 180;
const minWidthStatus = 120;
const minWidthSetup = 400;
const minWidthCompany = 150;
const minWidthContact = 200;
const minWidthRequestId = 200;
const minWidthPermitNumber = 130;
const minWidthPONumber = 130;
const minWidthWONumber = 130;
const minWidthNotes = 200;
const minWidthQBInvoice = 130;
const minWidthActions = 40;
const minWidthType = 100;
let users = await getAllUsers();
let user = await getUserById(window.sessionStorage.getItem("user"))
const isEditable = user.permission == 1

export const InvoicePageColumns = [
  { field: 'id', headerName: 'ID', flex: 1,
    renderCell: (params) => {
      return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
    }
  },
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: minWidthStartTime, 
      valueFormatter: (params) => {
        const date = moment.tz(params.value, 'America/Edmonton');
        return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
      }, 
    type: 'dateTime', editable: false,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
      valueFormatter: (params) => {
        const date = moment.tz(params.value, 'America/Edmonton');
        return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
      }, 
    type: 'dateTime', editable: false,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: minWidthStatus, editable: isEditable,  type: 'singleSelect',
  valueOptions: statusChoices},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: minWidthSetup, editable: isEditable,},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: minWidthCompany, editable: isEditable, },
  { field: 'contact', headerName: 'Contact', flex: 1, minWidth: minWidthContact, editable: isEditable, },
  { field: 'request_id', headerName: 'Request ID', flex: 1, minWidth: minWidthRequestId, editable: isEditable,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: minWidthPermitNumber, editable: isEditable, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth: minWidthPONumber, editable: isEditable,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth: minWidthWONumber, editable: isEditable,},
  { field: 'jobNotes', headerName: 'Job Notes', flex: 1, minWidth: minWidthSetup, editable: isEditable},
  { field: 'notes', headerName: 'Task Notes', flex: 1, minWidth: minWidthNotes, editable: false, 
    renderCell: (params) => {
      return PopUp(params.id)
    }
  },
  { field: 'permit_cost', headerName: 'Permit Cost(+10%)', flex: 1, minWidth: minWidthQBInvoice, editable: isEditable, type: 'number', 
    valueFormatter: (params) => {
      return (params.value * 1.1).toFixed(2);
    },
  }, 
  { field: 'qb_invoice', headerName: 'QB Invoice #', flex: 1, minWidth: minWidthQBInvoice, editable: isEditable },
  { field: 'qb_invoice_logs', headerName: 'QB Logs', flex: 1, minWidth: 110, editable: false, 
    renderCell: (params) => {
      return PopUp(params.id, params.field)
    }
  },
  { field: 'paid', headerName: 'Paid', flex: 1, editable: isEditable, minWidth: 100, type: 'boolean'}
]

export const CompletedPageColumns = [
  { field: 'id', headerName: 'ID', flex: 1, 
    renderCell: (params) => {
      return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
    }
  },
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: minWidthStartTime, 
    valueFormatter: (params) => {
      const date = moment.tz(params.value, 'America/Edmonton');
      return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
    }, 
    type: 'dateTime', editable: false,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
    valueFormatter: (params) => {
      const date = moment.tz(params.value, 'America/Edmonton');
      return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
    }, 
    type: 'dateTime', editable: false,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: minWidthStatus, editable: isEditable,  type: 'singleSelect',
  valueOptions: statusChoices},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: minWidthSetup, editable: isEditable,},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: minWidthCompany, editable: isEditable, },
  { field: 'contact', headerName: 'Contact', flex: 1, minWidth: minWidthContact, editable: isEditable, },
  { field: 'request_id', headerName: 'Request ID', flex: 1, minWidth: minWidthRequestId, editable: isEditable,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: minWidthPermitNumber, editable: isEditable, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth: minWidthPONumber, editable: isEditable,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth: minWidthWONumber, editable: isEditable,},
  { field: 'jobNotes', headerName: 'Job Notes', flex: 1, minWidth: minWidthSetup, editable: isEditable},
  { field: 'notes', headerName: 'Notes', flex: 1, minWidth: minWidthNotes, editable: false, 
    renderCell: (params) => {
      return PopUp(params.id)
    }
  },
  { field: 'permit_cost', headerName: 'Permit Cost(+10%)', flex: 1, minWidth: minWidthQBInvoice, editable: isEditable, type: 'number', 
    valueFormatter: (params) => {
      return (params.value * 1.1).toFixed(2);
    },
  }, 
  { field: 'qb_invoice', headerName: 'QB Invoice #', flex: 1, minWidth: minWidthQBInvoice, editable: isEditable },
  { field: 'qb_invoice_logs', headerName: 'QB Logs', flex: 1, minWidth: minWidthNotes, editable: false, 
  renderCell: (params) => {
    return PopUp(params.id, params.field)
  }
  },
]

export const JobsTableColumns = [
  { field: 'id', headerName: 'ID', flex: 1, 
    renderCell: (params) => {
      return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
    }  
  },
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: minWidthStartTime, 
    valueFormatter: (params) => {
      const date = moment.tz(params.value, 'America/Edmonton');
      return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
    }, 
    type: 'dateTime', editable: false,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
    valueFormatter: (params) => {
      const date = moment.tz(params.value, 'America/Edmonton');
      return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
    }, 
    type: 'dateTime', editable: false, 
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: minWidthStatus, editable: isEditable,  type: 'singleSelect',
    valueOptions: statusChoices
  },
  { field: 'color', headerName: 'Color', flex: 1, minWidth: minWidthStatus, editable: isEditable,  type: 'singleSelect',
    valueOptions: colorChoices
  },
  { field: 'company', headerName: 'Company', flex: 1, minWidth: minWidthCompany, editable: isEditable, },
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: minWidthSetup, editable: isEditable,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: minWidthPermitNumber, editable: isEditable, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth: minWidthPONumber, editable: isEditable,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth: minWidthWONumber, editable: isEditable,},
]

export const TasksTableColumns = [
    { field: 'id', headerName: 'ID', flex: 1,
      renderCell: (params) => {
        return <a href={`/taskdetails/${params.value}`} className="no-link-style">{params.value}</a>;
      }
    },
    { field: 'starttime', headerName: 'Place Time', flex: 1, minWidth: minWidthStartTime, 
      valueFormatter: (params) => {
        const date = moment.tz(params.value, 'America/Edmonton');
        return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
      }, 
      type: 'dateTime', editable: false,
      filterOperators: getGridDateOperators().filter(
        (operator) => operator.value == 'onOrAfter',
      ),
    },
    { field: 'endtime', headerName: 'Knockdown Time', flex: 1, minWidth: minWidthEndTime,
      valueFormatter: (params) => {
        const date = moment.tz(params.value, 'America/Edmonton');
        return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
      }, 
      type: 'dateTime', editable: false,
      filterOperators: getGridDateOperators().filter(
        (operator) => operator.value == 'onOrBefore',
      ),
    },
    { field: 'assigned', headerName: 'Assigned', flex: 1, minWidth: 100, editable: isEditable,  type: 'singleSelect',
    valueOptions: () => {
      return users.map(user => ({
        label: user.name,
        value: user.id
    }))}
  },
    { field: 'type', headerName: 'Type', flex: 1, editable: isEditable, minWidth: minWidthType, type: 'singleSelect',
      valueOptions: taskChoices
    },
    { field: 'setup', headerName: 'Setup', flex: 1, editable: isEditable, minWidth: minWidthSetup},
  ]
