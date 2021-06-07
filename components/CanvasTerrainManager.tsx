import { useState } from 'react'
import { button, useControls } from 'leva'
import CanvasTerrain from '@/components/CanvasTerrain'
import { Global } from '@emotion/react'

const CanvasTerrainManager = ({ theme }) => {
  const [seed, setSeed] = useState(Date.now())

  const { resolution, height, levels, scale, } = useControls({
    'Generate Terrain': button(() => setSeed(Date.now())),
    resolution: { value: 50, min: 10, max: 300, step: 1 },
    height: { value: 0.2, min: 0, max: .3 },
    levels: { value: 8, min: 1, max: 16, step: 1 },
    scale: { value: 1, min: 1, max: 16, step: 1 },
  })

  return (
    <>
      <CanvasTerrain
        theme={theme}
        seed={seed}
        size={resolution}
        height={height}
        levels={levels}
        scale={scale}
      />
      <Global styles={{
        // Leva Controls Override
        '#leva__root': {
          fontFamily: theme.fonts.primary,
          textTransform: 'uppercase',
          
          // Hide on Tablet/Mobile
          '@media(max-width: 890px)': {
            display: 'none',
          },

          'div:first-of-type': {
            backgroundColor: theme.colors.accent,
            boxShadow: 'none',
          },
          '.levawz9l9wdj1o--fill-false': {
            height: 'max-content',
            top: 'unset',
            bottom: 'calc(6vw + 6vh)',
            right: 'calc(3.5vw + 3.5vh)',

            '@media(max-width: 600px)': {
              bottom: '.5rem',
              right: '.5rem',
            }
          },
          '.levaussed, .levarv4c7': {
            background: theme.colors.accent,
            svg: {
              fill: theme.colors.accentColor
            }
          },
          '.levabjb2y': {
            borderRadius: 0 + '!important',
          },
          button: {
            background: theme.colors.accentColor,
            letterSpacing: '.2rem',
            textTransform: 'uppercase',
            color: theme.colors.background,
          },
          '.levam9bkr.levaebmh1': {
            '&:hover': {
              color: 'unset'
            }
          },
          label: {
            '&:hover': {
              color: theme.colors.text
            },
            '+ div': {
              display: 'none'
            }
          },
          '.levadtm57': {
            background: theme.colors.accentColor,
            boxShadow: 'none',
          },
          '.leva0sm9i, .levakncnr': {
            background: theme.colors.grayAccent + '!important'
          },
          '.levahlc9c': {
            background: theme.colors.grayAccent,
            color: theme.colors.text
          },
        }
      }} />
    </>
  )
}

export default CanvasTerrainManager