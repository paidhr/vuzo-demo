type props = {
  children: JSX.Element | JSX.Element[]
  className?: string
}

export const TopActionBar: React.FC<props> = ({ className, children }) => {
  return (
    <div className={` ${className}`}>
      <div
        className={`w-full flex justify-between items-center py-2.5  px-4 md:px-6 lg:px-10 border-y border-y-neutral40 h-[58px] bg-white`}
      >
        {children}
      </div>
    </div>
  )
}
