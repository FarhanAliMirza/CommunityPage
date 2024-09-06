import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { OrbitingCirclesComponent } from './OrbitingCirclesComponent'
import StarsCanvas from '../StarCanvas/StarCanvas'

const features = [
  {
    name: 'About us.',
    description:
      'Dev Commune fosters a dynamic environment for tech enthusiasts to connect, learn, and innovate through workshops, meetups, and hackathons. We empower members to excel in their careers and stay ahead in the tech industry.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Resource Sharing.',
    description: 'Creating a repository of valuable resources such as tutorials, articles, and tools that members can access to enhance their knowledge and skills.',
    icon: LockClosedIcon,
  },
  {
    name: 'Ready for scale.',
    description: 'Dev Commune scales up through hands-on workshops, networking meetups, and hackathons, fostering collaborative learning and innovation among tech enthusiasts and professionals.',
    icon: ServerIcon,
  },
]

export default function AboutUs() {
  return (
    <div className="overflow-hidden w-full z-30" id='about'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Mission</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight  dark:text-white text-gray-900 sm:text-4xl">Unite. Collaborate. Innovate.</p>
              <p className="mt-6 text-lg leading-8  dark:text-gray-400 text-gray-600">
              Empowering tech enthusiasts through collaboration and open-source innovation.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold dark:text-gray-100 text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline dark:text-gray-400">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <OrbitingCirclesComponent />
        </div>
      </div>
    </div>
  )
}
