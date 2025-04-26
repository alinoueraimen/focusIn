import {ReactNode} from 'react'

interface MainContentLayoutProps {
    children: ReactNode;
    highlight?: boolean
}

function MainContentLayout({children,highlight} : MainContentLayoutProps) {
  return (
    <>
       <div className={`
        w-[70%]
        h-full     
        flex
        flex-col
        justify-between
        py-[20px]
        px-[40px]
        ${
            highlight && 'bg-container'
        }
        `}>
            {children}
        </div>
    </>
  )
}

export default MainContentLayout