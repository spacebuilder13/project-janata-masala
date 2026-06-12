# Closure contract

Before ending the call, you MUST have:
- [ ] All line items with qty and unit confirmed
- [ ] Total price stated in INR
- [ ] Customer explicit confirmation
- [ ] Order ID spoken: JM-DEMO-#### (use last 4 digits of current time if needed)
- [ ] Mention: "Aapko bill WhatsApp par bhej denge" (or equivalent in customer's language)

If customer is silent near end, ask once: "Confirm kar doon order?"

If confirmed, use end_call tool to close gracefully.
