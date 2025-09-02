'use client';

import { useState } from 'react';
import styles from './home.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { IoPlaySharp } from "react-icons/io5";
import type { Action } from './types/action';


export default function Home() {
  const [dateIndex, setDateIndex] = useState(0);
  const [timeMinutes, setTimeMinutes] = useState(480);
  const [actions, setActions] = useState<Action[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const dateOptions = ['15 05 2025', '16 05 2025', '17 05 2025'];
  const selectedDate = dateOptions[dateIndex];
  const selectedTime = `${String(Math.floor(timeMinutes / 60)).padStart(2, '0')}:00`;

  const fadeSlide = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
  };

  const getAgentSuggestion = async () => {
    setLoading(true);
    setShowResponse(false);

    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, time: selectedTime }),
    });

    const data = await res.json();
    setActions(data.actions || []);
    setSummary(data.summary || '');
    setLoading(false);
    setShowResponse(true);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          {!showResponse ? (
            <motion.div
              key="input"
              variants={fadeSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.inputContainer}
            >
              <div className={styles.datetime}>
                <p className={styles.dateText}>{selectedDate}</p>
                <p className={styles.timeText}>{selectedTime}</p>

                <div className={styles.sliderWrapper}>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={dateIndex}
                    onChange={(e) => setDateIndex(Number(e.target.value))}
                    className={styles.dateSlider}
                  />
                </div>

                <div className={styles.sliderWrapper}>
                  <input
                    type="range"
                    min="480"
                    max="1380"
                    step="60"
                    value={timeMinutes}
                    onChange={(e) => setTimeMinutes(Number(e.target.value))}
                    className={styles.timeSlider}
                  />
                </div>

                <button onClick={getAgentSuggestion} className={styles.button}>
                  {loading ? 'Thinking...' : <IoPlaySharp />}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              variants={fadeSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.responseContainer}
            >
              {summary && (
                <div className={styles.summaryBox}>
                  <p className={styles.summaryTitle}></p>
                  <p>{summary}</p>
                </div>
              )}

              {actions.map((action, idx) => {
                switch (action.type) {
                  case 'reminder': {
                    const includesTime = /\d{2}:\d{2}/.test(action.title);
                    return (
                      <div key={idx} className={styles.reminder}>
                         {action.title}
                        {!includesTime && action.time && (
                          <> at {action.time.substring(11, 16)}</>
                        )}
                      </div>
                    );
                  }
                  case 'suggest playlist':
                    return (
                      <div key={idx} className={styles.suggestBox}>
                        {' '}
                        <strong>{action.playlist_name}</strong>
                        <br />
                        {' '}
                        <em>{action['song name']}</em>
                        <div className={styles.buttonRow}>
                        <button
            
                            className={styles.responseButton}
                        >
                        <IoPlaySharp />
                        </button>
                      </div>

                        
                      </div>
                    );
                  default:
                    return null;
                }
              })}

            <div className={styles.buttonRow}>

              <button
                onClick={() => setShowResponse(false)}
                className={styles.responseButton}
              >
                Yes
              </button>
              <button
                onClick={() => setShowResponse(false)}
                className={styles.responseButton}
              >
                No
              </button>

            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
