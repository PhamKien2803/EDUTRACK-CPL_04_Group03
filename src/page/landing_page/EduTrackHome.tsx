import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from '../../components/landing_components/AppAppBar';
import Hero from '../../components/landing_components/Hero';
import LogoCollection from '../../components/landing_components/LogoCollection';
import Highlights from '../../components/landing_components/Highlights';
import Features from '../../components/landing_components/Features';
import FAQ from '../../components/landing_components/FAQ';
import Footer from '../../components/landing_components/Footer';
import AppTheme from '../../components/landing_components/theme/AppTheme';

export default function EduTrackHome(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Divider />
        <Highlights />
        <Divider />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
