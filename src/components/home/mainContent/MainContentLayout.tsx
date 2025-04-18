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