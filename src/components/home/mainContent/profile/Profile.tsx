
import Avatar from './elements/avatar/Avatar'


function Profile() {
  return (   
    <>
        <div className={`w-full  h-[20%] xl:h-20 lg:h-20 md:h-20 justify-between flex flex-row lg:justify-start items-center border-b-[0.5px] mt-3 sm:justify-start md:justify-start `}>
            <Avatar/>
            {/* <SettingsBtn/> */}
  </div>
    </>
    
  )
}

export default Profile