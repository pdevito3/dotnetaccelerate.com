import clsx from 'clsx'
import Link from 'next/link'
import Search from 'src/components/Search'
import LogoNoText from './Logo/LogoNoText'
import LogoWithText from './Logo/LogoWithText'
// import { Logo } from 'src/components/Logo'

export function Header({ navIsOpen, onNavToggle }) {
  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-center w-full py-3 space-x-2 bg-white border-b border-gray-200 lg:z-50 max-w-8xl sm:space-x-5">
        <div className="flex items-center flex-none pl-4 sm:pl-6 xl:pl-8 lg:w-60 xl:w-72">
          <Link href="/">
            <a
              className="overflow-hidden md:w-auto" 
              // onContextMenu={(e) => {
              //   e.preventDefault()
              //   Router.push('/brand')
              // }}
            >
              <span className="sr-only">Wrapt home page</span>
              <LogoNoText className={"h-10 w-auto sm:hidden"}  />
              <LogoWithText className={"h-8 w-auto hidden sm:block"}  />
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-between flex-auto px-4 h-18 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
          <div className="flex items-center flex-1 max-w-sm pr-2">
            <Search />
          </div>
          <div className="flex items-center space-x-3">
            <a
              target="_blank"
              href="https://discord.gg/TBq2rVkSEj"
              className="pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-500 sm:pr-6"
            >
              <span className="sr-only">Wrapt Discord Community</span>
              <svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" className />
              </svg>
            </a>
            
            <a
              target="_blank"
              href="https://github.com/pdevito3/craftsman"
              className="pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-500 sm:pr-6"
            >
              <span className="sr-only">Craftsman on GitHub</span>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>

          </div>
        </div>
      </div>

      <button
        id="close-mobile-navbar"
        type="button"
        className="fixed z-50 block w-16 h-16 text-white bg-gray-900 rounded-full bottom-4 right-4 lg:hidden"
        onClick={() => onNavToggle(!navIsOpen)}
      >
        <span className="sr-only">Open site navigation</span>
        <svg
          width="24"
          height="24"
          fill="none"
          className={clsx(
            'absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform',
            {
              'opacity-0 scale-80': navIsOpen,
            }
          )}
        >
          <path
            d="M4 8h16M4 16h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="24"
          height="24"
          fill="none"
          className={clsx(
            'absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform',
            {
              'opacity-0 scale-80': !navIsOpen,
            }
          )}
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  )
}
