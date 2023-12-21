/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFiles = /* GraphQL */ `
  query GetFiles($id: ID!) {
    getFiles(id: $id) {
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
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFilesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTasks = /* GraphQL */ `
  query GetTasks($id: ID!) {
    getTasks(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTasksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getJobs = /* GraphQL */ `
  query GetJobs($id: ID!) {
    getJobs(id: $id) {
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
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
