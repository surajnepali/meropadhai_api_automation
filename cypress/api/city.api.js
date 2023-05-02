/// <reference types="cypress" />

import ENDPOINTS from '../constants/endpoints';

const createCityWithoutLogin = (city) => cy.api({
    method: 'POST',
    url: Cypress.env('baseUrl') + ENDPOINTS.city,
    body: {
        name: city,
    },
    failOnStatusCode: false,
});

const getCitiesWithoutLogin = () => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.city,
    failOnStatusCode: false,
});

const getCityByIDWithoutLogin = (cityID) => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.city + '/' + cityID,
    failOnStatusCode: false,
});

const updateCityByIDWithoutLogin = (cityID, city) => cy.api({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + ENDPOINTS.city + '/' + cityID,
    body: {
        name: city,
    },
    failOnStatusCode: false,
});

const deleteCityWithoutLogin = (cityID) => cy.api({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + ENDPOINTS.city + '/' + cityID,
    failOnStatusCode: false,
});

const createCity = (city) => cy.api({
    method: 'POST',
    url: Cypress.env('baseUrl') + ENDPOINTS.city,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    body: {
        name: city,
    },
    failOnStatusCode: false,
});

const getCities = () => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.city,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    failOnStatusCode: false,
});

const getCityByID = (cityID) => cy.api({
    method: 'GET',
    url: Cypress.env('baseUrl') + ENDPOINTS.city + '/' + cityID,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    failOnStatusCode: false,
});

const updateCityByID = (cityID, city) => cy.api({
    method: 'PATCH',
    url: Cypress.env('baseUrl') + ENDPOINTS.city + '/' + cityID,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    body: {
        name: city,
    },
    failOnStatusCode: false,
});

const deleteCity = (cityID) => cy.api({
    method: 'DELETE',
    url: Cypress.env('baseUrl') + ENDPOINTS.city + '/' + cityID,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
    },
    failOnStatusCode: false,
});

export default {
    createCityWithoutLogin,
    getCitiesWithoutLogin,
    getCityByIDWithoutLogin,
    updateCityByIDWithoutLogin,
    deleteCityWithoutLogin,
    createCity,
    getCityByID,
    updateCityByID,
    deleteCity,
    getCities,
};