///reference types="cypress" />

describe('City', () => {

    let cityID;
    const city = "Dharan"

    beforeEach(() => {
        cy.adminLogin();
    })

    it('Create City', () => {
        cy.api({
            method: 'POST',
            url: Cypress.env('baseUrl') + '/city',
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('adminToken')
            },
            body: {
                name: city,
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.eq(city);
            cityID = response.body._id;
        })
    })
});