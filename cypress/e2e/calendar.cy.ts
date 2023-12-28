import dayjs from 'dayjs';
describe('template spec', () => {
  describe('DashboardPage Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/dashboard/auth')
      cy.get('#basic_email').type('kppp35@gmail.com');
      cy.get('#basic_password').type('12345678');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.visit('/dashboard'); // Replace with actual URL

    });

    it('displays activities on calendar', () => {
      cy.get('h1').contains('Events');
      cy.get('.rbc-calendar').should('be.visible'); // Replace with actual class or identifier
    });

    it('opens modal to add new activity', () => {
      cy.get('button').contains('Add activities').click();
      cy.get('.ant-modal-content').should('be.visible'); // Replace with actual class or identifier of the modal
      cy.get('#basic_activity').type('New Activity');
      cy.get('#basic_theme').type('New Theme');
      //cy.get('.ant-select').select('New Mentor');
      cy.get('.ant-select').click(); // Open the dropdown
      cy.contains('.ant-select-item', 'New Mentor').click()
      const currentDate = dayjs().format('YYYY-MM-DD');
      const currentDay = dayjs().date();
      cy.get('#basic_startDate').click();

// Select a specific day from the calendar pop-up
// This example selects the 15th day of the current displayed month
      cy.get('.ant-picker-panel')
          .contains('Today')
          .click();
      cy.get('#basic_startTime').click();
      cy.get('.ant-picker-time-panel-column')
          .eq(0) // Select the first column for hours
          .find('.ant-picker-time-panel-cell-inner')
          .contains('04')
          .click();

      cy.get('.ant-picker-time-panel-column')
          .eq(1) // Select the second column for minutes
          .find('.ant-picker-time-panel-cell-inner')
          .contains('30')
          .click();

// Optionally, click the "OK" button if it's required to finalize the time selection
      cy.get('.ant-picker-ok').click();
     /* cy.get('#basic_endDate').click();

// Select a specific date from the calendar dropdown
      cy.get('.ant-picker-panel .ant-picker-cell-inner')
          .contains(currentDay) // Replace '27' with the desired day
          .click();*/
      cy.get('#basic_endDate').type(currentDate, { force: true });

      cy.get('#basic_endTime').type('10:00',)

// Open the time picker dropdown
     // cy.get('#basic_endTime').click();

// Select a specific hour and minute from the time dropdown
      /*cy.get('.ant-picker-time-panel-column')
          .eq(0) // First column for hours
          .find('.ant-picker-time-panel-cell-inner')
          .contains('06' ) // Replace '10' with the desired hour
          .click({force: true});
      cy.get('.ant-picker-time-panel-column')
          .eq(1) // Second column for minutes
          .find('.ant-picker-time-panel-cell-inner')
          .contains('30') // Replace '30' with the desired minute
          .click({force: true});*/

// Optionally, click the "OK" button if it's required to finalize the selection
     // cy.get('.ant-picker-ok').first().click({force: true});


      //cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click();
      cy.get('button').contains('OK').click({force: true});
    });

    });
  });
