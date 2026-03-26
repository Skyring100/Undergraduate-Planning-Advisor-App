SET p=%~dp0
cd sqlite_tools
sqlite3 %p%backend\db\database.db
PAUSE