import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ExternalLink, Calendar, TrendingUp, Book, RotateCcw, X, Check } from 'lucide-react';
import {data} from "../all_dsa_questions.js"
// ============================================
// THEMES - curated color palettes + font sizes
// (You can add more themes here)
// ============================================
const THEMES = [
  {
    id: 'dark-blue',
    name: 'Midnight Blue',
    bg: '#0b1220',
    surface: '#0f1724',
    text: '#e6eef8',
    muted: '#98a3bc',
    accent: '#60a5fa',      // blue
    chipBg: '#112033',
    chipText: '#cfe8ff',
    fontSize: '16px'
  },
  {
    id: 'emerald',
    name: 'Emerald Grove',
    bg: '#002a24',
    surface: '#043028',
    text: '#e6fff6',
    muted: '#9bd6c9',
    accent: '#10b981', // emerald
    chipBg: '#05332e',
    chipText: '#e6fff6',
    fontSize: '16px'
  },
  {
    id: 'slate',
    name: 'Slate (Cool)',
    bg: '#0f1724',
    surface: '#111827',
    text: '#e6eef8',
    muted: '#9aa5b1',
    accent: '#7dd3fc', // cyan
    chipBg: '#122031',
    chipText: '#d4f1ff',
    fontSize: '16px'
  },
  {
    id: 'warm',
    name: 'Warm Sunset',
    bg: '#1f0f0b',
    surface: '#2a1410',
    text: '#fff3ea',
    muted: '#d8b7a6',
    accent: '#f97316', // orange
    chipBg: '#3b1f1a',
    chipText: '#ffe7d1',
    fontSize: '16px'
  },
  {
    id: 'light',
    name: 'Light Mode',
    bg: '#f6f7fb',
    surface: '#ffffff',
    text: '#0b1220',
    muted: '#5b6770',
    accent: '#2563eb',
    chipBg: '#eef2ff',
    chipText: '#0b1220',
    fontSize: '15px'
  },
  {
    id: 'lavender',
    name: 'Lavender Haze',
    bg: '#0f0614',
    surface: '#1a0f23',
    text: '#f7f0ff',
    muted: '#cbbde6',
    accent: '#8b5cf6', // lavender/purple
    chipBg: '#261032',
    chipText: '#f7f0ff',
    fontSize: '16px'
  },

  // extra themes
  {
    id: 'sunflower',
    name: 'Sunflower',
    bg: '#0f0a04',
    surface: '#241a06',
    text: '#fff8e1',
    muted: '#d8c49a',
    accent: '#f59e0b',
    chipBg: '#2b1600',
    chipText: '#fff4d6',
    fontSize: '16px'
  },
  {
    id: 'sky',
    name: 'Sky Blue',
    bg: '#e8f7ff',
    surface: '#ffffff',
    text: '#022c43',
    muted: '#6b8fa3',
    accent: '#0ea5e9',
    chipBg: '#f0fbff',
    chipText: '#022c43',
    fontSize: '15px'
  },
  {
    id: 'graphite',
    name: 'Graphite',
    bg: '#0b0b0b',
    surface: '#111111',
    text: '#e6e6e6',
    muted: '#9a9a9a',
    accent: '#9ca3af',
    chipBg: '#141414',
    chipText: '#e6e6e6',
    fontSize: '16px'
  },
  {
    id: 'copper',
    name: 'Copper Dawn',
    bg: '#1b1008',
    surface: '#2a160b',
    text: '#fff9f6',
    muted: '#d6b89a',
    accent: '#f97316',
    chipBg: '#3a1e13',
    chipText: '#fff9f6',
    fontSize: '16px'
  },
  {
    id: 'midnight-green',
    name: 'Midnight Green',
    bg: '#001f1a',
    surface: '#04261f',
    text: '#e9fff7',
    muted: '#7fd3b9',
    accent: '#06b6a4',
    chipBg: '#01332b',
    chipText: '#e9fff7',
    fontSize: '16px'
  },
  {
    id: 'electric',
    name: 'Electric Neon',
    bg: '#0b1020',
    surface: '#0f172b',
    text: '#e8f2ff',
    muted: '#9fb3d6',
    accent: '#7c3aed',
    chipBg: '#111428',
    chipText: '#e8f2ff',
    fontSize: '16px'
  }
];

// ============================================
// QUESTIONS DATA - You will fill this
// ============================================
const DSA_PATTERNS = [
  { id: 'trees',                 name: 'Trees',               icon: '🌳' },
  { id: 'binary_search_trees',   name: 'Binary Search Trees', icon: '🔍' },
  { id: 'graph_basics',          name: 'Graphs',              icon: '🕸️' },
  { id: 'dynamic_programming',   name: 'Dynamic Programming', icon: '💎' },
  { id: 'sliding_window',        name: 'Sliding Window',      icon: '🪟' },
  { id: 'two_pointers',          name: 'Two Pointers',        icon: '👉' },
  { id: 'binary_search',         name: 'Binary Search',       icon: '🔎' },
  { id: 'interval_problems',     name: 'Intervals',           icon: '📊' },
  { id: 'trie',                  name: 'Trie',                icon: '🌿' },
  { id: 'bit_manipulation',      name: 'Bit Manipulation',    icon: '🔢' },
  { id: 'math_number_theory',    name: 'Math & Geometry',     icon: '📐' },
  { id: 'greedy',                name: 'Greedy',              icon: '🎯' },
  { id: 'divide_conquer',        name: 'Divide & Conquer',    icon: '⚔️' },
  { id: 'linked_list',           name: 'Linked List',         icon: '🔗' },
  { id: 'stack',                 name: 'Stack',               icon: '📚' },
  { id: 'array',                 name: 'Arrays & Hashing',    icon: '📦' },
  { id: 'sorting',               name: 'Sorting & Searching', icon: '🔀' },
  { id: 'prefix_sum',            name: 'Prefix Sum',          icon: '➕' },
  { id: 'hashing',               name: 'Hashing',             icon: '🧰' },
  { id: 'system_design',         name: 'System Design & OO',  icon: '🏗️' }
];

const QUESTIONS_DATABASE = data

// ============================================
// UTILITY FUNCTIONS
// ============================================
const getStorageKey = (questionTitle) => `dsa_question_${questionTitle.replace(/\s+/g, '_')}`;

const calculateRevisionDates = (solvedDate) => {
  const date = new Date(solvedDate);
  return {
    day3: new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day7: new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day30: new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    day90: new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
};

const getTodayDate = () => new Date().toISOString().split('T')[0];

const getQuestionData = (questionTitle) => {
  const key = getStorageKey(questionTitle);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveQuestionData = (questionTitle, data) => {
  const key = getStorageKey(questionTitle);
  localStorage.setItem(key, JSON.stringify(data));
};

// ============================================
// THEME HELPERS & HEATMAP KEYS
// ============================================
const THEME_STORAGE_KEY = 'dsa_theme_choice';
const STATS_STORAGE_KEY = 'dsa_stats_snapshot';
const HEATMAP_STORAGE_KEY = 'dsa_heatmap'; // date -> count map

const applyThemeToDocument = (theme) => {
  if (!theme) return;
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.bg);
  root.style.setProperty('--surface', theme.surface);
  root.style.setProperty('--text', theme.text);
  root.style.setProperty('--muted', theme.muted);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--chip-bg', theme.chipBg);
  root.style.setProperty('--chip-text', theme.chipText);
  root.style.setProperty('--card-border', shadeColor(theme.surface, -6)); // subtle border
  root.style.setProperty('--base-font-size', theme.fontSize);
};

// tiny helper to slightly shade color for borders (no external lib)
function shadeColor(color, percent) {
  // color should be like "#rrggbb"
  const f = parseInt(color.slice(1),16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = Math.round((t - (f >> 16)) * p) + (f >> 16);
  const G = Math.round((t - (f >> 8 & 0x00FF)) * p) + (f >> 8 & 0x00FF);
  const B = Math.round((t - (f & 0x0000FF)) * p) + (f & 0x0000FF);
  return `#${(0x1000000 + (R<<16) + (G<<8) + B).toString(16).slice(1)}`;
}

// ============================================
// HEATMAP HELPERS
// ============================================

// load heatmap map from localStorage
const loadHeatmap = () => {
  try {
    const raw = localStorage.getItem(HEATMAP_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveHeatmap = (map) => {
  try {
    localStorage.setItem(HEATMAP_STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    // ignore
  }
};

// increment a date count by delta (delta can be negative)
const adjustHeatmapForDate = (isoDate, delta) => {
  if (!isoDate) return;
  const map = loadHeatmap();
  const prev = Number(map[isoDate] || 0);
  const next = Math.max(0, prev + delta);
  if (next === 0) {
    delete map[isoDate];
  } else {
    map[isoDate] = next;
  }
  saveHeatmap(map);
};

// get counts for last N days (inclusive today)
const getHeatmapLastNDays = (nDays = 90) => {
  const map = loadHeatmap();
  const arr = [];
  const today = new Date();
  for (let i = nDays - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const iso = d.toISOString().split('T')[0];
    arr.push({ date: iso, count: Number(map[iso] || 0) });
  }
  return arr;
};

// ============================================
// WELCOME ANIMATION COMPONENT (unchanged logic)
// ============================================
const WelcomeAnimation = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const quotes = [
    "Consistency is the key to mastery! 🚀",
    "Every problem solved is a step forward! 💪",
    "Keep pushing, greatness awaits! ⭐",
    "Your dedication will pay off! 🎯",
    "Small steps today create big victories tomorrow! 🌟",
    "Believe in your grind — success is brewing! 🔥",
    "You’re closer than you think — keep going! 🚀",
    "Hard work beats talent when talent stops trying! 💪",
    "Turn your struggles into strength! 🛡️",
    "Discipline today, freedom tomorrow! 🎯",
    "Your future self will thank you — keep pushing! ⭐",
    "Dream big, work smart, stay consistent! 📈",
    "Challenges are opportunities in disguise! 🔍✨",
    "Great things take time — stay patient, stay focused! 🕰️",
    "Make progress, not excuses! 🔥",
    "Believe. Act. Achieve. 🌠",
    "Your effort today shapes your tomorrow! 🌅",
    "Winners are made from daily habits! ⚡",
    "Rise every time you fall — resilience builds champions! 🦾"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div style={{ backgroundColor: 'var(--bg)' }} className="fixed inset-0 z-50 flex items-center justify-center animate-fadeOut">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animate-typing overflow-hidden whitespace-nowrap border-r-4" style={{ color: 'var(--text)', borderRightColor: 'var(--accent)' }}>
          Welcome, Arpit! 👋
        </h1>
        <p className="text-xl mt-8" style={{ color: 'var(--muted)' }}>{randomQuote}</p>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const DSATracker = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // theme state
  const [currentThemeId, setCurrentThemeId] = useState(null);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // refresh flag to force re-render after localStorage updates
  const [refreshFlag, setRefreshFlag] = useState(0);

  // stats snapshot state (loaded from localStorage)
  const [statsSnapshot, setStatsSnapshot] = useState(() => {
    try {
      const s = localStorage.getItem(STATS_STORAGE_KEY);
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    // load theme from storage or apply default
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const theme = THEMES.find(t => t.id === stored);
      if (theme) {
        applyThemeToDocument(theme);
        setCurrentThemeId(theme.id);
      }
    } else {
      // apply first theme as default
      const defaultTheme = THEMES[0];
      applyThemeToDocument(defaultTheme);
      setCurrentThemeId(defaultTheme.id);
    }
  }, []);

  const applyTheme = (themeId) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;
    applyThemeToDocument(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    setCurrentThemeId(theme.id);
    setShowThemeMenu(false);
  };

  const getPatternProgress = (patternId) => {
    const questions = QUESTIONS_DATABASE.filter(q => q.pattern === patternId);
    const solved = questions.filter(q => {
      const data = getQuestionData(q.title);
      return data?.solved;
    }).length;
    return { solved, total: questions.length };
  };

  const getTodayRevisions = () => {
    const today = getTodayDate();
    const revisions = [];

    QUESTIONS_DATABASE.forEach(question => {
      const data = getQuestionData(question.title);
      if (data && data.solved && data.revisionDates) {
        ['day3', 'day7', 'day30', 'day90'].forEach(revision => {
          if (data.revisionDates[revision] === today) {
            const status = data.revisionStatus?.[revision] || 'pending';
            revisions.push({
              ...question,
              revisionType: revision,
              status,
              solvedDate: data.solvedDate
            });
          }
        });
      }
    });

    return revisions;
  };

  // compute stats from QUESTIONS_DATABASE + localStorage
  const computeStats = () => {
    const total = QUESTIONS_DATABASE.length;
    let solved = 0;
    const byDifficulty = {
      Easy: { solved: 0, total: 0 },
      Medium: { solved: 0, total: 0 },
      Hard: { solved: 0, total: 0 }
    };

    QUESTIONS_DATABASE.forEach(q => {
      const qdata = getQuestionData(q.title);
      const isSolved = !!qdata?.solved;
      if (isSolved) solved += 1;
      if (byDifficulty[q.difficulty]) {
        byDifficulty[q.difficulty].total += 1;
        if (isSolved) byDifficulty[q.difficulty].solved += 1;
      } else {
        // in case difficulty strings differ, count into Medium by default
        byDifficulty.Medium.total += 1;
        if (isSolved) byDifficulty.Medium.solved += 1;
      }
    });

    return { total, solved, byDifficulty };
  };

  // Save a snapshot to localStorage
  const saveStatsSnapshot = (snapshot) => {
    const toSave = { ...snapshot, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(toSave));
      setStatsSnapshot(toSave);
    } catch (e) {
      // ignore storage errors
    }
  };

  // ------------------------
  // toggleQuestionSolved (UPDATED to update heatmap)
  // ------------------------
  const toggleQuestionSolved = (questionTitle) => {
    const data = getQuestionData(questionTitle) || {};
    const wasSolved = !!data.solved;
    const prevSolvedDate = data.solvedDate;

    if (wasSolved) {
      // Untick - keep history but update solved flag
      data.solved = false;

      // If it was solved today, decrement today's heatmap count
      const today = getTodayDate();
      if (prevSolvedDate === today) {
        adjustHeatmapForDate(today, -1);
      }
    } else {
      // Tick - mark as solved
      data.solved = true;
      data.solvedDate = getTodayDate();
      data.revisionDates = calculateRevisionDates(data.solvedDate);
      if (!data.revisionStatus) {
        data.revisionStatus = {
          day3: 'pending',
          day7: 'pending',
          day30: 'pending',
          day90: 'pending'
        };
      }
      // increment today's heatmap count
      adjustHeatmapForDate(data.solvedDate, 1);
    }
    
    saveQuestionData(questionTitle, data);
    // force re-render reliably
    setRefreshFlag(f => f + 1);
  };

  const markRevisionComplete = (questionTitle, revisionType) => {
    const data = getQuestionData(questionTitle);
    if (data) {
      data.revisionStatus[revisionType] = 'completed';
      saveQuestionData(questionTitle, data);
      // force re-render reliably
      setRefreshFlag(f => f + 1);
    }
  };

  // ------------------------
  // resetQuestion (UPDATED to adjust heatmap if needed)
  // ------------------------
  const resetQuestion = (questionTitle) => {
    const data = getQuestionData(questionTitle);
    if (data && data.solved && data.solvedDate) {
      // decrement heatmap count for the date this was solved
      adjustHeatmapForDate(data.solvedDate, -1);
    }
    localStorage.removeItem(getStorageKey(questionTitle));
    // force re-render reliably
    setRefreshFlag(f => f + 1);
  };

  // resetAllQuestions still exists (kept for possible admin use) but unchanged in logic unless you previously replaced it.
  const resetAllQuestions = () => {
    if (window.confirm('Are you sure you want to reset ALL questions? This cannot be undone!')) {
      QUESTIONS_DATABASE.forEach(q => {
        const data = getQuestionData(q.title);
        if (data && data.solved && data.solvedDate) {
          // decrement heatmap for each solved date
          adjustHeatmapForDate(data.solvedDate, -1);
        }
        localStorage.removeItem(getStorageKey(q.title));
      });
      // force re-render reliably
      setRefreshFlag(f => f + 1);
    }
  };

  // Check for missed revisions on load
  useEffect(() => {
    const today = getTodayDate();
    QUESTIONS_DATABASE.forEach(question => {
      const data = getQuestionData(question.title);
      if (data && data.solved && data.revisionDates) {
        ['day3', 'day7', 'day30', 'day90'].forEach(revision => {
          const revisionDate = data.revisionDates[revision];
          if (revisionDate < today && data.revisionStatus[revision] === 'pending') {
            data.revisionStatus[revision] = 'missed';
            saveQuestionData(question.title, data);
          }
        });
      }
    });
    // ensure UI shows missed statuses
    setRefreshFlag(f => f + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When Stats page is opened or data changes, compute and persist snapshot
  useEffect(() => {
    if (currentPage === 'stats') {
      const snapshot = computeStats();
      saveStatsSnapshot(snapshot);
    }
    // run when currentPage or refreshFlag changes
  }, [currentPage, refreshFlag]);

  if (showWelcome) {
    return <WelcomeAnimation onComplete={() => setShowWelcome(false)} />;
  }

  // Shared style snippet for root containers to apply font-size + text color
  const rootContainerStyle = {
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
    fontSize: 'var(--base-font-size)'
  };

  // small helper to render difficulty row
  const DifficultyRow = ({ label, solved, total, color }) => {
    const pct = total === 0 ? 0 : Math.round((solved / total) * 100);
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div style={{ width: 12, height: 12, borderRadius: 4, background: color }} />
          <div style={{ color: 'var(--text)' }}>{label}</div>
        </div>
        <div className="flex items-center gap-4">
          <div style={{ color: 'var(--muted)' }}>{solved} / {total}</div>
          <div style={{ color: 'var(--muted)' }}>{pct}%</div>
        </div>
      </div>
    );
  };

  // ============================================
  // HOMEPAGE
  // ============================================
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen" style={rootContainerStyle}>
        {/* Navbar */}
        <nav style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="border-b px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>DSA Mastery Tracker</h1>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setCurrentPage('revisions')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <Calendar size={20} />
                <span style={{ color: 'var(--text)' }}>Today's Revisions</span>
              </button>

              <button
                onClick={() => setCurrentPage('stats')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <TrendingUp size={20} />
                <span style={{ color: 'var(--text)' }}>Stats</span>
              </button>

              <button
                onClick={() => setCurrentPage('heatmap')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <Book size={18} />
                <span style={{ color: 'var(--text)' }}>Heatmap</span>
              </button>

              <button
                onClick={resetAllQuestions}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <RotateCcw size={20} />
                <span>Reset All</span>
              </button>

              {/* Theme selector */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(s => !s)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                  style={{ backgroundColor: 'transparent', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}`, color: 'var(--text)' }}
                >
                  Theme
                </button>

                {showThemeMenu && (
                  <div style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg p-3 z-50 border">
                    <div className="grid grid-cols-3 gap-2">
                      {THEMES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => applyTheme(t.id)}
                          className="p-2 rounded-lg flex flex-col items-center justify-center text-xs"
                          style={{
                            background: `linear-gradient(180deg, ${t.surface}, ${t.bg})`,
                            color: t.chipText,
                            border: currentThemeId === t.id ? `2px solid ${t.accent}` : '1px solid rgba(255,255,255,0.06)'
                          }}
                          title={t.name}
                        >
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: t.accent }} />
                          <div className="mt-2" style={{ fontSize: 12 }}>{t.name.split(' ')[0]}</div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span>Font size</span>
                        <span style={{ color: 'var(--text)' }}>{getComputedStyle(document.documentElement).getPropertyValue('--base-font-size') || '16px'}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => {
                          const t = THEMES.find(tt => tt.id === currentThemeId) || THEMES[0];
                          const next = { ...t, fontSize: '14px' };
                          applyTheme(next.id); // apply currently selected theme but change font by applying directly
                          document.documentElement.style.setProperty('--base-font-size', '14px');
                          localStorage.setItem(THEME_STORAGE_KEY, currentThemeId);
                        }} className="px-3 py-1 rounded" style={{ background: 'transparent', color: 'var(--muted)' }}>
                          S
                        </button>
                        <button onClick={() => {
                          document.documentElement.style.setProperty('--base-font-size', '16px');
                          localStorage.setItem(THEME_STORAGE_KEY, currentThemeId);
                        }} className="px-3 py-1 rounded" style={{ background: 'transparent', color: 'var(--muted)' }}>
                          M
                        </button>
                        <button onClick={() => {
                          document.documentElement.style.setProperty('--base-font-size', '18px');
                          localStorage.setItem(THEME_STORAGE_KEY, currentThemeId);
                        }} className="px-3 py-1 rounded" style={{ background: 'transparent', color: 'var(--muted)' }}>
                          L
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </nav>

        {/* Patterns Grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>22 DSA Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DSA_PATTERNS.map(pattern => {
              const { solved, total } = getPatternProgress(pattern.id);
              const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

              return (
                <div
                  key={pattern.id}
                  onClick={() => {
                    setSelectedPattern(pattern.id);
                    setCurrentPage('pattern');
                    setFilterDifficulty('All');
                  }}
                  className="rounded-lg p-6 cursor-pointer hover:scale-105 transition transform border"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }}
                >
                  <div className="text-4xl mb-3" style={{ filter: 'contrast(120%)' }}>{pattern.icon}</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>{pattern.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--muted)' }}>
                      {solved} / {total}
                    </span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{percentage}%</span>
                  </div>
                  <div className="w-full rounded-full h-2 mt-3" style={{ backgroundColor: shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface') || '#111', 6) }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%`, backgroundColor: 'var(--accent)' }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

     // ============================================
  // HEATMAP PAGE (DATE RANGE: Dec 2025 -> Aug 2026)
  // ============================================
  if (currentPage === 'heatmap') {
    // --- build DAYS array for fixed range Dec 1, 2025 -> Aug 31, 2026 (inclusive) ---
    const startISO = '2025-12-01';
    const endISO = '2026-08-31';

    const startDate = new Date(startISO + 'T00:00:00Z');
    const endDate = new Date(endISO + 'T00:00:00Z');

    const map = loadHeatmap(); // existing helper reads localStorage
    const DAYS = [];
    for (let d = new Date(startDate); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = d.toISOString().split('T')[0];
      DAYS.push({ date: iso, count: Number(map[iso] || 0) });
    }

    // group into weeks for GitHub-like layout (columns = weeks)
    const weeks = [];
    let currentWeek = [];
    DAYS.forEach((dayObj, i) => {
      const d = new Date(dayObj.date + 'T00:00:00Z');
      const weekday = d.getUTCDay(); // 0 = Sun ... 6 = Sat
      currentWeek.push(dayObj);
      // if saturday or last day, push week
      if (weekday === 6 || i === DAYS.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // find max count to scale color intensity
    const maxCount = Math.max(...DAYS.map(d => d.count), 1);

    // color function: returns background color by intensity
    const colorForCount = (count) => {
      if (!count) return 'transparent';
      const ratio = Math.min(1, count / maxCount);
      const base = '34,197,94'; // green
      const alpha = 0.18 + 0.62 * ratio; // 0.18 .. 0.8
      return `rgba(${base}, ${alpha})`;
    };

    // Build month spans: for each week, take its first day and determine month.
    const weekMonths = weeks.map(w => {
      if (!w[0]) return null;
      const d = new Date(w[0].date + 'T00:00:00Z');
      return { monthIndex: d.getUTCMonth(), year: d.getUTCFullYear(), label: d.toLocaleString('default', { month: 'short' }) };
    });

    // Build spans: array of { label, startIndex, span }
    const monthSpans = [];
    for (let i = 0; i < weekMonths.length; i++) {
      const info = weekMonths[i];
      if (!info) continue;
      const labelWithYear = info.label + ' ' + info.year;
      if (monthSpans.length === 0) {
        monthSpans.push({ label: labelWithYear, start: i, span: 1 });
      } else {
        const last = monthSpans[monthSpans.length - 1];
        if (last.label === labelWithYear) {
          last.span += 1;
        } else {
          monthSpans.push({ label: labelWithYear, start: i, span: 1 });
        }
      }
    }

    // Monthly totals (map 'Mon YYYY' -> total) within this fixed range
    const monthlyTotals = {};
    DAYS.forEach(d => {
      const dt = new Date(d.date + 'T00:00:00Z');
      const key = dt.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Dec 2025"
      monthlyTotals[key] = (monthlyTotals[key] || 0) + Number(d.count || 0);
    });
    // convert to sorted array (latest first)
    const monthlyArray = Object.keys(monthlyTotals)
      .map(k => ({ month: k, total: monthlyTotals[k] }))
      .sort((a, b) => {
        // parse dates to sort descending
        const pa = new Date(a.month);
        const pb = new Date(b.month);
        return pb - pa;
      });

    // find best month
    const bestMonth = monthlyArray.reduce((best, m) => !best || m.total > best.total ? m : best, null);

    // tooltip helper
    const tooltipText = (day) => {
      const date = day.date;
      const count = day.count;
      return `${count} solved on ${date}`;
    };

    return (
      <div className="min-h-screen" style={rootContainerStyle}>
        {/* Navbar */}
        <nav style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="border-b px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2"
              style={{ color: 'var(--accent)' }}
            >
              ← Back to Home
            </button>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Pattern Mastery Heatmap</h1>
            <div style={{ width: 160 }} className="flex justify-end gap-4">
              <button
                onClick={() => setCurrentPage('stats')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <TrendingUp size={18} />
                Stats
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(s => !s)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                  style={{ backgroundColor: 'transparent', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}`, color: 'var(--text)' }}
                >
                  Theme
                </button>
                {showThemeMenu && (
                  <div style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg p-3 z-50 border">
                    <div className="grid grid-cols-3 gap-2">
                      {THEMES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => applyTheme(t.id)}
                          className="p-2 rounded-lg flex flex-col items-center justify-center text-xs"
                          style={{
                            background: `linear-gradient(180deg, ${t.surface}, ${t.bg})`,
                            color: t.chipText,
                            border: currentThemeId === t.id ? `2px solid ${t.accent}` : '1px solid rgba(255,255,255,0.06)'
                          }}
                          title={t.name}
                        >
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: t.accent }} />
                          <div className="mt-2" style={{ fontSize: 12 }}>{t.name.split(' ')[0]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Heatmap Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p style={{ color: 'var(--muted)', marginBottom: 12 }}>
            This heatmap shows problems you solved between Dec 2025 and Aug 2026. Darker squares = more problems solved that day.
          </p>

          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {/* Left: heatmap area with month labels */}
            <div style={{ overflowX: 'auto' }}>
              {/* Month labels row */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center' }}>
                {monthSpans.map((ms, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: `${ms.span * 20}px`, // each week column approx 20px wide
                      padding: '2px 6px',
                      color: 'var(--muted)'
                    }}
                  >
                    <strong style={{ color: 'var(--text)' }}>{ms.label}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                {/* For each week column */}
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {week.map((dayObj, di) => (
                      <div
                        key={di}
                        title={tooltipText(dayObj)}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 3,
                          background: dayObj.count ? colorForCount(dayObj.count) : shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', 6),
                          border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -10)}`,
                          display: 'inline-block'
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Monthly Summary */}
            <div style={{ minWidth: 220 }}>
              <div style={{ backgroundColor: 'var(--surface)', border: `1px solid var(--card-border)`, padding: 12, borderRadius: 8 }}>
                <h3 style={{ margin: 0, color: 'var(--text)', fontWeight: 700 }}>Monthly Summary</h3>
                <p style={{ marginTop: 6, color: 'var(--muted)' }}>Totals for months in Dec 2025 → Aug 2026.</p>

                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {monthlyArray.length === 0 && <div style={{ color: 'var(--muted)' }}>No data</div>}
                  {monthlyArray.map(m => (
                    <div key={m.month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ color: m.month === bestMonth?.month ? 'var(--accent)' : 'var(--text)', fontWeight: m.month === bestMonth?.month ? 700 : 500 }}>
                        {m.month}
                      </div>
                      <div style={{ color: 'var(--muted)' }}>{m.total}</div>
                    </div>
                  ))}
                </div>

                {bestMonth && (
                  <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: 'linear-gradient(90deg, rgba(0,0,0,0.02), transparent)' }}>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>Best month</div>
                    <div style={{ fontWeight: 700, color: 'var(--accent)', marginTop: 4 }}>{bestMonth.month} — {bestMonth.total} solved</div>
                  </div>
                )}

                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => {
                      // clear full heatmap (confirm)
                      if (!window.confirm('Clear entire heatmap data? This will remove counts for all days.')) return;
                      localStorage.removeItem(HEATMAP_STORAGE_KEY);
                      setRefreshFlag(f => f + 1);
                    }}
                    className="px-3 py-1 rounded"
                    style={{ background: 'transparent', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}`, color: 'var(--muted)' }}
                  >
                    Clear heatmap
                  </button>

                  <button
                    onClick={() => {
                      // refresh view
                      setRefreshFlag(f => f + 1);
                    }}
                    className="px-3 py-1 rounded"
                    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }


  // ============================================
  // STATS PAGE
  // ============================================
  if (currentPage === 'stats') {
    const { total, solved, byDifficulty } = computeStats();
    const pct = total === 0 ? 0 : Math.round((solved / total) * 100);

    // SVG circle parameters
    const radius = 54;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (pct / 100) * circumference;

    return (
      <div className="min-h-screen" style={rootContainerStyle}>
        {/* Navbar */}
        <nav style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="border-b px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2"
              style={{ color: 'var(--accent)' }}
            >
              ← Back to Home
            </button>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Stats</h1>
            <div style={{ width: 160 }} className="flex justify-end gap-4">
              <button
                onClick={() => setCurrentPage('revisions')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <Calendar size={18} />
                Revisions
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(s => !s)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                  style={{ backgroundColor: 'transparent', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}`, color: 'var(--text)' }}
                >
                  Theme
                </button>
                {showThemeMenu && (
                  <div style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg p-3 z-50 border">
                    <div className="grid grid-cols-3 gap-2">
                      {THEMES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => applyTheme(t.id)}
                          className="p-2 rounded-lg flex flex-col items-center justify-center text-xs"
                          style={{
                            background: `linear-gradient(180deg, ${t.surface}, ${t.bg})`,
                            color: t.chipText,
                            border: currentThemeId === t.id ? `2px solid ${t.accent}` : '1px solid rgba(255,255,255,0.06)'
                          }}
                          title={t.name}
                        >
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: t.accent }} />
                          <div className="mt-2" style={{ fontSize: 12 }}>{t.name.split(' ')[0]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Stats Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Circular progress */}
            <div className="flex flex-col items-center">
              <svg
                height={radius * 2}
                width={radius * 2}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g transform={`translate(${radius}, ${radius})`}>
                  <circle
                    stroke={shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface') || '#111', 6)}
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                  />
                  <circle
                    stroke="var(--accent)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    style={{ transition: 'stroke-dashoffset 700ms ease 0s', filter: 'none' }}
                  />
                  <text x="0" y="0" textAnchor="middle" dy="8" style={{ fill: 'var(--text)', fontSize: 18, fontWeight: 700 }}>
                    {pct}%
                  </text>
                </g>
              </svg>
              <div className="mt-4 text-center">
                <div style={{ color: 'var(--text)', fontWeight: 700 }}>{solved} / {total} solved</div>
                <div style={{ color: 'var(--muted)' }}>Total Questions</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-6">
              <div>
                <h3 style={{ color: 'var(--text)', fontSize: 18, fontWeight: 700 }}>Difficulty Breakdown</h3>
                <p style={{ color: 'var(--muted)', marginTop: 6 }}>See how many Easy / Medium / Hard problems you've solved.</p>
              </div>

              <div className="space-y-3">
                <DifficultyRow label="Easy" solved={byDifficulty.Easy.solved} total={byDifficulty.Easy.total} color="#10b981" />
                <div style={{ height: 8, width: '100%', background: shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', 6), borderRadius: 6 }}>
                  <div style={{ width: `${byDifficulty.Easy.total === 0 ? 0 : Math.round((byDifficulty.Easy.solved / byDifficulty.Easy.total) * 100)}%`, height: '100%', background: '#10b981', borderRadius: 6 }} />
                </div>

                <DifficultyRow label="Medium" solved={byDifficulty.Medium.solved} total={byDifficulty.Medium.total} color="#f59e0b" />
                <div style={{ height: 8, width: '100%', background: shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', 6), borderRadius: 6 }}>
                  <div style={{ width: `${byDifficulty.Medium.total === 0 ? 0 : Math.round((byDifficulty.Medium.solved / byDifficulty.Medium.total) * 100)}%`, height: '100%', background: '#f59e0b', borderRadius: 6 }} />
                </div>

                <DifficultyRow label="Hard" solved={byDifficulty.Hard.solved} total={byDifficulty.Hard.total} color="#ef4444" />
                <div style={{ height: 8, width: '100%', background: shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', 6), borderRadius: 6 }}>
                  <div style={{ width: `${byDifficulty.Hard.total === 0 ? 0 : Math.round((byDifficulty.Hard.solved / byDifficulty.Hard.total) * 100)}%`, height: '100%', background: '#ef4444', borderRadius: 6 }} />
                </div>
              </div>

              <div className="pt-4" style={{ color: 'var(--muted)' }}>
                <div>Snapshot saved: {statsSnapshot?.timestamp ? new Date(statsSnapshot.timestamp).toLocaleString() : '—'}</div>
                <div style={{ marginTop: 6 }}>
                  <button
                    onClick={() => {
                      const snapshot = computeStats();
                      saveStatsSnapshot(snapshot);
                      // give quick visual feedback by bumping refreshFlag
                      setRefreshFlag(f => f + 1);
                    }}
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                  >
                    Save Snapshot
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem(STATS_STORAGE_KEY);
                      setStatsSnapshot(null);
                    }}
                    className="ml-3 px-4 py-2 rounded-lg"
                    style={{ backgroundColor: 'transparent', color: 'var(--muted)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
                  >
                    Clear Snapshot
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ============================================
  // PATTERN PAGE
  // ============================================
  if (currentPage === 'pattern' && selectedPattern) {
    const pattern = DSA_PATTERNS.find(p => p.id === selectedPattern);
    let questions = QUESTIONS_DATABASE.filter(q => q.pattern === selectedPattern);
    
    if (filterDifficulty !== 'All') {
      questions = questions.filter(q => q.difficulty === filterDifficulty);
    }

    return (
      <div className="min-h-screen" style={rootContainerStyle}>
        {/* Navbar */}
        <nav style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="border-b px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2"
              style={{ color: 'var(--accent)' }}
            >
              ← Back to Home
            </button>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{pattern.icon} {pattern.name}</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('revisions')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <Calendar size={20} />
                Today's Revisions
              </button>
              <button
                onClick={() => setCurrentPage('stats')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <TrendingUp size={18} />
                Stats
              </button>
              <button
                onClick={() => setCurrentPage('heatmap')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <Book size={18} />
                Heatmap
              </button>
            </div>
          </div>
        </nav>

        {/* Difficulty Filter */}
        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-3">
          {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setFilterDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg transition`}
              style={{
                backgroundColor: filterDifficulty === difficulty ? 'var(--accent)' : 'transparent',
                color: filterDifficulty === difficulty ? '#fff' : 'var(--muted)',
                border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}`
              }}
            >
              {difficulty}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {questions.length === 0 ? (
            <p className="text-center py-12" style={{ color: 'var(--muted)' }}>No questions available for this filter.</p>
          ) : (
            <div className="space-y-4">
              {questions.map((question, idx) => {
                const data = getQuestionData(question.title);
                const isSolved = data?.solved;

                return (
                  <div
                    key={idx}
                    className="rounded-lg p-5 border transition"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleQuestionSolved(question.title)}
                          className="mt-1"
                          style={{ color: isSolved ? 'var(--accent)' : 'var(--muted)' }}
                        >
                          {isSolved ? (
                            <CheckCircle2 size={24} />
                          ) : (
                            <Circle size={24} />
                          )}
                        </button>

                        {/* Question Info */}
                        <div className="flex-1">
                          <a
                            href={question.leetcodeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold flex items-center gap-2"
                            style={{ color: 'var(--accent)' }}
                          >
                            {question.title}
                            <ExternalLink size={16} />
                          </a>
                          <div className="flex gap-3 mt-2 text-sm">
                            <span style={{ backgroundColor: question.difficulty === 'Easy' ? shadeColor('#10b981', -40) : question.difficulty === 'Medium' ? shadeColor('#f59e0b', -40) : shadeColor('#ef4444', -40), color: 'var(--chip-text)', padding: '4px 8px', borderRadius: 6 }}>
                              {question.difficulty}
                            </span>
                            {isSolved && data.solvedDate && (
                              <span style={{ color: 'var(--muted)' }}>
                                Solved: {data.solvedDate}
                              </span>
                            )}
                          </div>

                          {/* Revision History */}
                          {isSolved && data.revisionStatus && (
                            <div className="mt-3 flex gap-2 flex-wrap">
                              {['day3', 'day7', 'day30', 'day90'].map(rev => {
                                const status = data.revisionStatus[rev];
                                const revDate = data.revisionDates[rev];
                                return (
                                  <span
                                    key={rev}
                                    className={`px-2 py-1 rounded text-xs flex items-center gap-1`}
                                    style={{
                                      backgroundColor: status === 'completed' ? 'rgba(34,197,94,0.08)' : status === 'missed' ? 'rgba(239,68,68,0.08)' : 'transparent',
                                      color: status === 'completed' ? 'var(--accent)' : status === 'missed' ? 'var(--muted)' : 'var(--muted)',
                                      border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}`
                                    }}
                                  >
                                    {rev.replace('day', '')}d
                                    {status === 'completed' ? (
                                      <Check size={12} />
                                    ) : status === 'missed' ? (
                                      <X size={12} />
                                    ) : (
                                      ` (${revDate})`
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reset Button */}
                      {isSolved && (
                        <button
                          onClick={() => {
                            if (window.confirm('Reset this question?')) {
                              resetQuestion(question.title);
                            }
                          }}
                          className="transition"
                          style={{ color: 'var(--muted)' }}
                        >
                          <RotateCcw size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // TODAY'S REVISIONS PAGE
  // ============================================
  if (currentPage === 'revisions') {
    const todayRevisions = getTodayRevisions();

    return (
      <div className="min-h-screen" style={rootContainerStyle}>
        {/* Navbar */}
        <nav style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }} className="border-b px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2"
              style={{ color: 'var(--accent)' }}
            >
              ← Back to Home
            </button>
            <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <Calendar size={28} />
              Today's Revisions
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('stats')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <TrendingUp size={18} />
                Stats
              </button>
              <button
                onClick={() => setCurrentPage('heatmap')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}
              >
                <Book size={18} />
                Heatmap
              </button>
              <div style={{ width: 32 }} />
            </div>
          </div>
        </nav>

        {/* Revisions Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {todayRevisions.length === 0 ? (
            <div className="text-center py-16">
              <Book size={64} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
              <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text)' }}>No Revisions Due Today! 🎉</h2>
              <p style={{ color: 'var(--muted)' }}>
                You can revise some theory or solve new problems to stay sharp.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                {todayRevisions.length} question{todayRevisions.length > 1 ? 's' : ''} to revise
              </h2>
              {todayRevisions.map((item, idx) => {
                const pattern = DSA_PATTERNS.find(p => p.id === item.pattern);
                const canComplete = item.status === 'pending' || item.status === 'missed';

                return (
                  <div
                    key={idx}
                    className="rounded-lg p-5 border"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--card-border)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href={item.leetcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold flex items-center gap-2"
                          style={{ color: 'var(--accent)' }}
                        >
                          {item.title}
                          <ExternalLink size={16} />
                        </a>
                        <div className="flex gap-3 mt-2 text-sm">
                          <span style={{ color: 'var(--muted)' }}>
                            {pattern?.icon} {pattern?.name}
                          </span>
                          <span style={{ padding: '4px 8px', borderRadius: 6, color: 'var(--chip-text)', backgroundColor: item.difficulty === 'Easy' ? '#052e11' : item.difficulty === 'Medium' ? '#2a1300' : '#2a0b0b' }}>
                            {item.difficulty}
                          </span>
                          <span style={{ padding: '4px 8px', borderRadius: 6, color: 'var(--chip-text)', backgroundColor: item.revisionType === 'day3' ? 'rgba(96,165,250,0.12)' : item.revisionType === 'day7' ? 'rgba(139,92,246,0.12)' : item.revisionType === 'day30' ? 'rgba(249,115,22,0.12)' : 'rgba(236,72,153,0.12)' }}>
                            {item.revisionType.replace('day', '')} Day Revision
                          </span>
                          {item.status === 'missed' && (
                            <span style={{ padding: '4px 8px', borderRadius: 6, backgroundColor: 'rgba(239,68,68,0.08)', color: 'var(--muted)' }}>
                              Missed
                            </span>
                          )}
                        </div>
                        <p style={{ color: 'var(--muted)', marginTop: 4 }}>
                          Originally solved: {item.solvedDate}
                        </p>
                      </div>

                      {/* Mark Complete Button */}
                      {canComplete && (
                        <button
                          onClick={() => markRevisionComplete(item.title, item.revisionType)}
                          className="ml-4 px-4 py-2 rounded-lg transition flex items-center gap-2"
                          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                        >
                          <Check size={18} />
                          Complete
                        </button>
                      )}
                      {item.status === 'completed' && (
                        <span className="ml-4 px-4 py-2 rounded-lg flex items-center gap-2" style={{ backgroundColor: 'transparent', color: 'var(--muted)', border: `1px solid ${shadeColor(getComputedStyle(document.documentElement).getPropertyValue('--surface')||'#111', -6)}` }}>
                          <Check size={18} />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// ============================================
// STYLES
// ============================================
const styles = `
  :root {
    --bg: #0b1220;
    --surface: #0f1724;
    --text: #e6eef8;
    --muted: #98a3bc;
    --accent: #60a5fa;
    --chip-bg: #112033;
    --chip-text: #cfe8ff;
    --card-border: #0b1220;
    --base-font-size: 16px;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .animate-typing {
    animation: typing 2s steps(20, end);
  }
  
  .animate-fadeIn {
    animation: fadeIn 1s ease-in 2s both;
  }
  
  .animate-fadeOut {
    animation: fadeOut 0.5s ease-out 3s forwards;
  }
`;

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <DSATracker />
    </>
  );
}
