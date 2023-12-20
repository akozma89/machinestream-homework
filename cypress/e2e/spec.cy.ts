describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.title().should('include', 'MachinestreamHomework');
  });
});
