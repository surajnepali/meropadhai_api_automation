/// <reference types="cypress" />



describe('ADMIN', () => {

  let token;
  let cityID;
  let universityID;
  let teacherID;
  let facultyID;
  let courseID;
  let courseUnitID;
  let coursePriceID;
  const city = "Biratnagar";
  const university = "Testing University";
  const teacher = "Amar Singh Thapa";
  const faculty = "Testing Faculty";
  const course = "Testing Course";
  const courseUnit = "Testing Course Unit";
  const coursePrice = "Testing Course Price";

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
          "image": Cypress.env('universityImageId')
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
          "image": Cypress.env('teacherImageId')
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

  describe('Admin Faculty CRUD', () => {

    it('Post a new Faculty', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/faculty',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": faculty,
          "description": "Testing Description",
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq(faculty)
        facultyID = response.body._id
      })
    })

    it('Get all Faculties', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/faculty',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('docs')
      })
    })

    it('Get Faculty by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/faculty/' + facultyID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(facultyID)
        expect(response.body.name).to.eq(faculty)
      })
    })

    it('Update Faculty', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/faculty/' + facultyID,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Faculty Updated"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Faculty Updated')
      })
    })

  })

  describe('Admin Course CRUD', () => {

    // it('Post a new Course', () => {
    //   cy.fixture('course.pdf', 'binary')
    //   .then(Cypress.Blob.binaryStringToBlob)
    //   .then((blob) => {
    //     const formData = new FormData();
    //     formData.append('name', course);
    //     formData.append('faculty', facultyID);
    //     formData.append('university', universityID);
    //     formData.append('teacher', teacherID);
    //     formData.append('previewVideoUrl', Cypress.env('previewVideoUrl'));
    //     formData.append('image', Cypress.env('courseImageId'));
    //     formData.append('note', blob, 'course.pdf');

    //     cy.api({
    //       method: 'POST',
    //       url: Cypress.env('baseUrl') + '/course',
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: `Bearer ${token}`
    //       },
    //       body: formData
    //     }).then((response) => {
    //       expect(response.status).to.eq(201)
    //       expect(response.body).to.have.property('name')
    //       expect(response.body.name).to.eq(course)
    //       courseID = response.body._id
    //     })
    //   })
    // })

    it('Get all Courses', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('docs')
      })
    })

    it('Get Course by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId'),
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(Cypress.env('courseId'))
      })
    })

  })  

  describe('Admin Course Unit CRUD', () => {

    it('Post a new Course Unit', () => {
      
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/unit',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": courseUnit,
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq(courseUnit)
        courseUnitID = response.body._id
      })

    })

    it('Get all Course Units', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/unit',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).not.to.have.property('docs')
      })
    })

    it('Get Course Unit by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/unit/' + courseUnitID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(courseUnitID)
      })
    })

    it('Update Course Unit', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/unit/' + courseUnitID,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Course Unit Updated"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Course Unit Updated')
      })
    })

  })

  describe('Admin Course Price CRUD', () => {

    it('Post a new Course Price', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/price',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": coursePrice,
          "amount": 599,
          "discountType": "percent",
          "discountAmount": 10,
          "month": 1
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq(coursePrice)
        coursePriceID = response.body._id
      })

    })

    it('Get all Course Prices', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/price',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).not.to.have.property('docs')
      })
    })

    it('Get Course Price by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/price/' + coursePriceID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body._id).to.eq(coursePriceID)
      })
    })

    it('Update Course Price', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/price/' + coursePriceID,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Course Price Updated",
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eq('Course Price Updated')
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

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/faculty/' + facultyID,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.have.property('message')
      // expect(response.body.message).to.eq('Faculty deleted successfully')
    })

    // Deleting the course api is under development

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/unit/' + courseUnitID,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.have.property('message')
    })

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId') + '/price/' + coursePriceID,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.have.property('message')
    })

  })
  )
})