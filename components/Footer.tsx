import { css } from '@emotion/react'
import { footer } from '@/data/content'
import { nav } from '@/data/navigation'
import Link from 'next/link'

export default function Footer() {

  const styleFooter = css({
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gap: 10,
    gridAutoRows: 'minmax(100px, auto)',
    '@media(max-width: 600px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    marginTop: '6rem',
    padding: '6rem 4rem 2rem 4rem',
    flexDirection: 'column',
    fontFamily: 'var(--font-secondary)',
    fontSize: 20,
    color: 'var(--color-bg)',
    backgroundColor: 'var(--color-accent-color)',
    lineHeight: '1.8em',
    '.grid': {
      marginBottom: '2rem',
    },
    'a': {
      textDecoration: 'none',
      color: 'var(--color-bg)',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&:last-of-type::after': {
        content: '""',
      },
      '&.spotify': {
        display: 'flex',
        height: 20,
        width: 20,
        marginTop: '.5rem',
        background: 'var(--icon-spotify-footer) no-repeat',
        backgroundSize: 20,
      }
    },
    h5: {
      width: '90%',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      lineHeight: '1rem',
      borderBottom: '2px solid var(--color-bg)',
      textTransform: 'uppercase',
      fontSize: 10,
      '@media(max-width: 600px)': {
        width: '100%',
      }
    },
    '.email': {
      fontSize: 14,
      '@media(max-width: 1024px)': {
        fontSize: 10,
      },
      '@media(max-width: 480px)': {
        fontSize: 14,
      },
    },
    '@media(max-width: 1024px)': {
      marginTop: '4rem',
      padding: '4rem 2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '2rem 1.5rem',
    },
  })
  const styleCopyright = css({
    fontSize: 12,
    lineHeight: '1.2rem',
    display: 'flex',
    fontFamly: 'var(--font-primary) !important',
    alignSelf: 'end',
  })
  const styleFooterNav= css({
    display: 'flex',
    flexDirection: 'column',
  })

  const generateFooterLinks = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <li>
          <a
            key={i}
            href={items.path}
            aria-label={items.title}
            target={items.target}
            rel={items.rel}>
            {items.title}
            
          </a>
        </li>
      )
    })
  }

  return (
    <footer css={styleFooter}>
      <div css={styleFooterNav} className="grid">
        <h5>Explore</h5>
        <ul>
          {nav.map((item: any, index: number) => {
            return (
              <li>
                <Link
                  href={item.path}
                  aria-label={item.title}
                  key={index}
                >
                  <a
                    className={item.cName}
                  >
                  {item.title}
                  </a>
                </Link>
              </li>
            )}
          )}
        </ul>
      </div>
      <div className="grid">
        <h5>Connect</h5>
        <ul>
          {generateFooterLinks(footer.social)}
        </ul>
      </div>
      <div className="grid">
        <h5>Powered By</h5>
        <ul>
          {generateFooterLinks(footer.poweredby)}
        </ul>
      </div>
      <div className="grid">
        <ul>
          <h5>✉ Contact</h5>
          <li className="email">hi@amirardalan.com</li>
        </ul>
      </div>
      <div css={styleCopyright}>
        <div>
          {footer.copyright.text} {(new Date().getFullYear())} – {footer.copyright.name} ♥
        </div>
      </div>
    </footer>
  )
}