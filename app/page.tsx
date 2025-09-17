'use client';

import { useState } from 'react';
import styles from './home.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { IoPlaySharp } from "react-icons/io5";
import type { Action } from './types/action';


export default function Home() {




  // State variables
  const [dateIndex, setDateIndex] = useState(0);
  const [timeMinutes, setTimeMinutes] = useState(480);
  const [actions, setActions] = useState<Action[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  // Defining date and time state variables. 

  const dateOptions = ['15 05 2025', '16 05 2025', '17 05 2025'];

  const selectedDate = dateOptions[dateIndex];

  // Time in HH:MM format
  const selectedTime = `${String(Math.floor(timeMinutes / 60)).padStart(2, '0')}:00`;



// Framer motion object that defines the animation for fading and sliding components in and out.

  const fadeSlide = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
  };

  // asynchronous function that handles fetching suggestions from the open AI API and updating the UI state

  const getAgentSuggestion = async () => {
    setLoading(true);
    setShowResponse(false);


    // sends a POST request to the /api/agent endpoint with the selected date and time as JSON in the request body.

    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, time: selectedTime }),
    });

    // waits for the response, parses it as JSON, and updates the actions and summary state variables with the data received.
  
    // note..... should of done error handling here.......
    // Parses the response from the server into a JavaScript object.
    const data = await res.json();


    // Updates the UI with the server’s response

    setActions(data.actions || []);
    setSummary(data.summary || '');


    // sets loading to false and shows the response section in the UI.


    setLoading(false);
    setShowResponse(true);
  };

  return (

    // page wrapper
    <div className={styles.background}>
      <div className={styles.container}>

        {/* framer motion component that animates between input and response views */}
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

                {/* Date and time display */}
                <p className={styles.dateText}>{selectedDate}</p>
                <p className={styles.timeText}>{selectedTime}</p>

                {/* Date and Time sliders that update local state */}

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

                {/* Button to fetch suggestions from the AI agent */}

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
              {/* Renders a summary text returned by open API. */}
              {summary && (
                <div className={styles.summaryBox}>
                  <p className={styles.summaryTitle}></p>
                  <p>{summary}</p>
                </div>
              )}


              {/* Loops over the actions array and renders different UI elements based on the action type. */}

              {actions.map((action, idx) => {
                switch (action.type) {
                  case 'reminder': {
                    {/* Check if the title includes a time in HH:MM format to prevent duplication... needs improvement.. */}
                    const includesTime = /\d{2}:\d{2}/.test(action.title);
                    return (


                      <div key={idx} className={styles.reminder}>

                         {/* renders the reminder title */}
                         {action.title}

                         {/* conditionally shows the time */}
                        {!includesTime && action.time && (
                          <> at {action.time.substring(11, 16)}</>
                        )}
                      </div>
                    );
                  }
                  {/* Renders a playlist suggestion with a dummy play button....link up to spotify api??? */}
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


            {/* Buttons to go back to the input view */}

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
