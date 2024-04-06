from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

# Database connection parameters
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'your_root_password'
DB_NAME = 'your_database_name'

# SQLAlchemy engine
engine = create_engine(f'mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}', echo=True)

# Create database
try:
    engine.execute(f'CREATE DATABASE {DB_NAME}')
    print(f"Database '{DB_NAME}' created successfully")
except OperationalError as e:
    print(f"Error creating database '{DB_NAME}': {e}")

# Create user and grant privileges
try:
    engine.execute(f"CREATE USER 'your_username'@'{DB_HOST}' IDENTIFIED BY 'your_password'")
    engine.execute(f"GRANT ALL PRIVILEGES ON {DB_NAME}.* TO 'your_username'@'{DB_HOST}'")
    engine.execute("FLUSH PRIVILEGES")
    print(f"User 'your_username' created and privileges granted")
except OperationalError as e:
    print(f"Error creating user and granting privileges: {e}")
