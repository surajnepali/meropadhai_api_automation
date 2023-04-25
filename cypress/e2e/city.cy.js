///reference types="cypress" />

describe('City API', () => {
  describe('Try to access City API without login', () => {
    it("Can't post new City without admin Login", () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/city',
        body: {
          name: 'Dharan',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't get all Cities without admin Login", () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't get a City by ID without admin Login", () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city/642010afe8fdad4f9593a2b6',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't edit a City by ID without admin Login", () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/city/642010afe8fdad4f9593a2b6',
        body: {
          name: 'Dharaan',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't delete a City by ID without admin Login", () => {
      cy.api({
        method: 'DELETE',
        url: Cypress.env('baseUrl') + '/city/642010afe8fdad4f9593a2b6',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });
  });

  describe('Access City API after login', () => {
    let cityID;
    const city = 'Dharan';

    beforeEach(() => {
      cy.adminLogin();
    });

    it('Post new City', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
        body: {
          name: city,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(city);
        cityID = response.body._id;
      });
    });

    it("Can't post another City with same name", () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
        body: {
          name: city,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq(
          'City with name ' + city + ' already exists'
        );
      });
    });

    it('Get all Cities', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get City by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city/' + cityID,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(cityID);
        expect(response.body.name).to.eq(city);
      });
    });

    it("Can't get City by invalid ID", () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city/642010afe8fdad4f9593a2b6',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('City not found');
      });
    });

    it('Update City', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/city/' + cityID,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
        body: {
          name: 'Dharaan',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Dharaan');
      });
    });

    it("Can't update City with invalid ID", () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/city/642010afe8fdad4f9593a2b6',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
        body: {
          name: 'Dharaan',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('City not found');
      });
    })

    it("Can't delete City with invalid ID", () => {
      cy.api({
        method: 'DELETE',
        url: Cypress.env('baseUrl') + '/city/642010afe8fdad4f9593a2b6',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('message');
      });
    });

    it('Delete City', () => {
      cy.api({
        method: 'DELETE',
        url: Cypress.env('baseUrl') + '/city/' + cityID,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('message');
      });
    });
  });
});
