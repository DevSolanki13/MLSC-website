import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import eventsData from '../utils/eventsData';
import projectData from '../utils/projectData.json';
import Modal from '../layouts/Modal';
import styles from './ImpactDashboard.module.css';
import { FaChartBar, FaCalendarCheck, FaUsers, FaLaptopCode, FaRocket } from 'react-icons/fa';

const ImpactDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  // Compute stats from real data
  const totalEvents = eventsData.length;
  
  const totalParticipants = eventsData.reduce((acc, event) => {
    const partInfo = event.info?.find((i) => i.label.includes('Participants'));
    return acc + (partInfo ? partInfo.value : 0);
  }, 0);

  const webCount = projectData.webDev.length;
  const aiMlCount = projectData.aiMl.length;
  const appCount = projectData.app.length;
  const totalProjects = webCount + aiMlCount + appCount;

  // Percentage calculations for Bar Chart
  const webPercent = Math.round((webCount / totalProjects) * 100);
  const aiMlPercent = Math.round((aiMlCount / totalProjects) * 100);
  const appPercent = Math.round((appCount / totalProjects) * 100);

  return (
    <>
      <section className={styles.dashboardSection}>
        <div className={styles.dashboardHeader}>
          <span className={styles.sectionBadge}>Data-Driven Insights</span>
          <h2 className={styles.mainTitle}>MLSC in Numbers</h2>
          <p className={styles.subtitle}>
            Real aggregate metrics computing our total community reach, project innovations, and student workshops.
          </p>
        </div>

        {/* Top 4 KPI Counter Cards */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard} onClick={() => navigate('/events')} style={{ cursor: 'pointer' }}>
            <div className={styles.kpiNumber}>
              <CountUp start={0} end={totalParticipants} duration={2.5} suffix="+" />
            </div>
            <div className={styles.kpiLabel}>
              <FaUsers style={{ display: 'inline', marginRight: '6px', color: '#60a5fa' }} />
              Students Impacted
            </div>
          </div>

          <div className={styles.kpiCard} onClick={() => navigate('/events')} style={{ cursor: 'pointer' }}>
            <div className={styles.kpiNumber}>
              <CountUp start={0} end={totalEvents} duration={2.5} suffix="+" />
            </div>
            <div className={styles.kpiLabel}>
              <FaCalendarCheck style={{ display: 'inline', marginRight: '6px', color: '#60a5fa' }} />
              Flagship Workshops
            </div>
          </div>

          <div className={styles.kpiCard} onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>
            <div className={styles.kpiNumber}>
              <CountUp start={0} end={totalProjects} duration={2.5} suffix="+" />
            </div>
            <div className={styles.kpiLabel}>
              <FaLaptopCode style={{ display: 'inline', marginRight: '6px', color: '#60a5fa' }} />
              Technical Projects Built
            </div>
          </div>

          <div className={styles.kpiCard} onClick={() => navigate('/team')} style={{ cursor: 'pointer' }}>
            <div className={styles.kpiNumber}>
              <CountUp start={0} end={28} duration={2.5} suffix="+" />
            </div>
            <div className={styles.kpiLabel}>
              <FaRocket style={{ display: 'inline', marginRight: '6px', color: '#60a5fa' }} />
              Core Leads & Team
            </div>
          </div>
        </div>

        {/* Visuals Split: Bar Chart + Event Timeline */}
        <div className={styles.visualsLayout}>
          {/* Animated Bar Chart Card */}
          <div className={styles.visualCard}>
            <div className={styles.visualHeader}>
              <h3 className={styles.visualTitle}>
                <FaChartBar /> Project Distribution Breakdown
              </h3>
              <button
                className={styles.redirectBtn}
                onClick={() => navigate('/projects')}
                type="button"
              >
                View Projects →
              </button>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.barGroup}>
                <div className={styles.barHeader}>
                  <span>Web Development Solutions</span>
                  <span>{webCount} Projects</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.webDevBar}`}
                    style={{ width: isVisible ? `${webPercent}%` : '0%' }}
                  />
                </div>
              </div>

              <div className={styles.barGroup}>
                <div className={styles.barHeader}>
                  <span>AI & Machine Learning Innovations</span>
                  <span>{aiMlCount} Projects</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.aiMlBar}`}
                    style={{ width: isVisible ? `${aiMlPercent}%` : '0%' }}
                  />
                </div>
              </div>

              <div className={styles.barGroup}>
                <div className={styles.barHeader}>
                  <span>Mobile Apps & Systems</span>
                  <span>{appCount} Projects</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.appBar}`}
                    style={{ width: isVisible ? `${appPercent}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Impact Milestone Timeline Card */}
          <div className={styles.visualCard}>
            <div className={styles.visualHeader}>
              <h3 className={styles.visualTitle}>
                <FaCalendarCheck /> Key Milestone Workshops
              </h3>
              <button
                className={styles.redirectBtn}
                onClick={() => navigate('/events')}
                type="button"
              >
                View All Events →
              </button>
            </div>
            <div className={styles.timeline}>
              {eventsData.slice(0, 4).map((event) => {
                const partCount = event.info?.find((i) => i.label.includes('Participants'))?.value || 0;
                const dateVal = event.info?.find((i) => i.label.includes('Date'))?.value || 'Recent';

                return (
                  <div
                    className={styles.timelineItem}
                    key={event.id}
                    onClick={() => openEventModal(event)}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    title="Click to view details"
                  >
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineEventTitle}>{event.title}</div>
                    <div className={styles.timelineEventDetails}>
                      <span className={styles.timelineTag}>{partCount} Attendees</span>
                      <span>{dateVal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal event={selectedEvent} onRequestClose={() => setModalIsOpen(false)} />
      )}
    </>
  );
};

export default ImpactDashboard;
