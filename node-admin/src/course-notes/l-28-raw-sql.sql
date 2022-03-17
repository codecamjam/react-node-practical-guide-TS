USE node_admin;

SELECT o.created_at AS 'date', SUM(oi.price * oi.quantity) AS 'sum'
FROM `order` o
JOIN order_item oi ON o.id = oi.order_id
GROUP BY o.created_at;