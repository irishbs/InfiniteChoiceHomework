# InfiniteChoiceHomework
Infinite Choice Cypress coding exercise 

#########################################################

The following files are the steps I have taken while working on the following assignment.

The instructions were:

* On google.com search for "Aria Las Vegas"
* On the results page find and click on the "guestreservations.com" link.
* Landing on the Aria Resort Page book a room for a few days with 2 adults.
* Select the 1st room (cheapest) on the list and click "Book now"
* Fill out the Reservation/Billing Form with your user info and test credit card number.
* Submit the form and validate the error with an issue with the card.

Video the Process

########################################################

GoogleToDecline.cy.js is the full test file of the 3 tests below.

Files 1-3 are the breakdown of my work and how I separated it into chucks based on 
the challenges I ran into.

1-GoogleToGuestReservations - This file starts on google and attempts to find the guestreservations link.
The reoccuring issue is that guestreservations was not showing up on the 1st page for google (even while scrolling down)

2-GuestReservationsDataUpdate - This file starts with the guestreservations link that google provides and fills out the
required dates for the test and clicking on find rooms.  Cypress was timeing out and failing the test while loading the 
Rooms and rates page.  As a 'hack', I forced reset the page and it was able to validate the Room Summary and click on the 
1st/cheapest room.

3-RoomFinderToReservationsPage - This file starts on the Room Summary page and clicks on the 1st/cheapest room.  Then it 
loads and validates it is on the checkout page.  The form is filled out with data and fake credit card information.  
And the complete Registration button is clicked.   Cypress falls into a infinite redirects are occuring with url:

https://sync.crwdcntrl.net/qmap?c=1389&tp=STSC&tpid=a5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553&gdpr=0&gdpr_consent=&d=https%3A%2F%2Fpixel.tapad.com%2Fidsync%2Fex%2Fpush%3Fpartner_id%3D2499%26partner_device_id%3Da5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553%26partner_url%3Dhttps%253A%252F%252Fads.stickyadstv.com%252Fuser-registering%253FdataProviderId%253D721%2526userId%253Da5e1685c-949a-4b5f-b663-b3c87d5c2949-65fe8d00-5553%2526gdpr%253D0%2526gdpr_consent%253D

Cypress stalls out on the page and validation fails due to 'to many redirects'

(This does not occur while using chrome or in incognito mode).


###########################################################

