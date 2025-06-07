

function SessionalTaskSection() {
  return (
    <>
    <div className="w-full h-[30%]  gap-x-3 flex flex-col 
          py-[30px]
          px-[20px]
          justify-between
          border-b-[0.5px]
          border-b-text
          ">
            <h1 className='font-semibold text-lg text-text'>Session</h1>
            <div className='flex justify-center gap-x-5'>
            <div className="h-10 aspect-square bg-container rounded-full grid place-items-center">
              <p className="font-extrabold text-white text-xl">1</p>
            </div>
            <div className="h-10 aspect-square bg-container rounded-full grid place-items-center">
              <p className="font-extrabold text-white text-xl">2</p>
            </div>
            <div className="h-10 aspect-square bg-container rounded-full grid place-items-center">
              <p className="font-extrabold text-white text-xl">3</p>
            </div>
            
            </div>
            <div className="w-full h-fit flex justify-center text-text">
              - all session -
            </div>
          </div>
    </>
  )
}

export default SessionalTaskSection