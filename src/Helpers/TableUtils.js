import { deleteJob, deletetask, getAllUsers } from '../Components/APICalls';

const { GridActionsCellItem, GridDeleteIcon, GridDeleteForeverIcon, getGridNumericOperators, getGridDateOperators } = require('@mui/x-data-grid');
const moment = require('moment');
const statusChoices = ['Approved', 'New', 'Completed', 'Invoice', 'Declined', 'Submitted', 'Waiting']
let users = await getAllUsers();


export const InvoicePageColumns = [
  { field: 'id', headerName: 'ID', flex: 1, 
    renderCell: (params) => {
      return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
    }
  },
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 180, 
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 180,
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
  valueOptions: statusChoices},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: 680, editable: true,},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: 200, editable: true, },
  { field: 'contact', headerName: 'Contact', flex: 1, minWidth: 200, editable: true, },
  { field: 'request_id', headerName: 'Request ID', flex: 1, minWidth:300, editable: true,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: 200, editable: true, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth:300, editable: true,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth:300, editable: true,},
  { field: 'notes', headerName: 'Notes', flex: 1, minWidth: 200, editable: true, },
  { field: 'qb_invoice', headerName: 'QB Invoice(+10%)', flex: 1, minWidth:300, editable: true, type: 'number', 
     valueFormatter: (params) => {
      return params.value * 1.1;// Format date as MM/DD/YYYY h:mm AM/PM
    },
  }, 
  {
    field: 'actions',
    type: 'actions',
    width: 80,
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
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 180, 
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrAfter',
    ),
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 180,
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
    }, 
    type: 'dateTime', editable: true,
    filterOperators: getGridDateOperators().filter(
      (operator) => operator.value == 'onOrBefore',
    ),
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
  valueOptions: statusChoices},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: 680, editable: true,},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: 200, editable: true, },
  { field: 'contact', headerName: 'Contact', flex: 1, minWidth: 200, editable: true, },
  { field: 'request_id', headerName: 'Request ID', flex: 1, minWidth:300, editable: true,},
  { field: 'permit_number', headerName: 'Permit Number', flex: 1, minWidth: 200, editable: true, },
  { field: 'po_number', headerName: 'PO Number', flex: 1, minWidth:300, editable: true,},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth:300, editable: true,},
  { field: 'notes', headerName: 'Notes', flex: 1, minWidth: 200, editable: true, },
  { field: 'qb_invoice', headerName: 'QB Invoice(+10%)', flex: 1, minWidth:300, editable: true, type: 'number', 
     valueFormatter: (params) => {
      return params.value * 1.1;// Format date as MM/DD/YYYY h:mm AM/PM
    },
  }, 
  {
    field: 'actions',
    type: 'actions',
    width: 80,
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
        { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 180, 
          valueFormatter: (params) => {
            const date = moment(params.value).utcOffset('-07:00');
            return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
          }, 
          type: 'dateTime', editable: true,
          filterOperators: getGridDateOperators().filter(
            (operator) => operator.value == 'onOrAfter',
          ),
        },
        { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 180,
          valueFormatter: (params) => {
            const date = moment(params.value).utcOffset('-07:00');
            return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
          }, 
          type: 'dateTime', editable: true, 
          filterOperators: getGridDateOperators().filter(
            (operator) => operator.value == 'onOrBefore',
          ),
        },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
        valueOptions: statusChoices},
        { field: 'company', headerName: 'Company', flex: 1, minWidth: 200, editable: true, },
        { field: 'setup', headerName: 'Setup', flex: 1, minWidth: 680, editable: true,},
        { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth:300, editable: true,},
        {
          field: 'actions',
          type: 'actions',
          width: 80,
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
    { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 180, 
      valueFormatter: (params) => {
        const date = moment(params.value).utcOffset('-07:00');
        return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
      }, 
      type: 'dateTime', editable: true,
      filterOperators: getGridDateOperators().filter(
        (operator) => operator.value == 'onOrAfter',
      ),
    },
    { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 180,
      valueFormatter: (params) => {
        const date = moment(params.value).utcOffset('-07:00');
        return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
      }, 
      type: 'dateTime', editable: true,
      filterOperators: getGridDateOperators().filter(
        (operator) => operator.value == 'onOrBefore',
      ),
    },
    { field: 'assigned', headerName: 'Assigned', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
    valueOptions: () => {
      return users.map(user => ({
        label: user.name,
        value: user.id
    }))}
  },
    { field: 'setup', headerName: 'Setup', flex: 1, editable: true, minWidth:680},
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
          onClick={()=>deletetask(params.id)}
        />
      ],
    },
  ]