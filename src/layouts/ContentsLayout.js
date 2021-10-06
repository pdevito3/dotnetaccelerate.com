import clsx from 'clsx'
import Link from 'next/link'
import {
  createContext,
  Fragment, isValidElement, useCallback, useContext, useEffect, useState
} from 'react'
import { ClassTable } from 'src/components/ClassTable'
import { PageHeader } from 'src/components/PageHeader'
import { usePrevNext } from 'src/hooks/usePrevNext'
import { SidebarContext, SidebarLayout } from 'src/layouts/SidebarLayout'

export const ContentsContext = createContext()

function TableOfContents({ tableOfContents, currentSection }) {
  let sidebarContext = useContext(SidebarContext)
  let isMainNav = Boolean(sidebarContext)

  function closeNav() {
    if (isMainNav) {
      sidebarContext.setNavIsOpen(false)
    }
  }

  return (
    <div className="pr-2">
      <h5 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:text-xs">
        On this page
      </h5>
      <ul className="overflow-x-hidden font-medium text-gray-500">
        {tableOfContents.map((section) => {
          let sectionIsActive =
            currentSection === section.slug ||
            section.children.findIndex(({ slug }) => slug === currentSection) > -1

          return (
            <Fragment key={section.slug}>
              <li>
                <a
                  href={`#${section.slug}`}
                  onClick={closeNav}
                  className={clsx(
                    'block transform transition-colors duration-200 py-2 hover:text-gray-900',
                    {
                      'text-gray-900': sectionIsActive,
                    }
                  )}
                >
                  {section.title}
                </a>
              </li>
              {section.children.map((subsection) => {
                let subsectionIsActive = currentSection === subsection.slug

                return (
                  <li
                    className={clsx({
                      'ml-4': isMainNav,
                      'ml-2': !isMainNav,
                    })}
                    key={subsection.slug}
                  >
                    <a
                      href={`#${subsection.slug}`}
                      onClick={closeNav}
                      className={clsx(
                        'block py-2 transition-colors duration-200 hover:text-gray-900 font-medium',
                        {
                          'text-gray-900': subsectionIsActive,
                        }
                      )}
                    >
                      {subsection.title}
                    </a>
                  </li>
                )
              })}
            </Fragment>
          )
        })}
      </ul>
    
      <div className="px-6 py-4 mt-5 space-y-2 bg-white border rounded-lg shadow">
        <p className="text-lg font-medium text-gray-800">
          👀 Feedback
        </p>
        <p className="text-gray-500">
          <span>
            See something missing or light in content in the docs? 
          </span>
          {' '}
          <a href="https://github.com/pdevito3/wrapt.dev/issues" target="_blank" rel="noopener" className="font-medium underline cursor-pointer text-violet-500">Let me know</a> 
          <span>
            ! I want the Wrapt docs to be as thorough and helpful as possible! 
          </span>
        </p>
        <p className="text-gray-500">
          <span>
            If you'd like to request a new feature, you can submit a 
          </span>
          {' '}
          <a href="https://github.com/pdevito3/craftsman/issues" target="_blank" rel="noopener" className="font-medium underline cursor-pointer text-violet-500">new Craftsman issue</a> 
          <span>
            .
          </span>
        </p>
      </div>
    </div>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
  let [headings, setHeadings] = useState([])

  const registerHeading = useCallback((id, top) => {
    setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top }])
  }, [])

  const unregisterHeading = useCallback((id) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id))
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return
    function onScroll() {
      let y = window.pageYOffset
      let windowHeight = window.innerHeight
      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
      if (y <= 0) {
        setCurrentSection(sortedHeadings[0].id)
        return
      }
      if (y + windowHeight >= document.body.scrollHeight) {
        setCurrentSection(sortedHeadings[sortedHeadings.length - 1].id)
        return
      }
      const middle = y + windowHeight / 2
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (middle >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [headings, tableOfContents])

  return { currentSection, registerHeading, unregisterHeading }
}

export function ContentsLayoutOuter({ children, layoutProps, ...props }) {
  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(
    layoutProps.tableOfContents
  )

  return (
    <SidebarLayout
      sidebar={
        <div className="mb-8">
          <TableOfContents
            tableOfContents={layoutProps.tableOfContents}
            currentSection={currentSection}
          />
        </div>
      }
      {...props}
    >
      <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
        {children}
      </ContentsContext.Provider>
    </SidebarLayout>
  )
}

export function ContentsLayout({ children, meta, classes, tableOfContents }) {
  const toc = [
    ...(classes
      ? [{ title: 'Default class reference', slug: 'class-reference', children: [] }]
      : []),
    ...tableOfContents,
  ]

  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc)
  let { prev, next } = usePrevNext()

  return (
    <div id={meta.containerId} className="flex w-full pt-10 pb-24 lg:pb-16">
      <div className="flex-auto min-w-0 px-4 sm:px-6 xl:px-8">
        <PageHeader
          title={meta.title}
          description={meta.description}
          // badge={{ key: 'Tailwind CSS version', value: meta.featureVersion }}
          border={!classes && meta.headerSeparator !== false}
        />
        <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
          <div>
            {classes && (
              <ClassTable {...(isValidElement(classes) ? { custom: classes } : classes)} />
            )}
            {children}
          </div>
        </ContentsContext.Provider>
        {(prev || next) && (
          <>
            <hr className="mt-10 mb-4 border-gray-200" />
            <div className="flex justify-between font-medium leading-7">
              {prev && (
                <Link href={prev.href}>
                  <a>← {prev.shortTitle || prev.title}</a>
                </Link>
              )}
              {next && (
                <Link href={next.href}>
                  <a>{next.shortTitle || next.title} →</a>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex-none hidden w-64 pl-8 mr-8 xl:text-sm xl:block">
        <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) -mt-10 pt-10 pb-4 top-18">
          {toc.length > 0 && (
            <div className="mb-8">
              <TableOfContents tableOfContents={toc} currentSection={currentSection} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
