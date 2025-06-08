import {ReactNode} from 'react'

import Profile from './profile/Profile';

interface MainContentLayoutProps {
    children: ReactNode;
    
}

function MainContentLayout({children} : MainContentLayoutProps) {
 
  return (
    <>
       <div className={`
        w-screen
        h-screen     
        flex
        flex-col
        px-5
        overflow-x-hidden
        overflow-y-hidden
        `}>
            <Profile/>
            {children}
        </div>
    </>
  )
}

export default MainContentLayout