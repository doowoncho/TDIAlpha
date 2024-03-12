import { deleteJob, deletetask, getAllUsers } from '../Components/APICalls';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import PopUp from '../Components/PopUp';

const { GridActionsCellItem, GridDeleteIcon, GridDeleteForeverIcon, getGridNumericOperators, getGridDateOperators } = require('@mui/x-data-grid');
const moment = require('moment');
const statusChoices = ['Approved', 'New', 'Completed', 'Invoice', 'Declined', 'Submitted', 'Waiting', 'Canceled', 'Canceled OS']
const minWidthStartTime = 180;
const minWidthEndTime = 180;
const minWidthStatus = 120;
const minWidthSetup = 400;
const minWidthCompany = 150;
const minWidthContact = 200;
const minWidthRequestId = 200;
const minWidthPermitNumber = 200;
const minWidthPONumber = 300;
const minWidthWONumber = 130;
const minWidthNotes = 200;
const minWidthQBInvoice = 200;
const minWidthActions = 40;

let users = await getAllUsers();

export const InvoicePageColumns = [
  { field: 'id', headerName: 'ID', flex: 1, 
    renderCell: (params) => {
      return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
    }
  },
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: minWidthStartTime, 
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A');
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A');
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: minWidthStatus, editable: true,  type: 'singleSelect',
  valueOptions: statusChoices},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: minWidthSetup, editable: true,},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: minWidthCompany, editable: true, },
  { field: 'contact', headerName: 'Contact', flex: 1, minWidth: minWidthContact, editable: true, },
  { field: 'request_id', headerName: 'Request ID', flex: 1, minWidth: minWidthRequestId, editable: true,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: minWidthPermitNumber, editable: true, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth: minWidthPONumber, editable: true,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth: minWidthWONumber, editable: true,},
  { field: 'notes', headerName: 'Notes', flex: 1, minWidth: minWidthNotes, editable: true, },
  { field: 'permit_cost', headerName: 'Permit Cost(+10%)', flex: 1, minWidth: minWidthQBInvoice, editable: true, type: 'number', 
    valueFormatter: (params) => {
      return (params.value * 1.1).toFixed(2);
    },
  }, 
  { field: 'qb_invoice', headerName: 'QB Invoice #', flex: 1, minWidth: minWidthQBInvoice, editable: true,},
  {
    field: 'actions',
    type: 'actions',
    width: minWidthActions,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<GridDeleteForeverIcon />}
        label="Delete"
        onClick={()=>deleteJob(params.id)}
      />
    ],
  },
]

export const CompletedPageColumns = [
  { field: 'id', headerName: 'ID', flex: 1, 
    renderCell: (params) => {
      return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
    }
  },
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: minWidthStartTime, 
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A');
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date ? date.format('MM/DD/YYYY h:mm A') : null;
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: minWidthStatus, editable: true,  type: 'singleSelect',
  valueOptions: statusChoices},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: minWidthSetup, editable: true,},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: minWidthCompany, editable: true, },
  { field: 'contact', headerName: 'Contact', flex: 1, minWidth: minWidthContact, editable: true, },
  { field: 'request_id', headerName: 'Request ID', flex: 1, minWidth: minWidthRequestId, editable: true,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: minWidthPermitNumber, editable: true, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth: minWidthPONumber, editable: true,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth: minWidthWONumber, editable: true,},
  { field: 'notes', headerName: 'Notes', flex: 1, minWidth: minWidthNotes, editable: false, 
    renderCell: (params) => {
      return PopUp(params.id)
    }
  },
  { field: 'permit_cost', headerName: 'Permit Cost(+10%)', flex: 1, minWidth: minWidthQBInvoice, editable: true, type: 'number', 
    valueFormatter: (params) => {
      return (params.value * 1.1).toFixed(2);
    },
  }, 
  { field: 'qb_invoice', headerName: 'QB Invoice #', flex: 1, minWidth: minWidthQBInvoice, editable: true},
  {
    field: 'actions',
    type: 'actions',
    width: minWidthActions,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<GridDeleteForeverIcon />}
        label="Delete"
        onClick={()=>deleteJob(params.id)}
      />
    ],
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
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A');
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A');
    }, 
    type: 'dateTime', editable: true, 
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: minWidthStatus, editable: true,  type: 'singleSelect',
    valueOptions: statusChoices
  },
  { field: 'company', headerName: 'Company', flex: 1, minWidth: minWidthCompany, editable: true, },
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: minWidthSetup, editable: true,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth: minWidthWONumber, editable: true,},
  {
    field: 'actions',
    type: 'actions',
    width: minWidthActions,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<GridDeleteForeverIcon />}
        label="Delete"
        onClick={()=>deleteJob(params.id)}
      />
    ],
  },
]

export const TasksTableColumns = [
    { field: 'id', headerName: 'ID', flex: 1,
      renderCell: (params) => {
        return <a href={`/taskdetails/${params.value}`} className="no-link-style">{params.value}</a>;
      }
    },
    { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: minWidthStartTime, 
      valueFormatter: (params) => {
        const date = moment(params.value).utcOffset('-07:00');
        return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
      }, 
      type: 'dateTime', editable: true,
      filterOperators: getGridDateOperators().filter(
        (operator) => operator.value == 'onOrAfter',
      ),
    },
    { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: minWidthEndTime,
      valueFormatter: (params) => {
        const date = moment(params.value).utcOffset('-07:00');
        return date.isValid() ? date.format('MM/DD/YYYY h:mm A') : ""
      }, 
      type: 'dateTime', editable: true,
      filterOperators: getGridDateOperators().filter(
        (operator) => operator.value == 'onOrBefore',
      ),
    },
    { field: 'assigned', headerName: 'Assigned', flex: 1, minWidth: minWidthStatus, editable: true,  type: 'singleSelect',
    valueOptions: () => {
      return users.map(user => ({
        label: user.name,
        value: user.id
    }))}
  },
    { field: 'setup', headerName: 'Setup', flex: 1, editable: true, minWidth: minWidthSetup},
    {
      field: 'actions',
      type: 'actions',
      width: minWidthActions,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
          onClick={()=>deletetask(params.id)}
        />
      ],
    },
  ]
