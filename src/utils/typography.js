import Typography from 'typography';
import altonTheme from 'typography-theme-alton';

const typography = new Typography(altonTheme);
const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };
