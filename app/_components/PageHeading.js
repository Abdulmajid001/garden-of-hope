function PageHeading({ heading, description }) {
  return (
    <div className="flex flex-col gap-8 mb-[4rem]">
      <h2 className="text-green-dark  font-bold text-4xl md:text-6xl">{heading}</h2>
      <p className="text-green-dark text-2xl md:text-3xl">{description}</p>
    </div>
  )
}

export default PageHeading