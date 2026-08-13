import { useState } from "react";
import Modal from "../layouts/Modal";
import styles from './Events.module.css';
import { useFavorites } from "../hooks/useFavorites";
import { FaBookmark, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import eventsData from "../utils/eventsData";

const getEventId = (event) => {
  if (event.id) return event.id;
  return event.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
};

const Events = ({count}) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isFavorited, toggleFavorite, shareItem } = useFavorites();

  const toggleModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(!isModalOpen);
  };

  return (
    <>
      <section className={`section | ${styles.event_section}`}>
        <h1 className='title'>Dive into the Tech Universe with us</h1>
        <div className={`flex_center | ${styles.event_container}`}>
          {eventsData.slice(0, count ? count : eventsData.length).map((event, index) => {
            const eventId = getEventId(event);
            const saved = isFavorited(eventId, 'events');

            return (
              <div className={`flex_center | ${styles.event_content}`} key={index}>
                <img className={styles.eventImg} src={event.imgSrc} alt={event.title} />
                <div className={styles.event_right_content}>
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  <div className={styles.action_buttons}>
                    <button onClick={() => toggleModal(event)} type="button" className={styles.event_btn}>
                      Know More
                    </button>
                    <button
                      onClick={() => toggleFavorite(eventId, 'events', event.title)}
                      type="button"
                      className={`${styles.bookmark_btn} ${saved ? styles.bookmarked : ''}`}
                      aria-label={saved ? `Remove ${event.title} from saved items` : `Save ${event.title}`}
                      aria-pressed={saved}
                      title={saved ? "Remove Bookmark" : "Save Event"}
                    >
                      {saved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
                      <span>{saved ? "Saved" : "Save"}</span>
                    </button>
                    <button
                      onClick={() => shareItem(event.title, '/events')}
                      type="button"
                      className={styles.share_btn}
                      aria-label={`Share ${event.title}`}
                      title="Share Event"
                    >
                      <FaShareAlt size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>
      {isModalOpen && <Modal event={selectedEvent} onRequestClose={() => setModalIsOpen(false)} />}
    </>
  );
};

export default Events;
