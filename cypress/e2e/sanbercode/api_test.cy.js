describe('Reqres.in API Automation Test', () => {
  const baseUrl = 'https://reqres.in/api';
  let headers = {};

  beforeEach(() => {
    headers = {
    'x-api-key': 'reqres-free-v1'
    };
  });

  it('GET - List Users', () => {
    cy.request({ 
      method: 'GET', 
      url: `${baseUrl}/users?page=2`,
      headers: headers,
    }
    )
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
      });
  });

  it('GET - Single User', () => {
    cy.request({ 
      method: 'GET', 
      url: `${baseUrl}/users/2`,
      headers: headers,
    }
    )
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('id', 2);
      });
  });

  it('GET - Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/100',
      failOnStatusCode: false,
      headers,
    }).then((response) => {
    expect(response.status).to.eq(404);
  });

  });

  it('POST - Create User', () => {
    cy.request({
      method: 'POST', 
      url: `${baseUrl}/users`, 
      headers: headers,
      body:{
      name: 'morpheus',
      job: 'leader',
    }}).should((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'morpheus');
    });
  });

  it('PUT - Update User', () => {
    cy.request({ 
      method: 'PUT', 
      url: `${baseUrl}/users/2`,
      headers: headers,
      body: {
      name: 'morpheus',
      job: 'zion resident',
    }}).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'zion resident');
    });
  });

  it('PATCH - Update User Partial', () => {
    cy.request({
      method: 'PATCH', 
      url: `${baseUrl}/users/2`, 
      headers: headers,
      body: {
      job: 'zion citizen',
    }}).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'zion citizen');
    });
  });

  it('DELETE - User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers: headers,
    }).should((response) => {
      expect(response.status).to.eq(204);
    });
  });


  it('POST - Register Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });


  it('POST - Register Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: headers,
      body: { email: 'sydney@fife' },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('POST - Login Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });


  it('POST - Login Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: { email: 'peter@klaven' },
      failOnStatusCode: false,
      headers,
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('GET - Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers: headers,
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });

});
