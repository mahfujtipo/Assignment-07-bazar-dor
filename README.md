# বাজার দর | Bazar Dor

A Bengali-language web application that helps users explore daily market prices, compare product prices, track price changes, and browse products by category.

## ✨ Features

- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Daily Market Prices:** Displays current product prices in Bengali.
- **Price Change Tracking:** Highlights products with rising and falling prices.
- **Product Categories:** Browse products by category.
- **Product Details:** View individual product information and market-wise prices.
- **Product Sorting:** Sort products by default order, lowest price, or highest price.
- **User Authentication:** Sign up and sign in using email and password.
- **Social Authentication:** Supports Google and GitHub sign-in through Better Auth.
- **User Profile:** Access profile information after signing in.
- **Loading States:** Displays loading indicators while data is being fetched.
- **Notifications:** Provides feedback using toast notifications.
- **Bengali Interface:** Uses Bengali text and a Bengali-friendly font.
- **Price Ticker:** Displays product prices and their changes in a scrolling ticker.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and routing |
| React | User interface development |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Responsive styling |
| Better Auth | Authentication |
| MongoDB | Database integration |
| React Toastify | Toast notifications |
| REST API | Product and category data |
| Vercel | Deployment |

## 📁 Project Structure

```text
Bazar-Dor/
├── public/
│   ├── logo-icon.png
│   └── bazar-hero.png
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   │
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       ├── loading.tsx
│   │   │       ├── page.tsx
│   │   │       └── ProductDetailClient.tsx
│   │   │
│   │   ├── Signin/
│   │   │   └── page.tsx
│   │   ├── Signup/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── catagories.tsx
│   │   ├── Footer.tsx
│   │   ├── Herosection.tsx
│   │   ├── Marquee.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductsMarqueeWrapper.tsx
│   │
│   └── lib/
│       ├── auth.ts
│       └── auth-client.ts
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

*Note: This folder structure is illustrative. Update filenames and folders to match your actual project.*

## 🌐 API Endpoints

The application uses the Bazar Dor API to retrieve product and category information.

**Base URL:** `https://api.api-store.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/categories` | Retrieves available product categories |
| `/products` | Retrieves product information |

Example full URLs:

- Categories: https://api.api-store.workers.dev/api/bazardor/categories
- Products: https://api.api-store.workers.dev/api/bazardor/products

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- A MongoDB database

### 1. Clone the Repository and analise the project through live link

git clone YOUR_GITHUB_REPOSITORY_URL: https://github.com/mahfujtipo/Assignment-07-bazar-dor

 versel live link :https://assignment-07-bazar-dor-uyys.vercel.app/


### 2. Navigate to the Project Directory

cd Bazar-Dor

### 3. Install Dependencies

npm install

### 4. Start the Development Server

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

npm run build

To run the production build locally:

npm run start

## 🔐 Authentication

Bazar Dor uses Better Auth for user authentication.

Supported authentication methods:

- Email and password
- Google OAuth
- GitHub OAuth

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes:

- **Desktop:** Full navigation and multi-column product layouts.
- **Tablet:** Adapted navigation and product grids.
- **Mobile:** Compact navigation and responsive product layouts.

## 🚢 Deployment

The application can be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required deployment settings.
4. Deploy the application.
5. Verify the production URL, authentication flows, API requests, and dynamic routes.

## 🎯 Project Objectives

- Make daily market-price information easier to access.
- Present product prices through a clear Bengali interface.
- Help users explore product categories and compare prices.
- Provide a responsive and user-friendly browsing experience.
- Implement authentication and dynamic routing using Next.js.

## 👨‍💻 Author

Name:Mahafujul Alam Tipo

GitHub:https://github.com/mahfujtipo

## 📄 License

This project was developed for educational purposes. Add a license file if you intend to distribute the project under a specific open-source license.