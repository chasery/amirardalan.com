import React, { useState } from 'react'
import { Global, css } from '@emotion/react'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'


const BlogAdmin = React.memo(function BlogAdmin() {

  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const [session] = useSession()
  const isLoggedIn = session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL

  let adminPanelLeft = null
  let adminPanelRight = null

  const [isDeploying, setIsDeploying] = useState(false)
  const showDeployLoader: Function = () => {
    setIsDeploying(true)
    setTimeout(() => {
      setIsDeploying(false)
    }, 85000)
  }
  async function deployNewBuild(): Promise<void> {
    fetch(`/api/deploy?secret=${process.env.NEXT_PUBLIC_DEPLOY_TOKEN}`).then(response => {
      showDeployLoader()
      fetch(`/api/preview/exit-preview?secret=${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}`)
      router.push('/blog')
    })
    .catch(err => {
      console.error(err)
    })
  }

  const styleAnimationWrapper = css ({
    display: session ? 'block' : 'none',
    overflow: 'hidden',
  })
  const styleAdminPanel = css({
    width: 'auto',
    display: 'flex',
    padding: '.5rem 4rem',
    backgroundColor: 'var(--color-accent)',
    borderBottom: '1px dotted var(--color-gray)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    animation: 'adminPanelSlideDown .2s',
    '@media (max-width: 1024px)': {
      padding: '.5rem 2.5rem'
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      padding: '.5rem 1rem'
    },
    '@keyframes adminPanelSlideDown': {
      from: {
        opacity: 0,
        transform: 'translate3d(0, -100%, 0)',
        height: 0,
      },
      to: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        height: 50
      }
    },
  })
  const styleAdminPanelLeft = css({
    display: 'flex',
    '@media(max-width: 600px)': {
      justifyContent: 'flex-end',
      margin: '0 .5rem .5rem 0',
    },
    span: {
      display: 'flex',
      fontSize: 11,
      alignSelf: 'center',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-primary)',
      'a': {
        marginLeft: '.5rem',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  })
  const styleAdminPanelRight = css({
    display: 'flex',
    justifyContent: 'right',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    '.deploymentStatus': {
      display: 'flex',
      flexAlign: 'row',
    },
  })

  if (isLoggedIn) {
    adminPanelLeft = (
      <div css={styleAdminPanelLeft}>
        <span>
          Welcome, {session.user.name.split(" ")[0]}! •
          <a
            onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL+router.pathname}` })}
            aria-label="Sign Out"
            tabIndex={0}
          >
            Sign Out
          </a>
        </span>
      </div>
    )
    adminPanelRight = (
      <div css={styleAdminPanelRight}>
        <div className="deploymentStatus">
          { isDeploying ? <LoadingSpinner /> : null }
          <button
            onClick={ !isDeploying ? deployNewBuild : null }
            className={ (isDeploying) ? 'buttonCompact deploy disabled' : 'buttonCompact deploy' }
            aria-label="Deploy"
          >
            Deploy
          </button>
        </div>
        <Link href="/blog/create" passHref>
          <button className="buttonCompact createBtn" aria-label="New Post">
            Create
          </button>
        </Link>
        <Link href="/blog/drafts" passHref aria-label="Drafts">
          <button className="buttonCompact draftsBtn" data-active={isActive('/drafts')}>
            Drafts
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Global styles={{
        // Admin
        '.buttonCompact': {
          minWidth: 80,
          marginLeft: '.25rem',
          padding: '.45rem 1rem',
          display: 'inline-block',
          backgroundColor: 'var(--color-text)',
          border: '1px solid var(--color-accent)',
          borderRadius: 8,
          color: 'var(--color-bg)',
          fontSize: 12,
          fontFamily: 'var(--font-primary)',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:first-of-type': {
            marginLeft: 0,
          },
          '&:disabled': {
            backgroundColor: 'var(--color-button-disabled)',
            cursor: 'default',
          },
          '.create &': {
            '&.createBtn': {
              backgroundColor: 'var(--color-button-disabled)',
            }
          },
          '.drafts &': {
            '&.draftsBtn': {
              backgroundColor: 'var(--color-button-disabled)',
            }
          },
          '&.delete': {
            backgroundColor: 'var(--color-warning)',
            color: '#fff',
            textDecoration: 'none',
          },
          '&.deploy': {
            backgroundColor: 'var(--color-accent-color)',
            marginRight: '.25rem',
            '&.disabled': { cursor: 'wait' }
          },
          '&.disabled': {
            backgroundColor: 'var(--color-button-disabled)',
          }
        }
      }}/>
      <div css={styleAnimationWrapper}>
        <nav css={styleAdminPanel}>
          {adminPanelLeft}
          {adminPanelRight}
        </nav>
      </div>
    </>
  )
})

export default BlogAdmin