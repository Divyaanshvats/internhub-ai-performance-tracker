
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { InternForm } from './components/InternForm';
import { InternDirectory } from './components/InternDirectory';
import { Intern, ViewType } from './types';

// Initial Mock Data
const INITIAL_INTERNS: Intern[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    duration: '3 Months',
    department: 'Engineering',
    reportingManager: 'Alex Rivera',
    projectsCompleted: 5,
    rating: 9,
    comment: 'Sarah was exceptional at picking up our tech stack. She contributed significantly to the frontend rewrite and delivered two core features ahead of schedule.',
    aiSummary: 'Sarah is a high-performing engineering intern with strong technical adaptability. She significantly impacted the frontend migration and demonstrated excellent time management by delivering key features early.',
    createdAt: Date.now() - 1000000
  },
  {
    id: '2',
    name: 'Michael Chen',
    duration: '6 Months',
    department: 'Design',
    reportingManager: 'Elena Vance',
    projectsCompleted: 12,
    rating: 8,
    comment: 'Michael has a great eye for detail. His UI prototypes for the mobile app were well-received by stakeholders.',
    aiSummary: 'Michael is a productive design intern with a keen eye for UI details. His work on mobile prototypes was highly valued by stakeholders, showing strong collaborative and creative skills.',
    createdAt: Date.now() - 5000000
  },
  {
    id: '3',
    name: 'Amara Okoro',
    duration: '3 Months',
    department: 'Marketing',
    reportingManager: 'David Smith',
    projectsCompleted: 3,
    rating: 7,
    comment: 'Amara helped with social media strategy and campaign tracking. Very diligent with data.',
    aiSummary: 'Amara is a diligent marketing intern who specialized in campaign data tracking. Her contributions to social media strategy provided valuable analytical insights to the team.',
    createdAt: Date.now() - 10000000
  }
];

const App: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>(() => {
    const saved = localStorage.getItem('internhub_data');
    return saved ? JSON.parse(saved) : INITIAL_INTERNS;
  });
  const [view, setView] = useState<ViewType>('dashboard');

  useEffect(() => {
    localStorage.setItem('internhub_data', JSON.stringify(interns));
  }, [interns]);

  const addIntern = (newIntern: Intern) => {
    setInterns(prev => [newIntern, ...prev]);
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard interns={interns} />;
      case 'directory':
        return <InternDirectory interns={interns} />;
      case 'add':
        return <InternForm onAdd={addIntern} onSuccess={() => setView('directory')} />;
      default:
        return <Dashboard interns={interns} />;
    }
  };

  return (
    <Layout activeView={view} setView={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
