import Typography from 'typography';
import altonTheme from 'typography-theme-alton';
import * as Colors from '../constants/colors';

altonTheme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  body: {
    color: 'white',
  },
  a: {
    color: 'white',
    textDecoration: 'underline',
  },
  'a:hover,a:active': {
    color: 'white',
  },
  blockquote: {
    color: 'white',
    borderColor: Colors.BRAND,
  },
});

const typography = new Typography(altonTheme);
const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };
