SELECT 
    u.city, COUNT(DISTINCT r.user_id) AS unique_registrations
FROM 
    Users u
JOIN 
    Registrations r ON u.user_id = r.user_id
GROUP BY 
    u.city
ORDER BY 
    unique_registrations DESC
LIMIT 5;