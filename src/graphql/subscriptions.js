/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFiles = /* GraphQL */ `
  subscription OnCreateFiles($filter: ModelSubscriptionFilesFilterInput) {
    onCreateFiles(filter: $filter) {
      id
      photo_name
      photo_file
      permit_name
      permit_file
      permit_confirmation_name
      permit_confirmation_file
      map_drawing_name
      map_file
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFiles = /* GraphQL */ `
  subscription OnUpdateFiles($filter: ModelSubscriptionFilesFilterInput) {
    onUpdateFiles(filter: $filter) {
      id
      photo_name
      photo_file
      permit_name
      permit_file
      permit_confirmation_name
      permit_confirmation_file
      map_drawing_name
      map_file
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFiles = /* GraphQL */ `
  subscription OnDeleteFiles($filter: ModelSubscriptionFilesFilterInput) {
    onDeleteFiles(filter: $filter) {
      id
      photo_name
      photo_file
      permit_name
      permit_file
      permit_confirmation_name
      permit_confirmation_file
      map_drawing_name
      map_file
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTasks = /* GraphQL */ `
  subscription OnCreateTasks($filter: ModelSubscriptionTasksFilterInput) {
    onCreateTasks(filter: $filter) {
      id
      job_id
      setup
      notes
      assigned
      endtime
      starttime
      customer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTasks = /* GraphQL */ `
  subscription OnUpdateTasks($filter: ModelSubscriptionTasksFilterInput) {
    onUpdateTasks(filter: $filter) {
      id
      job_id
      setup
      notes
      assigned
      endtime
      starttime
      customer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTasks = /* GraphQL */ `
  subscription OnDeleteTasks($filter: ModelSubscriptionTasksFilterInput) {
    onDeleteTasks(filter: $filter) {
      id
      job_id
      setup
      notes
      assigned
      endtime
      starttime
      customer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateJobs = /* GraphQL */ `
  subscription OnCreateJobs($filter: ModelSubscriptionJobsFilterInput) {
    onCreateJobs(filter: $filter) {
      id
      email
      status
      customer
      endtime
      starttime
      wo_number
      permit_number
      permit
      po_number
      map
      photo
      p_confirm
      phone_number
      npat
      setup
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateJobs = /* GraphQL */ `
  subscription OnUpdateJobs($filter: ModelSubscriptionJobsFilterInput) {
    onUpdateJobs(filter: $filter) {
      id
      email
      status
      customer
      endtime
      starttime
      wo_number
      permit_number
      permit
      po_number
      map
      photo
      p_confirm
      phone_number
      npat
      setup
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteJobs = /* GraphQL */ `
  subscription OnDeleteJobs($filter: ModelSubscriptionJobsFilterInput) {
    onDeleteJobs(filter: $filter) {
      id
      email
      status
      customer
      endtime
      starttime
      wo_number
      permit_number
      permit
      po_number
      map
      photo
      p_confirm
      phone_number
      npat
      setup
      createdAt
      updatedAt
      __typename
    }
  }
`;
