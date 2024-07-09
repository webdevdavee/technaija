# Technaija

Technaija is a feature-rich e-commerce website built with Next.js, TypeScript, MongoDB, Zod, and React Hook Form. It offers a seamless shopping experience with Paystack integration for payments and Clerk for authentication.

## Features

### For Shoppers
- **Shopping Cart**: Easily add products to cart
- **Wishlist**: Save items for future purchase
- **Product Reviews**: Leave and read product reviews
- **Product Variations**: Select from different product options
- **User Profiles**: Create and manage billing addresses

### For Checkout
- **Saved Billing**: Use saved billing address for quicker checkout
- **Secure Payments**: Integrated with Paystack payment gateway

## Tech Stack
- **Frontend**: Next.js, TypeScript, React Hook Form
- **Backend**: Next.js Server Actions
- **Database**: MongoDB
- **Authentication**: Clerk
- **Form Validation**: Zod
- **Payment Processing**: Paystack

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/technaija.git
```
2. Install dependencies
```bash 
cd technaija
npm install
```
3. Set up environment variables
- Create a .env.local file in the root directory
- Add necessary environment variables (MongoDB URI, Clerk secret, Paystack API key, etc.)
4. Run the development server
```bash
npm run dev
```
5. Open http://localhost:3000 in your browser to see the application
