# CleanFlow AI — Home & Office Cleaning Website

A website for a home and office cleaning business. It has 5 pages:

| Page | What it does |
|---|---|
| **Home** (`/`) | Introduction, services, how it works |
| **Services** (`/services`) | 6 services with what's included, add-ons, recurring discounts |
| **Price Estimate** (`/estimate`) | Instant approximate price (CAD) from size, bedrooms, frequency and add-ons |
| **Booking** (`/booking`) | Booking request form, checked on the server, gives a reference number |
| **AI Assistant** (`/chat`) | Answers questions about services, scheduling, pricing and the process (Claude) |

> **All prices are SAMPLE prices.** Change them in **`lib/prices.js`** — that one file is used by the estimate page, the booking page and the AI assistant, so they always show the same numbers.
>
> **Gheymat-ha NEMUNE hastand.** Faghat file-e `lib/prices.js` ro avaz kon; hame ja khodesh dorost mishe.

---

## ⚠️ Important: bookings are NOT saved yet

There is **no database** in this version. When a customer sends a booking:
- the form is checked and they get a confirmation + reference number,
- the booking is only written to the **server log** (on Vercel: Project → *Logs*).

It is **not stored** and **no email is sent**. Before using this with real customers, add a database (for example Supabase) or an email service in `app/api/booking/route.js`.

**Mohem:** Felan database nadarim. Reserve-ha **zakhire nemishan** va email ham ferestade nemishe — faghat to "Logs"-e Vercel didé mishan. Ghabl az estefade baraye moshtari-e vaghei, bayad database ya email ezafe beshe.

---

## AI Assistant

- With a Claude API key, the assistant uses Claude (Anthropic).
- **Without a key, the site still works**: the assistant uses simple built-in answers from `lib/faqs.js` and the price list.
- The key stays on the server and is never sent to the browser.
- Edit the questions/answers in **`lib/faqs.js`**.

Get a key: <https://console.anthropic.com> → *API Keys* → *Create Key* (paid usage; the default model `claude-haiku-5-5` is the low-cost one).

**Finglish:** Age API key-e Claude nadari, assistant baz ham kar mikone (ba javab-haye sade). Baraye AI-e vaghei, az console.anthropic.com yek key begir.

---

## Put it online (GitHub → Vercel) — get a live URL

### English
1. Put this folder in a GitHub repository (upload the files, **not** `node_modules` or `.next`).
2. Go to <https://vercel.com> and sign in **with GitHub**.
3. Click **Add New… → Project**, find your repository and click **Import**.
4. (Optional) Open **Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your Claude key
5. Click **Deploy**. After about a minute you get a live address like `https://cleanflow-ai.vercel.app`.
6. Every time you change a file in GitHub, Vercel updates the site automatically.

### Finglish
1. In folder ro to yek repository-e GitHub bezar (bedun-e `node_modules` va `.next`).
2. Boro be **vercel.com** va ba **GitHub** sign in kon.
3. **Add New… → Project** ro bezan, repository-et ro peyda kon va **Import** ro bezan.
4. (Ekhtiyari) to **Environment Variables**, `ANTHROPIC_API_KEY` ro ba key-e Claude ezafe kon.
5. **Deploy** ro bezan. Ba'd az hodud-e yek daghighe, yek address migiri mesl-e `https://cleanflow-ai.vercel.app`.
6. Har bar file-i ro to GitHub avaz koni, site khodesh update mishe.

---

## Run it on your computer (optional)

Needs **Node.js 20 or newer** (<https://nodejs.org>).

```bash
npm install
cp .env.example .env.local   # optional: put your ANTHROPIC_API_KEY inside
npm run dev
```
Open <http://localhost:3000>.

**Finglish:** Node.js nasb kon, ba'd in 3 dastur ro bezan va to browser `localhost:3000` ro baz kon.

---

## Where to change things

| What | File |
|---|---|
| Prices, services, add-ons, discounts, time slots | `lib/prices.js` |
| How the estimate is calculated | `lib/estimate.js` |
| FAQ answers for the assistant | `lib/faqs.js` |
| Assistant instructions | `lib/assistant.js` |
| Booking checks | `lib/validateBooking.js` |
| Booking handling (add database/email here) | `app/api/booking/route.js` |
| Colours and design | `app/globals.css` |

Built with Next.js (App Router), plain JavaScript and CSS.
