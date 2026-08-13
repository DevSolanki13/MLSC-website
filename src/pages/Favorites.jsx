import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import eventsData from '../utils/eventsData';
import projectData from '../utils/projectData.json';
import styles from './Favorites.module.css';
import eventStyles from './Events.module.css';
import projectStyles from './Projects.module.css';
import Modal from '../layouts/Modal';
import { FaBookmark, FaRegBookmark, FaBookmark as FaBookmarkIcon } from 'react-icons/fa';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, isFavorited, toggleFavorite, favoritesCount } = useFavorites();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'events', 'projects'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalIsOpen] = useState(false);

  // Flatten all projects into single list with category tag
  const allProjects = [
    ...projectData.webDev,
    ...projectData.aiMl,
    ...projectData.app,
  ];

  // Filter saved events and projects
  const savedEvents = eventsData.filter((event) =>
    favorites.events.includes(event.id)
  );
  const savedProjects = allProjects.filter((project) =>
    favorites.projects.includes(project.id)
  );

  const toggleModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(!isModalOpen);
  };

  const showEvents = activeTab === 'all' || activeTab === 'events';
  const showProjects = activeTab === 'all' || activeTab === 'projects';
  const totalDisplayItems =
    (showEvents ? savedEvents.length : 0) + (showProjects ? savedProjects.length : 0);

  return (
    <div className={styles.favoritesContainer}>
      <h1 className={styles.title}>My MLSC</h1>
      <p className={styles.subtitle}>
        Your personal dashboard for saved events, workshops, and student projects.
      </p>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('all')}
          type="button"
        >
          All Items <span className={styles.badge}>{favoritesCount}</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'events' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('events')}
          type="button"
        >
          Events <span className={styles.badge}>{savedEvents.length}</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('projects')}
          type="button"
        >
          Projects <span className={styles.badge}>{savedProjects.length}</span>
        </button>
      </div>

      {/* Empty State */}
      {favoritesCount === 0 || totalDisplayItems === 0 ? (
        <div className={styles.emptyState}>
          <FaBookmarkIcon size={48} className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>No saved items yet</h2>
          <p className={styles.emptyText}>
            Bookmark upcoming workshops or impressive student projects to easily access them here anytime!
          </p>
          <div className={styles.ctaGroup}>
            <button
              className={styles.ctaBtnPrimary}
              onClick={() => navigate('/events')}
              type="button"
            >
              Browse Events
            </button>
            <button
              className={styles.ctaBtnSecondary}
              onClick={() => navigate('/projects')}
              type="button"
            >
              Explore Projects
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Saved Events Section */}
          {showEvents && savedEvents.length > 0 && (
            <div>
              <h2 className={styles.sectionTitle}>Saved Events & Workshops ({savedEvents.length})</h2>
              <div className={styles.eventsGrid}>
                {savedEvents.map((event) => {
                  const saved = isFavorited(event.id, 'events');
                  return (
                    <div className={`flex_center | ${eventStyles.event_content}`} key={event.id}>
                      <img className={eventStyles.eventImg} src={event.imgSrc} alt={event.title} />
                      <div className={eventStyles.event_right_content}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <div className={eventStyles.action_buttons}>
                          <button
                            onClick={() => toggleModal(event)}
                            type="button"
                            className={eventStyles.event_btn}
                          >
                            Know More
                          </button>
                          <button
                            onClick={() => toggleFavorite(event.id, 'events', event.title)}
                            type="button"
                            className={`${eventStyles.bookmark_btn} ${saved ? eventStyles.bookmarked : ''}`}
                            aria-label={`Remove ${event.title} from saved items`}
                            aria-pressed={saved}
                          >
                            <FaBookmark size={18} />
                            <span>Saved</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Saved Projects Section */}
          {showProjects && savedProjects.length > 0 && (
            <div>
              <h2 className={styles.sectionTitle}>Saved Student Projects ({savedProjects.length})</h2>
              <div className={styles.projectsGrid}>
                {savedProjects.map((project) => {
                  const saved = isFavorited(project.id, 'projects');
                  return (
                    <div
                      className={`${projectStyles.projectTile} ${projectStyles.topdetails}`}
                      key={project.id}
                      onClick={() => navigate(`/projects/${project.id}`)}
                      role="button"
                      tabIndex={0}
                      style={{ cursor: 'pointer' }}
                    >
                      <button
                        className={`${projectStyles.project_bookmark_btn} ${saved ? projectStyles.bookmarked : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.id, 'projects', project.name);
                        }}
                        aria-label={`Remove ${project.name} from saved items`}
                        aria-pressed={saved}
                        type="button"
                      >
                        <FaBookmark size={16} />
                      </button>

                      <img src={project.imgSrc} alt={project.name} className={projectStyles.projectImg} />
                      <p className={projectStyles.projectName}>{project.name}</p>
                      <p className={projectStyles.projectCategory}>{project.category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {isModalOpen && <Modal event={selectedEvent} onRequestClose={() => setModalIsOpen(false)} />}
    </div>
  );
};

export default Favorites;
