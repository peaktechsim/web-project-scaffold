import { Routes, Route } from 'react-router';
import DashboardPage from '@/pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
