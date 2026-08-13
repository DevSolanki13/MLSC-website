import { useNavigate } from 'react-router-dom';
import styles from './Projects.module.css';
import projectData from "../utils/projectData.json";
import { useFavorites } from "../hooks/useFavorites";
import { FaBookmark, FaRegBookmark, FaShareAlt } from "react-icons/fa";

const ProjectTile = ({ project, navigate, isFavorited, toggleFavorite, shareItem }) => {
  const saved = isFavorited(project.id, 'projects');
  
  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleFavorite(project.id, 'projects', project.name);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    shareItem(project.name, `/projects/${project.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`${styles.projectTile} ${styles.topdetails}`}
      key={project.id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.project_actions}>
        <button
          className={`${styles.project_bookmark_btn} ${saved ? styles.bookmarked : ''}`}
          onClick={handleBookmark}
          aria-label={saved ? `Remove ${project.name} from saved items` : `Save ${project.name}`}
          aria-pressed={saved}
          title={saved ? "Remove Bookmark" : "Save Project"}
          type="button"
        >
          {saved ? <FaBookmark size={15} /> : <FaRegBookmark size={15} />}
        </button>

        <button
          className={styles.project_share_btn}
          onClick={handleShare}
          aria-label={`Share ${project.name}`}
          title="Share Project"
          type="button"
        >
          <FaShareAlt size={14} />
        </button>
      </div>

      <img src={project.imgSrc} alt={project.name} className={styles.projectImg} />
      <p className={styles.projectName}>{project.name}</p>
      <p className={styles.projectCategory}>{project.category}</p>
    </div>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite, shareItem } = useFavorites();

  const webDevProjects = projectData.webDev.slice(0, 4);
  const aiMlProjects = projectData.aiMl.slice(0, 3);
  const appProjects = projectData.app.slice(0, 2);

  return (
    <div className={styles.projects_section}>
      <p className={styles.title}>Featured Projects</p>

      <div className={styles.projectCategorySection}>
        <p className={styles.categoryTitle}>Web Development Projects</p>
        <div className={styles.projectGrid}>
          {webDevProjects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              navigate={navigate}
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
              shareItem={shareItem}
            />
          ))}
        </div>
      </div>

      <div className={styles.projectCategorySection}>
        <p className={styles.categoryTitle}>AI/ML Projects</p>
        <div className={styles.projectGrid}>
          {aiMlProjects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              navigate={navigate}
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
              shareItem={shareItem}
            />
          ))}
        </div>
      </div>

      <div className={styles.projectCategorySection}>
        <p className={styles.categoryTitle}>App Development Projects</p>
        <div className={styles.projectGrid}>
          {appProjects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              navigate={navigate}
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
              shareItem={shareItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
