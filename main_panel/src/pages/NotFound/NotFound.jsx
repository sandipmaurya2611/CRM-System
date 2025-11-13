import React from 'react';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Large 404 */}
          <div className="mb-6">
            <h1
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: "220px", // bigger size
                color: "#F97316", // orange like the image
                lineHeight: "1",
              }}
            >
              404
            </h1>
          </div>

          {/* Title & Description */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-xl mx-auto leading-relaxed">
            Sorry, we were unable to find that page.
          </p>
          <p className="text-base text-gray-500">
            Please use the main menu or choose from the categories below.
          </p>
        </div>

        {/* Home Button Only */}
        <div className="flex justify-center mt-10">
          <a
            href="/"
            className="group flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
