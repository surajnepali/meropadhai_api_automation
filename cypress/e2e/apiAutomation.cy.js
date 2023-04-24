/// <reference types="cypress" />

let userId;

describe('USER', () => {
  it('Login User', () => {
    cy.api({
      method: 'POST',
      url: Cypress.env('baseUrl') + '/auth/login',
      body: {
        email: Cypress.env('userEmail'),
        contact: Cypress.env('userContact'),
        password: Cypress.env('userPassword'),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('email');
      expect(response.body.name).to.eq(Cypress.env('userName'));
      expect(response.body.email).to.eq(Cypress.env('userEmail'));
      expect(response.headers).to.have.property('set-cookie');
      userId = response.body._id;
    });
  });
});

describe('ADMIN', () => {
  let token;
  let cityID;
  let universityID;
  let teacherID;
  let facultyID;
  let courseID;
  let courseUnitID;
  let coursePriceID;
  let courseChapterID;
  let imageID;
  const city = 'Biratnagar';
  const university = 'Testing University';
  const teacher = 'Amar Singh Thapa';
  const faculty = 'Testing Faculty';
  const course = 'Testing Course';
  const courseUnit = 'Testing Course Unit';
  const coursePrice = 'Testing Course Price';
  const courseChapter = 'Testing Course Chapter';

  beforeEach('Admin Login', () => {
    cy.api({
      method: 'POST',
      url: Cypress.env('baseUrl') + '/admin/login',
      body: {
        username: Cypress.env('adminUserName'),
        password: Cypress.env('adminPassword'),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('username');
      expect(response.body.type).to.eq('superadmin');
      expect(response.body.username).to.eq(Cypress.env('adminUserName'));
      expect(response.headers).to.have.property('set-cookie');
      token = response.headers['set-cookie'];
    });
  });

  describe('Admin City CRUD', () => {
    it('Post new City', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: `Bearer ${token}`,
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

    it('Get all Cities', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/city',
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(cityID);
        expect(response.body.name).to.eq(city);
      });
    });

    it('Update City', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/city/' + cityID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Biratnagaaar',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Biratnagaaar');
      });
    });
  });

  describe('Admin GET Users', () => {
    it('Get all Users', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get User by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/user/' + userId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(userId);
        expect(response.body.name).to.eq(Cypress.env('userName'));
      });
    });
  });

  describe('Admin Image CRUD', () => {
    it('Upload Image', () => {
      const dropdownOptions = ['university', 'course', 'teacher'];
      const dropdownValue =
        dropdownOptions[Math.floor(Math.random() * dropdownOptions.length)];

      cy.fixture('image.png').then((fileContent) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/png');

        const payload = new FormData();
        payload.append('for', dropdownValue);
        payload.append('image', blob, 'image.png');

        cy.api({
          method: 'POST',
          url: Cypress.env('baseUrl') + '/image',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        }).then((response) => {
          expect(response.status).to.eq(201);
        });
      });
    });

    it('Get all Images', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/image' + '?page=1&limit=100',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
        const lastObject = response.body.docs[response.body.docs.length - 1];
        imageID = lastObject._id;
        cy.log(imageID);
      });
    });

    it('Get Image by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/image/' + imageID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('for');
        expect(response.body._id).to.eq(imageID);
      });
    });
  });

  describe('Admin University CRUD', () => {
    it('Post a new University', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/university',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: university,
          city: cityID,
          address: 'Testing Address',
          description: 'Testing Description',
          image: imageID,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(university);
        universityID = response.body._id;
      });
    });

    it('Get all Universities', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/university',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get University by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/university/' + universityID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(universityID);
        expect(response.body.name).to.eq(university);
      });
    });

    it('Update University', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/university/' + universityID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Testing University Updated',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Testing University Updated');
      });
    });
  });

  describe('Admin Teacher CRUD', () => {
    it('Post a new Teacher', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/teacher',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: teacher,
          description: 'Testing Description',
          image: imageID,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(teacher);
        teacherID = response.body._id;
      });
    });

    it('Get all Teachers', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/teacher',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get Teacher by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/teacher/' + teacherID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(teacherID);
        expect(response.body.name).to.eq(teacher);
      });
    });

    it('Update Teacher', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/teacher/' + teacherID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Amar Singh',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Amar Singh');
      });
    });
  });

  describe('Admin Faculty CRUD', () => {
    it('Post a new Faculty', () => {
      cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/faculty',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: faculty,
          description: 'Testing Description',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(faculty);
        facultyID = response.body._id;
      });
    });

    it('Get all Faculties', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/faculty',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get Faculty by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/faculty/' + facultyID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(facultyID);
        expect(response.body.name).to.eq(faculty);
      });
    });

    it('Update Faculty', () => {
      cy.api({
        method: 'PATCH',
        url: Cypress.env('baseUrl') + '/faculty/' + facultyID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Faculty Updated',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Faculty Updated');
      });
    });
  });

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
    //     formData.append('image', imageID);
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
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get Course by ID', () => {
      cy.api({
        method: 'GET',
        url: Cypress.env('baseUrl') + '/course/' + Cypress.env('courseId'),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(Cypress.env('courseId'));
      });
    });
  });

  describe('Admin Course Unit CRUD', () => {
    it('Post a new Course Unit', () => {
      cy.api({
        method: 'POST',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: courseUnit,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(courseUnit);
        courseUnitID = response.body._id;
      });
    });

    it('Get all Course Units', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('docs');
      });
    });

    it('Get Course Unit by ID', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit/' +
          courseUnitID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(courseUnitID);
      });
    });

    it('Update Course Unit', () => {
      cy.api({
        method: 'PATCH',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit/' +
          courseUnitID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Course Unit Updated',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Course Unit Updated');
      });
    });
  });

  describe('Admin Course Price CRUD', () => {
    it('Post a new Course Price', () => {
      cy.api({
        method: 'POST',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/price',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: coursePrice,
          amount: 599,
          discountType: 'percent',
          discountAmount: 10,
          month: 1,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(coursePrice);
        coursePriceID = response.body._id;
      });
    });

    it('Get all Course Prices', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/price',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('docs');
      });
    });

    it('Get Course Price by ID', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/price/' +
          coursePriceID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(coursePriceID);
      });
    });

    it('Update Course Price', () => {
      cy.api({
        method: 'PATCH',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/price/' +
          coursePriceID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Course Price Updated',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Course Price Updated');
      });
    });
  });

  describe('Admin Course Chapter CRUD', () => {
    it('Post a new Course Chapter', () => {
      cy.api({
        method: 'POST',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit/' +
          courseUnitID +
          '/chapter',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: courseChapter,
          videoUrl: '1.1',
          duration: 10,
          overview: 'Testing Overview',
          summary: 'Testing summary',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(courseChapter);
        courseChapterID = response.body._id;
      });
    });

    it('Get all Course Chapters', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit/' +
          courseUnitID +
          '/chapter',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property('docs');
      });
    });

    it('Get Course Chapter by ID', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit/' +
          courseUnitID +
          '/chapter/' +
          courseChapterID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body._id).to.eq(courseChapterID);
      });
    });

    it('Update Course Chapter', () => {
      cy.api({
        method: 'PATCH',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/unit/' +
          courseUnitID +
          '/chapter/' +
          courseChapterID,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'Course Chapter Updated',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq('Course Chapter Updated');
      });
    });
  });

  describe('Admin Course Forum RD', () => {
    it('Get all forums for a course', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/forum',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('docs');
      });
    });

    it('Get a forum by ID', () => {
      cy.api({
        method: 'GET',
        url:
          Cypress.env('baseUrl') +
          '/course/' +
          Cypress.env('courseId') +
          '/forum/' +
          Cypress.env('forumId'),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message');
        expect(response.body._id).to.eq(Cypress.env('forumId'));
      });
    });
  });

  after(() => {
    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/city/' + cityID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
      // expect(response.body.message).to.eq('City deleted successfully')
    });

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/university/' + universityID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
      // expect(response.body.message).to.eq('University deleted successfully')
    });

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/teacher/' + teacherID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
      // expect(response.body.message).to.eq('Teacher deleted successfully')
    });

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/faculty/' + facultyID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
      // expect(response.body.message).to.eq('Faculty deleted successfully')
    });

    // Deleting the course api is under development

    cy.api({
      method: 'DELETE',
      url:
        Cypress.env('baseUrl') +
        '/course/' +
        Cypress.env('courseId') +
        '/unit/' +
        courseUnitID +
        '/chapter/' +
        courseChapterID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
    });

    cy.api({
      method: 'DELETE',
      url:
        Cypress.env('baseUrl') +
        '/course/' +
        Cypress.env('courseId') +
        '/unit/' +
        courseUnitID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
    });

    cy.api({
      method: 'DELETE',
      url:
        Cypress.env('baseUrl') +
        '/course/' +
        Cypress.env('courseId') +
        '/price/' +
        coursePriceID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
    });

    cy.api({
      method: 'DELETE',
      url: Cypress.env('baseUrl') + '/image/' + imageID,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).not.to.have.property('message');
    });
  });
});
