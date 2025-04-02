import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Dashboard from './pages/dashboard'
import Offers from './pages/offers'
import Affiliates from './pages/affiliates'
import Advertisers from './pages/advertisers'
import Analytics from './pages/analytics'
import Applications from './pages/applications'
import Conversions from './pages/conversions'
import Settings from './pages/settings'
import Invite from './pages/invite'
import Links from './pages/links'
import CreateOfferPage from './pages/offers/create'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/offers" element={<Offers />} />
        <Route path="/dashboard/offers/create" element={<CreateOfferPage />} />
        <Route path="/dashboard/affiliates" element={<Affiliates />} />
        <Route path="/dashboard/advertisers" element={<Advertisers />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/applications" element={<Applications />} />
        <Route path="/dashboard/conversions" element={<Conversions />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/invite" element={<Invite />} />
        <Route path="/dashboard/links" element={<Links />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App 