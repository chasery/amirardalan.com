import { useTheme, css } from '@emotion/react'
import styled from '@emotion/styled'

export default function Logo() {

  const theme : any = useTheme()
  const Image = styled.img`
    animation: spin 1s forwards;
  `
  const styleTitle = css({
    margin: '0',
    fontWeight: 'bold',
    fontSize: '14px',
    color: theme.colors.text,
    lineHeight: '1rem'
  })
  const styleTitleSub = css({
    position: 'relative',
    margin: '0',
    color: theme.colors.grayscale,
    fontFamily: theme.fonts.primary,
    fontSize: '8px',
    fontWeight: 'normal',
    letterSpacing: '.11rem',
    paddingLeft: '.09rem',
    textAlign: 'left',
    textTransform: 'uppercase'
  })

  return (
    <>
      <Image
        src={theme.logo}
        alt="Amir Ardalan Logo"
        width={30}
        height={30}
      />

      <div css={{
        flexDirection: 'column',
      }}>
        <h1 css={styleTitle}>
          Amir Ardalan
        </h1>

        <div
          aria-label="Portland, Oregon"
          css={styleTitleSub}>
          Portland,Oregon
        </div>
      </div>
    </>
  )
}