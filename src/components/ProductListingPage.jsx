function ProductListingPage() {
  const products = [
    {
      id: 1,
      name: 'ACNE-GREY-CARGO-SKIRT',
      price: 'GHC 300',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 2,
      name: 'WIDE JEAN PANT',
      price: 'GHC 900',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 3,
      name: 'SHERPA TEDDY COAT',
      price: 'GHC 550',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 4,
      name: 'EMERALD GOWN',
      price: 'GHC 700',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 5,
      name: 'TIE-WAIST MIDI DRESS',
      price: 'GHC 200',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 6,
      name: 'CROCHET LACE',
      price: 'GHC 150',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 7,
      name: 'ONE-PIECE SWIMSUIT',
      price: 'GHC 99',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 8,
      name: 'HALTER LACE DRESS',
      price: 'GHC 300',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 9,
      name: 'PEPLUM SLEEVE MIDI DRESS',
      price: 'GHC 500',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 10,
      name: 'FLORAL MINI DRESS',
      price: 'GHC 600',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 11,
      name: 'IVORY LACE BLOUSE',
      price: 'GHC 200',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 12,
      name: 'NAVY BLUE FLOWER GIRL',
      price: 'GHC 160',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 13,
      name: 'GIRLS FORMAL DRESS',
      price: 'GHC 300',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 14,
      name: 'RIBBON SATIN GOWN',
      price: 'GHC 800',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 15,
      name: 'MAJOLICA-PRINT SHIRT',
      price: 'GHC 250',
      image: '/placeholder.svg?height=300&width=250',
    },
    {
      id: 16,
      name: 'RELAXED DEMIN SHORT',
      price: 'GHC 650',
      image: '/placeholder.svg?height=300&width=250',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-purple-600 text-white text-center py-2 text-sm font-medium">
        SUMMER SALES ONGOING
      </div>

      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-600">Misqobi</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
              </button>
              <button className="text-purple-600 hover:text-purple-700 font-medium">Help</button>
              <button className="text-purple-600 hover:text-purple-700 font-medium">Login</button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 font-medium">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <button className="flex items-center text-gray-700 hover:text-purple-600 font-medium">
                ALL CATEGORIES
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-purple-600 font-medium">
                BEST SELLERS
              </button>
              <button className="text-gray-700 hover:text-purple-600 font-medium">
                NEWEST ARRIVALS
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-700 hover:text-purple-600 font-medium">
                SORT BY
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button className="flex items-center text-gray-700 hover:text-purple-600 font-medium">
                FILTER
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="flex space-x-2">
                <button className="p-1 text-purple-600 bg-purple-100 rounded">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h4v4H3V3zm6 0h4v4H9V3zm6 0h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9zM3 15h4v4H3v-4zm6 0h4v4H9v-4zm6 0h4v4h-4v-4z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-400 hover:text-purple-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative group">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-t-lg"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wide">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <button className="p-2 border border-gray-300 rounded-md hover:border-purple-600 hover:text-purple-600 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-12 space-x-2">
          <button className="px-3 py-2 text-gray-500 hover:text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
          <button className="px-3 py-2 text-purple-600 bg-purple-100 rounded-md font-medium">
            1
          </button>
          <button className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md">
            2
          </button>
          <button className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md">
            3
          </button>
          <span className="px-3 py-2 text-gray-500">...</span>
          <button className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md">
            52
          </button>
          <button className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md">
            53
          </button>
          <button className="px-3 py-2 text-gray-500 hover:text-purple-600">
            Next
            <svg
              className="w-5 h-5 ml-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProductListingPage;
