import { expect, test } from '@playwright/test';

test('create student success', async ({ request }) => {
  //language=GraphQL
  const createStudentMutation = `
      mutation{
          createStudent(createStudentInput:{
              firstName: "Petr",
              lastName: "Petrov"
          }){
              id,
              firstName,
              lastName
          }
      }
  `;

  const response = await request.post('/graphql', {
    data: {
      query: createStudentMutation
    }
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toEqual({
    data: {
      createStudent: {
        id: expect.any(String),
        firstName: 'Petr',
        lastName: 'Petrov'
      }
    }
  });
});

test('create student without last name fail', async ({ request }) => {
  //language=GraphQL
  const createStudentMutation = `
      mutation{
          createStudent(createStudentInput:{
              firstName: "Petr",
          }){
              id,
              firstName,
              lastName
          }
      }
  `;

  const response = await request.post('/graphql', {
    data: {
      query: createStudentMutation
    }
  });

  expect.soft(response.ok()).toBeFalsy();
  expect.soft(response.status()).toBe(400);
  const body = await response.json();
  expect.soft(body).toEqual({
    errors: [
      {
        message: 'Field "CreateStudentInput.lastName" of required type "String!" was not provided.',
        locations: expect.any(Array),
        extensions: expect.any(Object)
      }
    ]
  });

});


test('create student without first name fail', async ({ request }) => {
  //language=GraphQL
  const createStudentMutation = `
      mutation{
          createStudent(createStudentInput:{
              lastName: "Petrov"
          }){
              id,
              firstName,
              lastName
          }
      }
  `;

  const response = await request.post('/graphql', {
    data: {
      query: createStudentMutation
    }
  });

  expect.soft(response.ok()).toBeFalsy();
  expect.soft(response.status()).toBe(400);
  const body = await response.json();
  expect.soft(body).toEqual({
    errors: [
      {
        message: 'Field "CreateStudentInput.firstName" of required type "String!" was not provided.',
        locations: expect.any(Array),
        extensions: expect.any(Object)
      }
    ]
  });
});

test('create student without input fail', async ({ request }) => {
  //language=GraphQL
  const createStudentMutation = `
      mutation{
          createStudent(createStudentInput:{}){
              id,
              firstName,
              lastName
          }
      }
  `;

  const response = await request.post('/graphql', {
    data: {
      query: createStudentMutation
    }
  });

  expect.soft(response.ok()).toBeFalsy();
  expect.soft(response.status()).toBe(400);
  const body = await response.json();
  expect.soft(body).toEqual({
    errors: [
      {
        message: 'Field "CreateStudentInput.firstName" of required type "String!" was not provided.',
        locations: expect.any(Array),
        extensions: expect.any(Object)
      },
      {
        message: 'Field "CreateStudentInput.lastName" of required type "String!" was not provided.',
        locations: expect.any(Array),
        extensions: expect.any(Object)
      }
    ]
  });
});

test('create student with invalid last name fail', async ({ request }) => {
  //language=GraphQL
  const createStudentMutation = `
      mutation{
          createStudent(createStudentInput:{
              firstName: "Petr",
              lastName: 123
          }){
              id,
              firstName,
              lastName
          }
      }
  `;

  const response = await request.post('/graphql', {
    data: {
      query: createStudentMutation
    }
  });

  expect.soft(response.ok()).toBeFalsy();
  expect.soft(response.status()).toBe(400);
  const body = await response.json();
  expect.soft(body).toEqual({
    errors: [
      {
        message: 'String cannot represent a non string value: 123',
        locations: expect.any(Array),
        extensions: expect.any(Object)
      }
    ]
  });
});
