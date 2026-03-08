import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PracticePage } from './pages/PracticePage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { ResultsPage } from './pages/ResultsPage';
import { HistoryPage } from './pages/HistoryPage';
import { TestChecklistPage } from './pages/TestChecklistPage';
import { ShipPage } from './pages/ShipPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="assessments" element={<AssessmentsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="analyzer" element={<AnalyzerPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="prp/07-test" element={<TestChecklistPage />} />
          <Route path="prp/08-ship" element={<ShipPage />} />
        </Route>
        
        {/* Redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
