
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
function SettingsBtn() {
  return (
    <>
      <div className='h-full aspect-square grid place-items-center '>
        <button className='h-[70%] aspect-square
        bg-[#D9D9D9] rounded-lg p-1 text-white font-semibold 
        ' title="settings">
          <FontAwesomeIcon className="text-[#877373]" icon={faGear} />
        </button>
    </div>
    </>
  )
}

export default SettingsBtn