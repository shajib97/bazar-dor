# 🛒 বাজার দর — Bazar Dor

Bazar Dor is a responsive website for viewing everyday product prices,
comparing prices across markets, and tracking price increases and decreases.

## 🔗 Project Links

- Live Website: ADD_YOUR_LIVE_LINK
- GitHub Repository: ADD_YOUR_REPOSITORY_LINK

## 🛠️ Technologies Used

- Next.js App Router
- TypeScript
- Tailwind CSS
- DaisyUI
- BetterAuth
- MongoDB Atlas
- React Hot Toast
- React Fast Marquee
- React Icons

## ✨ Key Features

1. Product prices displayed with Bengali numerals and price-change badges.
2. Category pages with sorting by price from low to high or high to low.
3. Homepage sections showing the top six price increases and decreases.
4. Continuously scrolling product-price ticker.
5. Protected product details with market-specific prices and price summaries.
6. Email/password, Google, and GitHub authentication.
7. Protected profile page with a separate form for updating the user's name.
8. Skeleton loading states, toast notifications, and a friendly 404 page.
9. Responsive layouts for mobile, tablet, and desktop.

## 📊 Price Calculations

- Minimum price: the lowest minimum price across the listed markets.
- Maximum price: the highest maximum price across the listed markets.
- Average price: the average of each market's minimum/maximum midpoint.

## 🚀 Run Locally

Install dependencies:

npm install

Create a .env file in the project root with your own values:

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_generated_secret
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

Start the development server:

npm run dev

Open http://localhost:3000 in your browser.

## 🔐 Local OAuth Callback URLs

Google:
http://localhost:3000/api/auth/callback/google

GitHub:
http://localhost:3000/api/auth/callback/github

For an existing password account, sign in first to link an additional
social login method.

## 🏗️ Production Commands

Build the project:

npm run build

Start the production server:

npm run start

## 📡 API

Base URL:
https://openapi.programming-hero.com/api/bazardor

Endpoints:

- /categories
- /categories/chal
- /products
- /products?category=chal
- /products/1
