import React from 'react'

function HeaderSection() {
  return (
    <div className='flex flex-row w-full h-fit justify-between'>
        <div>
        <div>
            <h1> welcome back username !</h1>
        </div>
        <div className='flex flex-row gap-x-4 items-center'>
            <figure className='w-10 h-10 bg-container'></figure>
            <h2> 37 days streaks !!</h2>
        </div>
        </div>
        

        <div>
           <figure className='h-full aspect-square bg-container'></figure> 
        </div>
    </div>
  )
}

export default HeaderSection