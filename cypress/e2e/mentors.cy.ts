describe('MentorsPage Tests', () => {
  beforeEach(() => {
    // Replace with the actual login command if authentication is required

      cy.visit('http://localhost:3001/dashboard/auth')
      cy.get('#basic_email').type('kppp35@gmail.com');
      cy.get('#basic_password').type('12345678');
      cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.visit('/dashboard/mentors');
  });

  it('should open the add mentor modal and add a mentor', () => {
    cy.get('button').contains('Add mentors').click();
    cy.get('div[role="dialog"]').should('be.visible');
    cy.get('#basic_fullName').type('New Mentor');
    cy.get('button').contains('OK').click();
    cy.get('table').find('tr').contains('New Mentor').should('exist');
  });

  it('should edit a mentor', () => {
    cy.get('button').filter('[style="color:blue;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer"]').first().click();
    cy.get('div[role="dialog"]').should('be.visible');
    cy.get('#basic_fullName').clear().type('Updated Mentor');
    cy.get('button').contains('OK').click();
    cy.get('table').find('tr').contains('Updated Mentor').should('exist');
  });

  it('should delete a mentor', () => {
    cy.get('button').filter('[style="color:blue;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer"]').first().click();
    cy.get('div[role="dialog"]').should('be.visible');
    cy.get('button').contains('Delete').first().click();
    cy.get('button').contains('Yes').click();
    // Add assertions to confirm deletion
  });
});
