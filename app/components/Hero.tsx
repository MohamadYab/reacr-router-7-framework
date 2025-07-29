import React from 'react'

function Hero({ name = "[NAME]" }) {
  return (
    <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-4">
        Hey, I'm {name} 👋
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
        This is just a hero section that I am not going to fill because this is just an example project
      </p>
    </header>
  )
}

export default Hero