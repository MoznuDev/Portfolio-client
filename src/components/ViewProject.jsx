
import { NavLink } from 'react-router-dom';

const ViewProject = ({ buttonText = "View Projects", to = "/projects" }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        isActive ? "btn-primary-action active" : "btn-primary-action"
      }
    >
      {buttonText}
    </NavLink>
  );
};

export default ViewProject;