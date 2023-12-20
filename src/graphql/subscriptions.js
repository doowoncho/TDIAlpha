/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      __typename
    }
  }
`;
