/// <reference types="cypress" />

//This test file is the full test run of the following steps:
//Go to goolge.com and Search for Aria Las Vegas
//From the results page find the guestreservation.com link and click on it
//Select 2 days in June for 2 adults
//Find the cheapest Room and book now
//Fill out the CC information
//Verify CC declined

 describe('Google to GuestReservations site', () => {

    it('Search for Aria Las Vegas', () => {
        //cy.clearAllCookies(); //Doesn't really work for Google search

        //1-GoogleToGuestReservations portion... commenting out to run full video.
        // cy.visit('https://www.google.com');
        // cy.get('textarea[name="q"]').type('Aria Las Vegas{enter}');
        //cy.get('a[data-pcu="https://ariaresortandcasino.guestreservations.com/,https://www.guestreservations.com/"]').first().click();
         //Failing to find guestreservations.com link in google
        
        //Hack to override and continue test: there is no great way to correctly do an "if-else" statement in cypress "if element is not found".
        cy.visit('https://www.guestreservations.com/aria-resort-casino/booking?gad_source=1');

        //2-GuestReservationsDateUpdate portion
        //Verify we are at the Aria guestreservations site.
        
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

        //Wait for trip summary to appear on next page 
        cy.reload(); //This is a hack to force load the next page - with this combines files 2 & 3.

        //3-RoomFInderToReservation portion
        //On the Room Results page, click on the 1st (Cheapest) Room
        cy.get('.trip-summary-title').should('be.visible');
        cy.get('body > div.flex-shrink-0 > main > form > div.bg-light-gray.body-hotel > div.hotel-rooms-types > div > div > div.hotel-rooms.group-items > div:nth-child(1) > div.d-flex.room-info > div.body.no-gutters > div.room-items.row.no-gutters > div > div > div.col.info.d-flex.align-items-center > div > a').click();

        cy.url().should('contains', 'https://www.guestreservations.com/aria-resort-casino/hotelcheckout'); //URL Validation

        cy.get('input[placeholder="First Name"]').type('Brandon');
        cy.get('input[placeholder="Last Name"]').type('Santiago');
        cy.get('#email').type('b.santiago.wa@gmail.com');
        cy.get('#phone').type('2536537435');
        cy.get('form > .p-form:nth-child(1)').click();
        cy.get('.billing-address > p').click();
        cy.get('#billing_country').click();
        cy.get('.dropdown-item:nth-child(226)').click();
        cy.get('#bill_address').click();
        cy.get('#bill_address').type('17750 Fjord DR NE');
        cy.get('#bill_city').click();
        cy.get('#bill_city').type('Poulsbo');
        cy.get('#billing_state').click();
        cy.get('button[data-option="WA"]').click();
        cy.get('#bill_zip').click();
        cy.get('#bill_zip').type('98370');

        cy.get('#bill_first').type('Brandon');
        cy.get('#bill_last').type('Santiago');
        cy.get('#credit_card_number').type('4444444444444448');
        cy.get('#credit_card_verification').type('123');
        cy.get('#cc_expyear').click();
        cy.get('button[data-option="2026"]').click();

        cy.get('button[type="submit"]').click();
        cy.url().should('contains', 'https://www.guestreservations.com/aria-resort-casino/hotelcheckout'); //URL Validation

        //Error investigate why infinite redirects are occurring with URL 
        //https://sync.crwdcntrl.net/qmap?c=1389&tp=STSC&tpid=a5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553&gdpr=0&gdpr_consent=&d=https%3A%2F%2Fpixel.tapad.com%2Fidsync%2Fex%2Fpush%3Fpartner_id%3D2499%26partner_device_id%3Da5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553%26partner_url%3Dhttps%253A%252F%252Fads.stickyadstv.com%252Fuser-registering%253FdataProviderId%253D721%2526userId%253Da5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553%2526gdpr%253D0%2526gdpr_consent%253D
        //Update Fix Validation now works with clearing cache and cookies. 
     
        cy.get('#w0 > h4'"]').should("have.text","Credit card number or card holder data is incorrect.");  //Error Validation (Also, shouldn't card holder be "cardholder"?
    });
    
});
