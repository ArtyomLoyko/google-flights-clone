# [Flight Search Application](https://artyomloyko.github.io/google-flights-clone)

A modern flight search application built with React 19, TanStack Query, and Tailwind CSS. This application provides a Google Flights-like experience with real-time flight search capabilities.

![Flight Search Form](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yHOHf7hjNnPIFcJQMDgCisN8jP4K76.png)

## Features

### 🔍 Smart Search
- Real-time airport search with autocomplete
- Support for multiple airports in the same city
- Intelligent search suggestions with airport codes and city names

### 🎨 Modern UI/UX
- Clean, responsive design
- Beautiful winter-themed hero section
- Smooth transitions and animations
- Loading states with skeleton UI
- Calendar picker for dates

![Search Interface](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pVXmdKeBVv9V98n5aQEi8v8OuE4XX7.png)

### ✈️ Flight Results
- Comprehensive flight information
- Multiple airline support
- Price comparison
- Duration and stops information
- Airline logos and branding

![Flight Results](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rNVxwrnEhSUwGuIfoFcxVPTF6cj1OZ.png)

### 🛠️ Technical Features
- Built with React 19
- Real-time data fetching with TanStack Query
- Type-safe with TypeScript
- Styled with Tailwind CSS and shadcn/ui
- Responsive design for all devices
- Loading states and error handling

![Loading States](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7wFFMYpRqXGkMWZt8Z3dGZq1CRk1er.png)

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- RapidAPI key for the Sky Scrapper API

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flight-search-app.git
cd flight-search-app
```

2. Install dependencies:


```shellscript
npm install
```

3. Create a `.env` file in the root directory:


```plaintext
VITE_RAPIDAPI_KEY=your_api_key_here
VITE_RAPIDAPI_HOST=api_host
```

4. Start the development server:


```shellscript
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```shellscript
npm run build
```

The built files will be in the `dist` directory.

## Environment Variables

The following environment variables are required:

- `VITE_RAPIDAPI_KEY`: Your RapidAPI key for accessing the Sky Scrapper API
- `VITE_RAPIDAPI_HOST`: Host of RapidAPI


## Tech Stack

- React 19
- TypeScript
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Vite
- React Router
- date-fns
- Lucide React icons


## Features in Detail

### Airport Search

- Debounced search to prevent excessive API calls
- Rich airport information including city and country
- Support for airport codes and city names
- Caching of search results for better performance


### Flight Search Form

- Round trip/One-way toggle
- Passenger count selection
- Cabin class selection
- Date range picker
- Airport swap functionality
- Form validation


### Flight Results

- Sort by price, duration, or stops
- Detailed flight information
- Airline logos and branding
- Price comparison
- Loading states with skeleton UI
