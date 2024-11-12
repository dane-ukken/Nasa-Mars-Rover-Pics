import Sidebar from '../components/Sidebar/Sidebar';
import MainContent from '../components/MainContent/MainContent';

const Home = () => {
  return (
    <div className="flex gap-6">
      <Sidebar />
      <div className="flex-1 space-y-4">
        <MainContent />
      </div>
    </div>
  );
};

export default Home; 