/// <reference types="cypress" />


///This test file is to do the followig steps:
//Go to goolge.com and Search for Aria Las Vegas
//From the results page find the guestreservation.com link and click on it
//Select 2 days in June for 2 adults
//Find the cheapest Room and book now
//Fill out the CC information
//Verify CC declined

 describe('Google to GuestReservations site', () => {

    it('Search for Aria Las Vegas', () => {
        cy.visit('https://www.google.com');
        
        cy.get('textarea[name="q"]').type('Aria Las Vegas{enter}');

        cy.get('a[data-pcu="https://ariaresortandcasino.guestreservations.com/,https://www.guestreservations.com/"]').click();
    // });
    //data-pcu="https://ariaresortandcasino.guestreservations.com/,https://www.guestreservations.com/"
    //'span[data-dtld="guestreservations.com"]'
    // it('Search for guestreservations link', () => {
        //cy.get('#search a').invoke("attr", "href").then(href => console.log(herf))
    });

    it('Fill out reservation data and submit', () => {
            cy.visit('https://www.guestreservations.com/aria-resort-casino/booking?gad_source=1');
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
            //cy.get('body > div.flex-shrink-0 > main > form > div.bg-light-gray.body-hotel > div.block-room-rares > div > div.block-search-form.js-wrap-booking-form > div > div.block-book-info.d-flex.justify-content-between.info > div').should('be.visible');
            cy.get('.trip-summary-title').should('be.visible');
            cy.get('body > div.flex-shrink-0 > main > form > div.bg-light-gray.body-hotel > div.hotel-rooms-types > div > div > div.hotel-rooms.group-items > div:nth-child(1) > div.d-flex.room-info > div.body.no-gutters > div.room-items.row.no-gutters > div > div > div.col.info.d-flex.align-items-center > div > a').click();

    });

    it('Book Cheapest room and fill out reservation form to purchase', () => {
        cy.visit('https://www.guestreservations.com/aria-resort-casino/booking?checkIn=07%2F09%2F2024&checkOut=07%2F10%2F2024&rooms=1&adults%5B1%5D=2&children%5B1%5D=0');

        cy.get('.trip-summary-title').should('be.visible');
        cy.get('body > div.flex-shrink-0 > main > form > div.bg-light-gray.body-hotel > div.hotel-rooms-types > div > div > div.hotel-rooms.group-items > div:nth-child(1) > div.d-flex.room-info > div.body.no-gutters > div.room-items.row.no-gutters > div > div > div.col.info.d-flex.align-items-center > div > a').click();

        cy.url().should('contains', 'https://www.guestreservations.com/aria-resort-casino/hotelcheckout');

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
        //cy.url().should('contains', 'https://www.guestreservations.com/aria-resort-casino/hotelcheckout');

        //Error investigate why infinite redirects are occuring with url
        //https://sync.crwdcntrl.net/qmap?c=1389&tp=STSC&tpid=a5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553&gdpr=0&gdpr_consent=&d=https%3A%2F%2Fpixel.tapad.com%2Fidsync%2Fex%2Fpush%3Fpartner_id%3D2499%26partner_device_id%3Da5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553%26partner_url%3Dhttps%253A%252F%252Fads.stickyadstv.com%252Fuser-registering%253FdataProviderId%253D721%2526userId%253Da5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553%2526gdpr%253D0%2526gdpr_consent%253D
        cy.get('.div[id="w0"]').should("have.text","Credit card number or card holder data is incorrect.");
    });


    
});
