import { getAllUsers } from '../Components/APICalls';

const { GridActionsCellItem, GridDeleteIcon, GridDeleteForeverIcon } = require('@mui/x-data-grid');
const moment = require('moment');
let users = await getAllUsers();


export const JobsTableColumns = [
        { field: 'id', headerName: 'ID', flex: 1, 
          renderCell: (params) => {
            return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
          }, editable: true,  
        },
        { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 180, 
          valueFormatter: (params) => {
            const date = moment(params.value).utcOffset('-07:00');
            return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
          }, 
          type: 'dateTime', editable: true,
        },
        { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 180,
          valueFormatter: (params) => {
            const date = moment(params.value).utcOffset('-07:00');
            return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
          }, 
          type: 'dateTime', editable: true,
        },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
        valueOptions: ['Approved', 'New Request', 'Development']},
        { field: 'company', headerName: 'Company', flex: 1, minWidth: 200, editable: true, },
        { field: 'setup', headerName: 'Setup', flex: 1, minWidth: 800, editable: true,},
        { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth:300, editable: true,},
        {
          field: 'actions',
          type: 'actions',
          width: 80,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<GridDeleteForeverIcon />}
              label="Delete"
            />
          ],
        },
      ]

export const TasksTableColumns = [
    { field: 'id', headerName: 'ID', flex: 1,
      renderCell: (params) => {
        return <a href={`/taskspage/${params.value}`} className="no-link-style">{params.value}</a>;
      }, editable: true,  
    },
    { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 180, 
      valueFormatter: (params) => {
        const date = moment(params.value).utcOffset('-07:00');
        return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
      }, 
      type: 'dateTime', editable: true,
    },
    { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 180,
      valueFormatter: (params) => {
        const date = moment(params.value).utcOffset('-07:00');
        return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
      }, 
      type: 'dateTime', editable: true,
    },
    { field: 'setup', headerName: 'Setup', flex: 1, editable: true, minWidth:800},
    { field: 'assigned', headerName: 'Assigned', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
      valueOptions: () => {
        return users.map(user => ({
          label: user.name,
          value: user.id
      }))}
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
        />
      ],
    },
  ]