// tailwindcss-animate - Simple animation plugin for Tailwind CSS
module.exports = function({ addUtilities, matchUtilities, theme }) {
  addUtilities({
    '.animate-in': {
      animationName: 'enter',
      animationDuration: theme('transitionDuration.DEFAULT', '150ms'),
      '--tw-enter-opacity': 'initial',
      '--tw-enter-scale': 'initial',
      '--tw-enter-rotate': 'initial',
      '--tw-enter-translate-x': 'initial',
      '--tw-enter-translate-y': 'initial',
    },
    '.animate-out': {
      animationName: 'exit',
      animationDuration: theme('transitionDuration.DEFAULT', '150ms'),
      '--tw-exit-opacity': 'initial',
      '--tw-exit-scale': 'initial',
      '--tw-exit-rotate': 'initial',
      '--tw-exit-translate-x': 'initial',
      '--tw-exit-translate-y': 'initial',
    },
  })

  matchUtilities(
    {
      'fade-in': (value) => ({ '--tw-enter-opacity': value }),
      'fade-out': (value) => ({ '--tw-exit-opacity': value }),
    },
    { values: theme('opacity') }
  )

  matchUtilities(
    {
      'zoom-in': (value) => ({ '--tw-enter-scale': value }),
      'zoom-out': (value) => ({ '--tw-exit-scale': value }),
    },
    { values: theme('scale') }
  )

  matchUtilities(
    {
      'spin-in': (value) => ({ '--tw-enter-rotate': value }),
      'spin-out': (value) => ({ '--tw-exit-rotate': value }),
    },
    { values: theme('rotate') }
  )

  matchUtilities(
    {
      'slide-in-from-top': (value) => ({ '--tw-enter-translate-y': `-${value}` }),
      'slide-in-from-bottom': (value) => ({ '--tw-enter-translate-y': value }),
      'slide-in-from-left': (value) => ({ '--tw-enter-translate-x': `-${value}` }),
      'slide-in-from-right': (value) => ({ '--tw-enter-translate-x': value }),
      'slide-out-to-top': (value) => ({ '--tw-exit-translate-y': `-${value}` }),
      'slide-out-to-bottom': (value) => ({ '--tw-exit-translate-y': value }),
      'slide-out-to-left': (value) => ({ '--tw-exit-translate-x': `-${value}` }),
      'slide-out-to-right': (value) => ({ '--tw-exit-translate-x': value }),
    },
    { values: theme('translate') }
  )

  addUtilities({
    '@keyframes enter': {
      from: {
        opacity: 'var(--tw-enter-opacity, 1)',
        transform: 'translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), 1) rotate(var(--tw-enter-rotate, 0))',
      },
    },
    '@keyframes exit': {
      to: {
        opacity: 'var(--tw-exit-opacity, 1)',
        transform: 'translate3d(var(--tw-exit-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), 1) rotate(var(--tw-exit-rotate, 0))',
      },
    },
  })
}
