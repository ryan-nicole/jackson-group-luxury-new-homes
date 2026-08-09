JACKSON GROUP — SPRINT 4: REGISTRATION SYSTEM

WHAT THIS SPRINT ADDS
- Full "Register Before You Tour" buyer registration experience
- Buyer details
- City / builder / community
- Budget and move-in timeline
- Visited-builder status
- Need-to-sell-current-home field
- First-time buyer field
- Multi-select buyer preferences
- Completed Jackson Group builder-form preview
- Print My Form
- Download PDF
- Email My Form integration-ready button
- Wise Agent CRM integration-ready status
- Print-specific formatting

UPLOAD TO YOUR EXISTING GITHUB REPOSITORY
Upload the entire "register" folder from this package.

The files are:
register/index.html
register/register.css
register/register.js

Your existing root styles.css and other pages do not need to be deleted.

IMPORTANT: WHAT WORKS NOW
- Registration form
- Completed form generation
- Print button
- PDF download button (uses jsPDF from a public CDN)
- Confirmation experience

WHAT IS PREPARED BUT NOT LIVE YET
- Automatic email delivery
- Wise Agent CRM contact creation / tagging

WHY THOSE TWO REQUIRE A BACKEND
CRM and email credentials must never be stored in public browser JavaScript.
The secure integration should be added through a server-side API / serverless function
when the platform moves to its backend-enabled architecture.

LATER, WHEN YOU PROVIDE YOUR FINAL BUILDER FORM
We can replace the current Jackson Group builder-form layout with your exact form
while keeping the buyer answers, PDF generation, print workflow, email delivery,
and Wise Agent sync.

WISE AGENT DATA PLAN (future backend)
Suggested contact fields / tags:
- Name
- Email
- Phone
- City
- Builder
- Community
- Budget
- Timeline
- Already Visited Builder
- Needs to Sell
- First-Time Buyer
- Preferences
- Notes
Tags can include:
Website Lead
New Construction
Rebate
<City>
<Builder>
Needs to Sell (if applicable)

EMAIL FLOW (future backend)
After successful registration:
1. Create/update Wise Agent contact.
2. Generate PDF server-side or preserve client-generated document.
3. Email the PDF to the buyer.
4. Show confirmation page with Print + Download.
5. Optionally notify Jackson Group by email.
