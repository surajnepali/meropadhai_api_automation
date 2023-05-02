///reference types="cypress" />

import city from '../api/city.api';

describe('City API', () => {

  let cityID;
  const cityName = 'Dharan';
  const updateCity = 'Dharaan';
  const invalidCityID = '642010afe8fdad4f9593a2b6';

  describe('Try to access City API without login', () => {
    it("Can't post new City without admin Login", () => {
      city.createCityWithoutLogin(cityName).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't get all Cities without admin Login", () => {
      city.getCitiesWithoutLogin().then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't get a City by ID without admin Login", () => {
      city.getCityByIDWithoutLogin(invalidCityID).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't edit a City by ID without admin Login", () => {
      city.updateCityByIDWithoutLogin(invalidCityID, cityName).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });

    it("Can't delete a City by ID without admin Login", () => {
      city.deleteCityWithoutLogin(invalidCityID).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Unauthorized');
      });
    });
  });

  describe('Access City API after login', () => {

    beforeEach(() => {
      cy.adminLogin();
    });

    it('Post new City', () => {
      city.createCity(cityName).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(cityName);
        cityID = response.body._id;
      });
    });

    it("Can't post another City with same name", () => {
      city.createCity(cityName).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq(
          'City with name ' + cityName + ' already exists'
        );
      });
    });

    it('Get all Cities', () => {
      city.getCities().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get City by ID', () => {
      city.getCityByID(cityID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(cityID);
        expect(response.body.name).to.eq(cityName);
      });
    });

    it("Can't get City by invalid ID", () => {
      city.getCityByID(invalidCityID).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('City not found');
      });
    });

    it('Update City', () => {
      city.updateCityByID(cityID, updateCity).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Dharaan');
      });
    });

    it("Can't update City with invalid ID", () => {
      city.updateCityByID(invalidCityID, updateCity).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('City not found');
      });
    })

    it("Can't delete City with invalid ID", () => {
      city.deleteCity(invalidCityID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('message');
      });
    });

    it('Delete City', () => {
      city.deleteCity(cityID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('message');
      });
    });
  });
});