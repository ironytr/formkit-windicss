// eslint-disable-next-line @typescript-eslint/no-var-requires
const FormKitTailwind = require('@formkit/windicss')

module.exports = {
  content: ['./packages/windicss/playground/src/**/*.{html,js,vue}'],
  theme: {
    extend: {},
  },
  plugins: [FormKitTailwind.default],
}
