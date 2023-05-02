/// <reference types="Cypress" />

import ENDPOINTS from '../constants/endpoints';

const createUniveristyWithoutLogin = (university) => cy.api({
    method: 'POST',
    url: Cypress.env('baseUrl') + ENDPOINTS.university,
    body: {
        name: university,
        city: Cypress.env('cityId'),
        address: 'Niva Galli',
        description: 'This is a test University',
        image: Cypress.env('universityImageId'),
    },
    failOnStatusCode: false,
});

const getUniversitiesWithoutLogin = () => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.university,
    failOnStatusCode: false,
});

const getUniversityByIDWthoutLogin = (universityID) => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
    failOnStatusCode: false,
});

const updateUniversityByIDWithoutLogin = (universityID, university) => cy.api({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
    body: {
        name: university,
    },
    failOnStatusCode: false,
});

const deleteUniversityWithoutLogin = (universityID) => cy.api({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
    failOnStatusCode: false,
});

const createUniversity = (university) => cy.api({
    method: 'POST',
    url: Cypress.env('baseUrl') + ENDPOINTS.university,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    body: {
        name: university,
        city: Cypress.env('cityId'),
        address: 'Niva Galli',
        description: 'This is a test University',
        image: Cypress.env('universityImageId'),
    },
    failOnStatusCode: false,
});

const getUniversities = () => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.university,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    failOnStatusCode: false,
});

const getUniversityByID = (universityID) => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    failOnStatusCode: false,
});

const updateUniversityByID = (universityID, university) => cy.api({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    body: {
        name: university,
    },
    failOnStatusCode: false,
});

const deleteUniversity = (universityID) => cy.api({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + ENDPOINTS.university + '/' + universityID,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    failOnStatusCode: false,
});

export default {
    createUniveristyWithoutLogin,
    getUniversitiesWithoutLogin,
    getUniversityByIDWthoutLogin,
    updateUniversityByIDWithoutLogin,
    deleteUniversityWithoutLogin,
    createUniversity,
    getUniversities,
    getUniversityByID,
    updateUniversityByID,
    deleteUniversity,
};