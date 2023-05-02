/// reference types="cypress" />

import ENDPOINTS from "../Constants/endpoints";

describe('University API', () => {

    let universityID;
    const university = "Testing University"

    describe('Try to access University API without login', () => {

        it("Can't post new University without admin Login", () => {
            cy.api({
                method: 'POST',
                url: Cypress.env('baseUrl') + ENDPOINTS.university,
                body: {
                    name: university,
                    city: Cypress.env('cityId'),
                    address: 'Niva Galli',
                    description: 'This is a test University',
                    image: Cypress.env('universityImageId'),
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't get all Universities without admin Login", () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + ENDPOINTS.university,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't get a University by ID without admin Login", () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/642010afe8fdad4f9593a2b6',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't edit a University by ID without admin Login", () => {
            cy.api({
                method: 'PATCH',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/642010afe8fdad4f9593a2b6',
                body: {
                    name: university,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't delete a University by ID without admin Login", () => {
            cy.api({
                method: 'DELETE',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/642010afe8fdad4f9593a2b6',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })
    })

    describe('Access University API after login', () => {
        beforeEach(() => {
            cy.adminLogin();
        })

        it('Post new University', () => {
            cy.api({
                method: 'POST',
                url: Cypress.env('baseUrl') + ENDPOINTS.university,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                body: {
                    name: university,
                    city: Cypress.env('cityId'),
                    address: 'Niva Galli',
                    description: 'This is a test University',
                    image: Cypress.env('universityImageId'),
                }
            }).as('addUniversity');
            
            cy.get('@addUniversity').then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body).to.have.property('image');
                expect(response.body.name).to.eq(university);
                universityID = response.body._id;
            })

        })

        it("Can't post new University with same name", () => {
            cy.api({
                method: 'POST',
                url: Cypress.env('baseUrl') + ENDPOINTS.university,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                body: {
                    name: university,
                    city: Cypress.env('cityId'),
                    address: 'Niva Galli',
                    description: 'This is a test University',
                    image: Cypress.env('universityImageId'),
                },
                failOnStatusCode: false
            }).as('cannotPostWithSameName');
            
            cy.get('@cannotPostWithSameName').then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University with name ' + university + ' already exists');
            })
        })

        it('Get all Universities', () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + ENDPOINTS.university,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                }
            }).as('getAllUniversities');
            
            cy.get('@getAllUniversities').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('docs');
                expect(response.body.docs).to.be.an('array');
                expect(response.body.docs[response.body.docs.length - 1]._id).to.eq(universityID);
            })
        })

        it('Get a University by ID', () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/'+ universityID,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                }
            }).as('getUniversityByID');
            
            cy.get('@getUniversityByID').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body).to.have.property('image');
                expect(response.body.name).to.eq(university);
            })
        })

        it("Can't get a University by ID with wrong ID", () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/642010afe8fdad4f9593a2b6',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                failOnStatusCode: false
            }).as('cannotGetByInvalidID');
            
            cy.get('@cannotGetByInvalidID').then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University not found');
            })
        })

        it('Edit a University by ID', () => {
            cy.api({
                method: 'PATCH',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                body: {
                    name: 'University Name Updated',
                }
            }).as('editUniversityByID');
            
            cy.get('@editUniversityByID').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body.name).to.eq('University Name Updated');
            })
        })

        it("Can't edit a University by ID with wrong ID", () => {
            cy.api({
                method: 'PATCH',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/642010afe8fdad4f9593a2b6',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                body: {
                    name: 'University Name Updated',
                },
                failOnStatusCode: false
            }).as('cannotEditByInvalidID');
            
            cy.get('@cannotEditByInvalidID').then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University not found');
            })
        })

        it("Can't delete a University by ID with wrong ID", () => {
            cy.api({
                method: 'DELETE',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/642010afe8fdad4f9593a2b6',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                failOnStatusCode: false
            }).as('cannotDeleteByInvalidID');
            
            cy.get('@cannotDeleteByInvalidID').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).not.to.have.property('message');
            })
        })

        it("Delete a University by ID", () => {
            cy.api({
                method: 'DELETE',
                url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                }
            }).as('deleteUniversity');

            cy.get('@deleteUniversity').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).not.to.have.property('message');
            })

        })
    })

})