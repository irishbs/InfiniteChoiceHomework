/// <reference types="cypress" />

///This test file is to do the followig steps:
//Go to goolge.com and Search for Aria Las Vegas
//From the results page find the guestreservation.com link and click on it


describe('Google to GuestReservations site', () => {

    it('Search for Aria Las Vegas', () => {
        cy.clearCookies();

        cy.visit('https://www.google.com');
        
        cy.get('textarea[name="q"]').type('Aria Las Vegas{enter}');

        cy.get('a[data-pcu="https://ariaresortandcasino.guestreservations.com/,https://www.guestreservations.com/"]').click();

        cy.get('span [data-dtld="guestreservations.com"]').click();

    });
});