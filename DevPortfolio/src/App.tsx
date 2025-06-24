import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import './App.css'; // Mantendo um CSS global se necessário

// Placeholders para outras páginas
const ProjectsPage = () => <div>Página de Projetos</div>;
const UserStoriesPage = () => <div>Página de Histórias de Usuário</div>;
const DocumentationPage = () => <div>Página de Documentação</div>;

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/user-stories" element={<UserStoriesPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
