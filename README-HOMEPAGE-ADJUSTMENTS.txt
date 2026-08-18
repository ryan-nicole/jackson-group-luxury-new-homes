JACKSON GROUP — CONSOLIDATED HOMEPAGE ADJUSTMENTS

THIS PACKAGE INCLUDES ALL REQUESTED HOMEPAGE CHANGES:

1. REBATE CALCULATOR
- Removed visible compensation input
- Removed visible rebate-share input
- Visitor only enters the new-home price
- Result still calculates from the Jackson Group settings
- The calculator reads the existing admin-prototype localStorage key:
  jg-admin-rebates
- Your admin Rebate Settings can therefore change the hidden calculation defaults
  on the same browser during the prototype phase.
- Later, the real backend will make admin changes global for all website visitors.

2. HERO NOTE
Made "Connect before your first builder tour..." larger and easier to read.

3. FEATURED THIS MONTH — BUILDER SPOTLIGHT
Removed the builder photo and converted it to a polished dark luxury card.

4. FEATURED BUILDERS INTRO
Rewritten to sound appropriate for the public website.

5. FEATURED BUILDERS
Expanded to:
- Highland Homes
- Perry Homes
- Chesmar Homes
- KB Home
- D.R. Horton
- Brohn Homes
- Taylor Morrison
- Toll Brothers
- Meritage Homes
- Coventry Homes
- David Weekley Homes
- Pulte Homes

6. BUILDER FORM
Added a dedicated homepage section explaining the Jackson Group builder form,
with:
- Fill Out My Builder Form
- See How It Works
- form preview

7. FOOTER
Rebuilt to be easier to navigate and much friendlier on mobile.
The mobile Register Before You Tour treatment is now a clean link rather than
an awkward large footer button.

8. TOP NAVIGATION
Made Search Homes / Explore Communities / Builders / etc. larger while retaining
compact spacing so the navigation still fits.

ALSO RETAINED:
- Austin skyline homepage image
- Search Homes navigation item
- previous improved header spacing

UPLOAD:
Replace:
- root index.html
- root script.js

Also keep/upload:
- assets/austin-homepage-hero.jpg

Do not delete your other website files/folders.


LATEST HOMEPAGE DIRECTION — SEARCH FIRST

The homepage now begins with:
1. FIND YOUR NEXT HOME
2. MLS / IDX-ready home search
3. SEARCH YOUR WAY:
   - Search by City
   - Search by Neighborhood
   - Search by Builder
   - Explore New Construction

Per request, the hero does NOT say "in Central Texas" and does NOT immediately
list cities.

The existing lower homepage sections remain in place for now so the rest of the
homepage flow can be decided after reviewing this new top portion.

The MLS/IDX box is a design-ready placeholder until the approved IDX provider
and secure backend/admin connection are added.


LATEST HOMEPAGE FLOW

The homepage is now intentionally limited to this order:

1. Find Your Next Home + main MLS/IDX-ready search
2. Search Your Way
3. Before You Tour — includes a clear new-home rebate hook
4. Estimate Your New Home Rebate
5. Builder PDF Form
6. What Can We Help You With?
7. Featured — cities / subdivisions / communities only
8. Dedicated New Construction MLS/IDX Search
9. Footer

FEATURED ADMIN CONTROL
The Featured section is prepared to be managed from Admin.
Allowed featured item types:
- city
- subdivision
- community

The admin data model supports:
- title
- subtitle
- description
- image
- link
- publish/unpublish
- sort order

No builder spotlight and no rebate highlight are included in Featured.

The rest of the old homepage sections were intentionally removed for now so the
lower homepage flow can be decided after reviewing this version.


FINAL REBATE STRUCTURE
- Home price below $450,000: 0.75% estimated rebate.
- Home price $450,000 and above: 1.00% estimated rebate.
- Calculator increment: $50,000.
- Visitors can still manually type any purchase price.
- Values are preserved in rebate-program-config.json for future Admin/backend wiring.
