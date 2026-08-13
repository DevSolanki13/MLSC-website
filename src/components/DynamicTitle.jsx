import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitleMap = {
  '/': 'Home | MLSC VCET',
  '/about': 'About Us | MLSC VCET',
  '/team': 'Our Team | MLSC VCET',
  '/events': 'Events & Workshops | MLSC VCET',
  '/works': 'Our Works | MLSC VCET',
  '/projects': 'Student Projects | MLSC VCET',
  '/favorites': 'My MLSC | Saved Items',
};

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    
    if (routeTitleMap[pathname]) {
      document.title = routeTitleMap[pathname];
    } else if (pathname.startsWith('/projects/')) {
      document.title = 'Project Details | MLSC VCET';
    } else {
      document.title = 'MLSC VCET | Microsoft Learn Student Club';
    }
  }, [location]);

  return null;
};

export default DynamicTitle;
