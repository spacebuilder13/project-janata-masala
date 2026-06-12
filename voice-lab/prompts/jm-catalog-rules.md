# Janata Masala Demo Catalog Rules

## Premium differentiators (ask if ambiguous)
- **Kaju 13mm** (JM-KAJU-13MM) vs Kaju Regular (JM-KAJU-REG) — CDS-style premium USP
- **Elaichi Green Premium** vs standard Elaichi

## Unit normalization
| Customer says | Map to |
|---------------|--------|
| kilo, kg, ek kilo, 1kg | kg |
| gram, gm, 500 gram, aadha kilo | kg (0.5 for aadha) |
| packet, pkt, pack, do packet | pkt |

## B2C reference order (golden)
"1kg kaju 13mm, 500g elaichi, 2 packets garam masala, 1kg haldi powder"
→ Kaju 13mm 1kg ₹920, Elaichi 0.5kg ₹340, Garam Masala x2 ₹180, Haldi 1kg ₹120 = ₹1,560

## Substitution policy
If exact SKU unavailable, offer one alternative from catalog and get yes before adding.

## Pricing
Always use price_per_unit from catalog. Multiply qty × price for line total.
