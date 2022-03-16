--to delete all the data in the node_admin db
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE permission;
TRUNCATE TABLE role;

SET FOREIGN_KEY_CHECKS = 1;