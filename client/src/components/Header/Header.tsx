import { Link } from 'react-router-dom';
import logo from '../../assets/Logos/nasa-logo.svg';

const Header = () => {
  return (
    <header className="bg-slate-800 text-white p-4 h-25">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src={logo} alt="Little Mars" className="w-16 h-16 object-center transform scale-150 rounded-full" />
            <h1 className="text-2xl font-bold">Mars Rover Photos</h1>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-slate-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/task" className="hover:text-slate-300">
                Task
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 