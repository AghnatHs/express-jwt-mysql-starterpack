# Express-jwt-mysql-starterpack

Express starterpack for tedious authentication and user email registration .

- Included: Auth stored at httpOnly Cookie (login, logout, refresh jwt); User (Registration, email verification) 

## Installation
1. Clone project
2. Install modules
```bash
npm install
```
3. Configure .env file
4. Create new mysql database and run this
```sql
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(320) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '' UNIQUE,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
5. Delete .git from project folder
6. Rename the folder as you like
7. Done
## Endpoints
1. POST /api/users => Register user
2. GET /api/users/verify/:email/:register_token => Verify user email to activate the user
3. GET /api/user => Get user profile (protected)
4. POST /api/auth/login => Login using email and password
5. POST /api/auth/logout => Logout
6. POST /api/auth/refresh => Refresh access token using refresh token


