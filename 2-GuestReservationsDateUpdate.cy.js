/// <reference types="cypress" />

//Part 2:
//This test file runs the followig steps:
//Goes to the expected google.com link for guestreservations - Aria site
//Select 2 days in June for 2 adults
//Attempts to "Find Rooms", loads page, and validates "Summary"

describe('GuestReservations site to Room Results Page', () => {

    it('Fill out reservation data and submit', () => {
    cy.visit('https://www.guestreservations.com/aria-resort-casino/booking?gad_source=1');
    cy.get('.hotel-name').should('have.text', 'ARIA Resort & Casino');

    cy.get('input[id="check_in_view"]').click();

    //Open the check in calander and click ahead 3 months to June 13th
    cy.get('.datepicker-days > .table-condensed > thead > :nth-child(2) > .next').click();
    cy.get('.datepicker-days > .table-condensed > thead > :nth-child(2) > .next').click();
    cy.get('.datepicker-days > .table-condensed > thead > :nth-child(2) > .next').click();
    cy.get('[data-date="1718236800000"]').click();

    //Open the check out calendar and click the 16th (of June)
    cy.get('input[id="check_out_view"]').click();
    cy.get('[data-date="1718496000000"]').click();

    //CLick on the Submit button to Find Rooms            
    cy.get('button[type="submit"]').click();


    cy.reload();

    //Wait for trip summary to appear on next page
    cy.get('.trip-summary-title').should('be.visible');
    ///BUG page takes too long to load and Cypress fails to find "trip-summary-title"
    cy.get('body > div.flex-shrink-0 > main > form > div.bg-light-gray.body-hotel > div.hotel-rooms-types > div > div > div.hotel-rooms.group-items > div:nth-child(1) > div.d-flex.room-info > div.body.no-gutters > div.room-items.row.no-gutters > div > div > div.col.info.d-flex.align-items-center > div > a').click();

    });
});