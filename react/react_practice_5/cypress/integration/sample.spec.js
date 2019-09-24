describe('main component', () => {
  it('헤더가 있어야 한다', () => {
    cy.visit('http://localhost:8080/');

    cy.get('h1')
      .should('have.text', 'hello tdd');
  });
});
