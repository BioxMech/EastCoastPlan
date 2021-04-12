# EastCoastPlan

With the plethora of recreational facilities available, Singaporeans may find it troublesome to remember which platforms to use when making bookings for their facilities of choice. With that, EastCoastPlan is a Public Facility Booking Application that acts as a centralized platform for Singaporeans to view public facilities, make bookings and pay efficiently. The inuitive UI and seamless processes will ensure users get the best and most convenient experience while making bookings for their favourite facilities.

# Functions Available

## Universal

- Registration and Login
- Make a booking
- Payment

## User

- Report facility for damage

## Admin

- Manage availability of facilities

# Instructions

- Import database into localhost
  - payment.sql
  - facility.sql
  - booking.sql
  - users.sql
  - report.sql
- <install npm stuff for frontend - Json help >

- Import kong configuration using KONGA
  1. After kong and KONGA is running, go to http://localhost:1337
  2. Create an account and log in
  3. Create a connection with
  - Name: default
  - Kong Admin URL: http://kong:8001
  4. Go to snapshot and select IMPORT FROM FILE
  5. Select the file provided "kongconfig.json"
  6. Open the snapshot and restore
  - Restore services and plugins first
  - Then restore the routes
