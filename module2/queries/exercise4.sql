SELECT 
    e.event_id, e.title, COUNT(s.session_id) AS sessions_in_peak_hours
FROM 
    Events e
JOIN 
    Sessions s ON e.event_id = s.event_id
WHERE 
    TIME(s.start_time) >= '10:00:00' AND TIME(s.end_time) <= '12:00:00'
GROUP BY 
    e.event_id, e.title;