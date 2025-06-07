
import Avatar from './elements/avatar/Avatar'


function Profile() {
  return (   
    <>
        <div className={`w-full  h-[20%] xl:h-[30%] lg:h-[30%] md:h-[30%] justify-between flex flex-row lg:justify-around items-center border-b-[0.5px] mt-3 sm:justify-between md:justify-around `}>
            <Avatar/>
            {/* <SettingsBtn/> */}
  </div>
    </>
    
  )
}

export default Profile