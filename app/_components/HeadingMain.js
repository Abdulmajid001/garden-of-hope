export function HeadingMainGreen({heading, description}) {
  return (
    <div className="flex flex-col gap-8 mb-[9.6rem]">
      <h2 className="text-green-dark font-bold text-5xl sm:text-6xl">{heading}</h2>
      <p className="text-green-dark text-3xl sm:text-4xl">{description}</p>
    </div>
  )
}

export function HeadingMainGold({heading, description}) {
  return (
    <div className="flex flex-col gap-8 mb-[9.6rem]">
      <h2 className="text-gold-light font-bold text-5xl sm:text-6xl">{heading}</h2>
      <p className="text-gold-light text-3xl sm:text-4xl">{description}</p>
    </div>
  )
}