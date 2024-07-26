import React from 'react'
import AccessAnywhere from '@/components/customIcons/AccessAnywhere'
import ShareNotes from '@/components/customIcons/ShareNotes'
import IntroducingIcons from '@/components/customIcons/IntroducingIcons'

const FeatureData = [
  {
    title: "Introducing tags",
    desc: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    icon: <IntroducingIcons/>
  },
  {
    title: "Share Notes Instantly",
    desc: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    icon: <ShareNotes/>
  },
  {
    title: "Access Anywhere",
    desc: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    icon: <AccessAnywhere/>
  },
]


const Features = () => {
  return (
    <div className='flex gap-2'>
      {
        FeatureData.map((feature, index) => (
          <div key={index} className='flex gap-4 p-4 bg-white rounded-lg border-[1px] border-[#F4F4F4] cursor-pointer'>
            <div className='flex items-center justify-center rounded-lg'>
              {feature.icon}
            </div>
            <div> 
              <h1 className='text-lg font-semibold'>{feature.title}</h1>
              <p className='text-sm text-gray-500'>{feature.desc}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Features