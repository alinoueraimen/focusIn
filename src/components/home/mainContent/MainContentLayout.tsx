import {ReactNode} from 'react'
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';
import Profile from './profile/Profile';

interface MainContentLayoutProps {
    children: ReactNode;
    highlight?: boolean
}

function MainContentLayout({children,highlight} : MainContentLayoutProps) {
  const {isSectionDisplayed} = useTaskManagementContext()
  return (
    <>
       <div className={`
        w-full
        
        h-full     
        flex
        flex-col
        justify-between
        py-5
        px-5
        
        ${
            highlight && 'bg-container'
        }
        `}>
            <Profile/>
            {children}
        </div>
    </>
  )
}

export default MainContentLayout