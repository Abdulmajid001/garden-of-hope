import React from 'react'

function PageHeading({ heading, description }) {
  return (
    <div className="flex flex-col gap-8 mb-[6rem]">
      <h2 className="text-green-dark  font-bold text-2xl md:text-4xl">{heading}</h2>
      <p className="text-green-dark text-xl sm:text-2xl">{description}</p>
    </div>
  )
}

export default PageHeading