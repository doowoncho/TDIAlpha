/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFiles = /* GraphQL */ `
  mutation CreateFiles(
    $input: CreateFilesInput!
    $condition: ModelFilesConditionInput
  ) {
    createFiles(input: $input, condition: $condition) {
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
export const updateFiles = /* GraphQL */ `
  mutation UpdateFiles(
    $input: UpdateFilesInput!
    $condition: ModelFilesConditionInput
  ) {
    updateFiles(input: $input, condition: $condition) {
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
export const deleteFiles = /* GraphQL */ `
  mutation DeleteFiles(
    $input: DeleteFilesInput!
    $condition: ModelFilesConditionInput
  ) {
    deleteFiles(input: $input, condition: $condition) {
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
export const createTasks = /* GraphQL */ `
  mutation CreateTasks(
    $input: CreateTasksInput!
    $condition: ModelTasksConditionInput
  ) {
    createTasks(input: $input, condition: $condition) {
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
export const updateTasks = /* GraphQL */ `
  mutation UpdateTasks(
    $input: UpdateTasksInput!
    $condition: ModelTasksConditionInput
  ) {
    updateTasks(input: $input, condition: $condition) {
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
export const deleteTasks = /* GraphQL */ `
  mutation DeleteTasks(
    $input: DeleteTasksInput!
    $condition: ModelTasksConditionInput
  ) {
    deleteTasks(input: $input, condition: $condition) {
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
export const createJobs = /* GraphQL */ `
  mutation CreateJobs(
    $input: CreateJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    createJobs(input: $input, condition: $condition) {
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
export const updateJobs = /* GraphQL */ `
  mutation UpdateJobs(
    $input: UpdateJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    updateJobs(input: $input, condition: $condition) {
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
export const deleteJobs = /* GraphQL */ `
  mutation DeleteJobs(
    $input: DeleteJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    deleteJobs(input: $input, condition: $condition) {
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
