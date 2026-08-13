import { createContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'mlsc_favorites_v1';

const initialFavorites = {
  events: [],
  projects: [],
};

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          events: Array.isArray(parsed.events) ? parsed.events : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        };
      }
    } catch (e) {
      console.error('Failed to load favorites from localStorage:', e);
    }
    return initialFavorites;
  });

  const [toast, setToast] = useState(null);
  const [previousFavorites, setPreviousFavorites] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, [favorites]);

  // Listen for changes from other browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setFavorites({
            events: Array.isArray(parsed.events) ? parsed.events : [],
            projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          });
        } catch (err) {
          console.error('Error parsing storage event data:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isFavorited = useCallback(
    (id, type = 'events') => {
      if (!id || !favorites[type]) return false;
      return favorites[type].includes(id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (id, type = 'events', itemTitle = '') => {
      if (!id || !['events', 'projects'].includes(type)) return;

      setFavorites((prev) => {
        setPreviousFavorites(prev);
        const list = prev[type] || [];
        const exists = list.includes(id);
        const updatedList = exists
          ? list.filter((item) => item !== id)
          : [...list, id];

        const titleDisplay = itemTitle || id;
        if (exists) {
          setToast({
            message: `Removed "${titleDisplay}" from saved items`,
            type: 'remove',
            itemInfo: { id, type, title: itemTitle },
          });
        } else {
          setToast({
            message: `Saved "${titleDisplay}" to My MLSC`,
            type: 'add',
            itemInfo: { id, type, title: itemTitle },
          });
        }

        return {
          ...prev,
          [type]: updatedList,
        };
      });
    },
    []
  );

  const undoLastAction = useCallback(() => {
    if (previousFavorites) {
      setFavorites(previousFavorites);
      setPreviousFavorites(null);
      setToast({
        message: 'Restored previous saved items',
        type: 'info',
        itemInfo: null,
      });
    }
  }, [previousFavorites]);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  const favoritesCount = favorites.events.length + favorites.projects.length;

  const value = {
    favorites,
    toggleFavorite,
    isFavorited,
    favoritesCount,
    toast,
    undoLastAction,
    clearToast,
    canUndo: !!previousFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
