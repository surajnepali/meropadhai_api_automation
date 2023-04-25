/// reference types="cypress" />

describe('University API', () => {

    let univeristyID;
    const university = "Testing University"

    describe('Try to access University API without login', () => {

        it("Can't post new University without admin Login", () => {
            cy.api({
                method: 'POST',
                url: Cypress.env('baseUrl') + '/university',
                body: {
                    name: 'Dharan',
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
                url: Cypress.env('baseUrl') + '/university',
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
                url: Cypress.env('baseUrl') + '/university/642010afe8fdad4f9593a2b6',
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
                url: Cypress.env('baseUrl') + '/university/642010afe8fdad4f9593a2b6',
                body: {
                    name: 'Dharaan',
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
                url: Cypress.env('baseUrl') + '/university/642010afe8fdad4f9593a2b6',
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
                url: Cypress.env('baseUrl') + '/university',
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
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body).to.have.property('image');
                expect(response.body.name).to.eq(university);
                univeristyID = response.body._id;
            })

        })

        it("Can't post new University with same name", () => {
            cy.api({
                method: 'POST',
                url: Cypress.env('baseUrl') + '/university',
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
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University with name ' + university + ' already exists');
            })
        })

        it('Get all Universities', () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + '/university',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('docs');
                expect(response.body.docs).to.be.an('array');
                expect(response.body.docs[response.body.docs.length - 1]._id).to.eq(univeristyID);
            })
        })

        it('Get a University by ID', () => {
            cy.api({
                method: 'GET',
                url: Cypress.env('baseUrl') + '/university/' + univeristyID,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                }
            }).then((response) => {
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
                url: Cypress.env('baseUrl') + '/university/642010afe8fdad4f9593a2b6',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University not found');
            })
        })

        it('Edit a University by ID', () => {
            cy.api({
                method: 'PATCH',
                url: Cypress.env('baseUrl') + '/university/' + univeristyID,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                body: {
                    name: 'University Name Updated',
                }
            }).then((response) => {
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
                url: Cypress.env('baseUrl') + '/university/642010afe8fdad4f9593a2b6',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                body: {
                    name: 'University Name Updated',
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University not found');
            })
        })

        it("Can't delete a University by ID with wrong ID", () => {
            cy.api({
                method: 'DELETE',
                url: Cypress.env('baseUrl') + '/university/642010afe8fdad4f9593a2b6',
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).not.to.have.property('message');
            })
        })

        it("Delete a University by ID", () => {
            cy.api({
                method: 'DELETE',
                url: Cypress.env('baseUrl') + '/university/' + univeristyID,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('adminToken'),
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).not.to.have.property('message');
            })

        })
    })

})