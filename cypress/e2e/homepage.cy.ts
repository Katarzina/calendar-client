import '../support/commands'
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/dashboard/auth')
    cy.get('#basic_email').type('kppp35@gmail.com');
    cy.get('#basic_password').type('12345678');
    cy.get('button[type="submit"]').click();
  })
  beforeEach(() => {
    cy.visit('/')
  })
  it('Displays activities correctly', () => {
    cy.get('h1').contains('Activities');
    cy.get('.activity-item').should('have.length.at.least', 1);
  });

  it('Allows user to subscribe and unsubscribe from an activity', () => {
    // Subscribe to the first activity
    cy.get('.activity-item').first().as('firstActivity');
    cy.get('@firstActivity').then(($firstActivity) => {
      if ($firstActivity.find('.plus-icon').length > 0) {
        // If the plus icon is found, click on it
        cy.get('.plus-icon').click({ multiple: true });
        cy.wait(1000);
        cy.contains('Add to the activity?').should('be.visible');
        cy.contains('button', 'Yes').click({ multiple: true, force: true });
        cy.wait(1000);
        cy.get('@firstActivity').should('contain', 'You are added');

      } else {
        // If the plus icon is not found, look for the minus icon and click it
        if ($firstActivity.find('.minus-icon').length > 0) {
          cy.get('.minus-icon').click({ multiple: true });
          cy.contains('button', 'Yes').click({ multiple: true, force: true });
          cy.wait(1000);
          cy.get('@firstActivity').should('contain', 'You are added');
        }

      }
    })
  });
})
