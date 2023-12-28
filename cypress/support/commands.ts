Cypress.Commands.add('login', (url) => {
    cy.visit(url);
    // Add the commands to perform the login operation
    // e.g., filling out a form and clicking a submit button
    cy.get('input[name="username"]').type('kppp35@gmail.com');
    cy.get('input[name="password"]').type('12345678');
    cy.get('form').submit();
});
