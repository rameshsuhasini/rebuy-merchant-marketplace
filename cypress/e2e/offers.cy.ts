describe('rebuy marketplace E2E', () => {
  const baseUrl = 'http://localhost:4200';

  it('loads offers list, navigates to detail and persists upvote', () => {
    cy.visit(`${baseUrl}/offers`);

    cy.get('[data-testid="offer-card"]').should('have.length.at.least', 1);

    cy.get('[data-testid="offer-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="offer-details-button"]').click();
      });

    cy.url().should('match', /\/offers\/\d+$/);

    cy.get('[data-testid="detail-votes"]')
      .invoke('text')
      .then((text) => {
        const initialVotes = parseInt(text.match(/(\d+)/)![1], 10);

        cy.get('[data-testid="detail-upvote"]').click();

        cy.get('[data-testid="detail-votes"]')
          .invoke('text')
          .then((afterText) => {
            const afterVotes = parseInt(afterText.match(/(\d+)/)![1], 10);
            expect(afterVotes).to.eq(initialVotes + 1);
          });

        cy.reload();

        cy.get('[data-testid="detail-votes"]')
          .invoke('text')
          .then((reloadText) => {
            const reloadVotes = parseInt(reloadText.match(/(\d+)/)![1], 10);
            expect(reloadVotes).to.eq(initialVotes + 1);
          });
      });
  });
});
