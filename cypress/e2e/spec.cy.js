/// <reference types="cypress" />



describe('ADMIN', () => {

  let token;
  let cityID;
  let universityID;
  let teacherID;
  const universityImageID = '63ecc138032b5114ecd065b8';
  const city = "Biratnagar";
  const university = "Testing University";
  const teacher = "Amar Singh Thapa";

  beforeEach('Admin Login', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/admin/login',
        body: {
          "username": Cypress.env('adminUserName'),
          "password": Cypress.env('adminPassword'),
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('username')
        expect(response.body.type).to.eq('superadmin')
        expect(response.body.username).to.eq(Cypress.env('adminUserName'))
        expect(response.headers).to.have.property('set-cookie')
        token = response.headers['set-cookie']
      })
    })

  describe('Admin City CRUD', () => {
    
    it('Post new City', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": city
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq(city)
        cityID = response.body._id
      })
    })

    it('Get all Cities', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('docs')
      })
    })

    it('Get City by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city/' + cityID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(cityID)
        expect(response.body.name).to.eq(city)
      })
    })
    
    it('Update City', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/city/' + cityID,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Biratnagaaar"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Biratnagaaar')
      })
    })
  })

  describe('Admin University CRUD', () => {
    
    it('Post a new University', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/university',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": university,
          "city": cityID,
          "address": "Testing Address",
          "description": "Testing Description",
          "image": universityImageID
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq(university)
        universityID = response.body._id
      })
    })

    it('Get all Universities', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/university',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('docs')
      })
    })

    it('Get University by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/university/' + universityID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(universityID)
        expect(response.body.name).to.eq(university)
      })
    })

    it('Update University', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/university/' + universityID,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Testing University Updated"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Testing University Updated')
      })
    })
  })

  describe('Admin Teacher CRUD', () => {

    it('Post a new Teacher', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/teacher',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": teacher,
          "description": "Testing Description",
          "image": universityImageID
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq(teacher)
        teacherID = response.body._id
      })
    })

    it('Get all Teachers', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/teacher',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('docs')
      })
    })

    it('Get Teacher by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/teacher/' + teacherID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(teacherID)
        expect(response.body.name).to.eq(teacher)
      })
    })

    it('Update Teacher', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/teacher/' + teacherID,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Amar Singh"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Amar Singh')
      })
    })
  })

  after(("Deleting all created", ()  => {
    cy.api({
          method: 'DELETE',
          url: Cypress.env('baseUrl') + '/city/' + cityID,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).not.to.have.property('message')
          // expect(response.body.message).to.eq('City deleted successfully')
        })
  
    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/university/' + universityID,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.have.property('message')
      // expect(response.body.message).to.eq('University deleted successfully')
    })

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/teacher/' + teacherID,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.have.property('message')
      // expect(response.body.message).to.eq('Teacher deleted successfully')
    })
  })
  )
})