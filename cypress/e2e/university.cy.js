/// reference types="cypress" />

import university from "../api/university.api";

describe('University API', () => {

    let universityID;
    const universityName = "Testing University";
    const updatedUniversity = "Updated University";
    const invalidUniversityID = '642010afe8fdad4f9593a2b6';

    describe('Try to access University API without login', () => {

        it("Can't post new University without admin Login", () => {
            university.createUniveristyWithoutLogin(universityName).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't get all Universities without admin Login", () => {
            university.getUniversitiesWithoutLogin().then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't get a University by ID without admin Login", () => {
            university.getUniversityByIDWthoutLogin(universityID).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't edit a University by ID without admin Login", () => {
            university.updateUniversityByIDWithoutLogin(invalidUniversityID, updatedUniversity).then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('Unauthorized');
            })
        })

        it("Can't delete a University by ID without admin Login", () => {
            university.deleteUniversityWithoutLogin(invalidUniversityID).then((response) => {
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
            university.createUniversity(universityName).as('addUniversity');
            
            cy.get('@addUniversity').then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body).to.have.property('image');
                expect(response.body.name).to.eq(universityName);
                universityID = response.body._id;
            })

        })

        it("Can't post new University with same name", () => {
            university.createUniversity(universityName).as('cannotPostWithSameName');
            
            cy.get('@cannotPostWithSameName').then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University with name ' + universityName + ' already exists');
            })
        })

        it('Get all Universities', () => {
            university.getUniversities().as('getAllUniversities');
            
            cy.get('@getAllUniversities').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('docs');
                expect(response.body.docs).to.be.an('array');
                expect(response.body.docs[response.body.docs.length - 1]._id).to.eq(universityID);
            })
        })

        it('Get a University by ID', () => {
            university.getUniversityByID(universityID).as('getUniversityByID');
            
            cy.get('@getUniversityByID').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body).to.have.property('image');
                expect(response.body.name).to.eq(universityName);
            })
        })

        it("Can't get a University by ID with wrong ID", () => {
            university.getUniversityByID(invalidUniversityID).as('cannotGetByInvalidID');
            
            cy.get('@cannotGetByInvalidID').then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University not found');
            })
        })

        it('Edit a University by ID', () => {
            university.updateUniversityByID(universityID, updatedUniversity).as('editUniversityByID');
            
            cy.get('@editUniversityByID').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('city');
                expect(response.body).to.have.property('address');
                expect(response.body).to.have.property('description');
                expect(response.body.name).to.eq(updatedUniversity);
            })
        })

        it("Can't edit a University by ID with wrong ID", () => {
            university.updateUniversityByID(invalidUniversityID).as('cannotEditByInvalidID');
            
            cy.get('@cannotEditByInvalidID').then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.eq('University not found');
            })
        })

        it("Can't delete a University by ID with wrong ID", () => {
            university.deleteUniversity(invalidUniversityID).as('cannotDeleteByInvalidID');
            
            cy.get('@cannotDeleteByInvalidID').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).not.to.have.property('message');
            })
        })

        it("Delete a University by ID", () => {
            university.deleteUniversity(universityID).as('deleteUniversity');

            cy.get('@deleteUniversity').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).not.to.have.property('message');
            })

        })
    })

})