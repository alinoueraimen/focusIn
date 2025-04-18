import React from 'react'
import Avatar from './elements/avatar/Avatar'
import SettingsBtn from './elements/Settings/settingsButton'

function Profile() {
  return (
    
    <>
        <div className={`w-full h-[10%] flex flex-row justify-between items-center`}>

            <Avatar/>
            <SettingsBtn/>
  


  </div>
    </>
    
  )
}

export default Profile