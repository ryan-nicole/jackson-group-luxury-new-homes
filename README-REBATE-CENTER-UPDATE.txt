JACKSON GROUP — NEW HOME REBATE CENTER UPDATE

CHANGES INCLUDED

1. HEADER
Now matches the Search Homes page / latest homepage-style header.

2. FOOTER
Now matches the Search Homes page / latest friendly footer.

3. REBATE CALCULATOR
Now matches the simplified homepage calculator:
- Visitor only enters new-home price.
- Compensation and rebate share are hidden from the public page.
- Calculator reads the Jackson Group admin rebate settings from:
  jg-admin-rebates
- During the prototype phase, changes made in Admin → Rebates on the same browser
  affect this calculator.
- When the real backend is connected later, admin changes will become global
  for all visitors.

4. SPRINT 6 PART A SECTION
Removed the development-language section.
Replaced with:
"Your Next Step — Use your estimate as the beginning of the conversation."

UPLOAD
Replace your current rebates folder with this rebates folder.


LATEST REBATE CENTER REFINEMENTS

1. CALCULATOR SIDE STEPS
Removed the old numbered 1 / 2 / 3 instruction list.
Replaced it with useful post-estimate actions:
- Register Before You Tour
- Complete Your Builder Form
- Compare Homes & Builders

2. HERO / HEADER SPACING
Adjusted the top hero so its spacing aligns much more closely with the Search Homes
and other Jackson Group pages.

UPLOAD
Replace your current rebates folder with this latest rebates folder.


LATEST PHOTO UPDATE

- The uploaded Downtown Austin street/high-rise photo is now included inside
  this package at:
  assets/austin-rebate-center.jpg
- It is used as the New Home Rebate Center hero photo.
- This ZIP is the complete latest Rebate Center version and replaces the
  previous jackson-group-rebates-updated.zip.

UPLOAD:
Replace the existing rebates folder with this ZIP's rebates folder.
Also upload/merge the assets folder so assets/austin-rebate-center.jpg is present.
Do not delete unrelated files from your site's existing assets folder.


PHOTO FIX
The actual hero image layer is .rebate-center-media. This version targets that
layer directly, so assets/austin-rebate-center.jpg displays as the Rebate Center
hero image.


BUILDER FORM SECTION UPDATE

- Added the Builder Form directly on the New Home Rebate Center page.
- Placement:
  Rebate Estimator → Builder Form → Your Next Step
- Any "Fill Out Builder Form" / "Complete Your Builder Form" CTA on this page
  now scrolls to the Builder Form section.
- The primary button inside the Builder Form section still opens the actual
  registration form.
- Added smooth scrolling and mobile-responsive layout.


FINAL REBATE STRUCTURE
- Home price below $450,000: 0.75% estimated rebate.
- Home price $450,000 and above: 1.00% estimated rebate.
- Calculator increment: $50,000.
- Visitors can still manually type any purchase price.
- Values are preserved in rebate-program-config.json for future Admin/backend wiring.
