describe('HomePage Tests', () => {
    beforeEach(() => {
        // Mock login (adjust according to your app's authentication flow)
        //cy.login(); // This is a custom command you'll need to define for logging in

        // Visit the home page
        cy.visit('/');
    });

    it('Displays activities correctly', () => {
        cy.get('h1').contains('Activities');
        cy.get('.activity-item').should('have.length.at.least', 1);
    });

    it('Allows user to subscribe and unsubscribe from an activity', () => {
        // Subscribe to the first activity
        cy.get('.activity-item').first().as('firstActivity');
        cy.get('@firstActivity').find('.plus-icon').click();
        cy.get('@firstActivity').should('contain', 'You are added');

        // Unsubscribe from the same activity
        cy.get('@firstActivity').find('.minus-icon').click();
        cy.get('@firstActivity').should('not.contain', 'You are added');
    });

    // Add more test cases as needed
});

