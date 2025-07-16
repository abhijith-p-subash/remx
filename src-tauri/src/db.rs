use rusqlite::{Connection, Result};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub age: i32,
}

fn get_connection() -> Result<Connection> {
    let conn = Connection::open("users.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
        )",
        [],
    )?;
    Ok(conn)
}

pub fn create_user(name: &str, age: i32) -> Result<()> {
    let conn = get_connection()?;
    conn.execute("INSERT INTO users (name, age) VALUES (?1, ?2)", (name, age))?;
    Ok(())
}

pub fn get_all_users() -> Result<Vec<User>> {
    let conn = get_connection()?;
    let mut stmt = conn.prepare("SELECT id, name, age FROM users")?;
    let user_iter = stmt.query_map([], |row| {
        Ok(User {
            id: row.get(0)?,
            name: row.get(1)?,
            age: row.get(2)?,
        })
    })?;

    Ok(user_iter.filter_map(Result::ok).collect())
}

pub fn update_user(id: i32, name: &str, age: i32) -> Result<()> {
    let conn = get_connection()?;
    conn.execute("UPDATE users SET name = ?1, age = ?2 WHERE id = ?3", (name, age, id))?;
    Ok(())
}

pub fn delete_user(id: i32) -> Result<()> {
    let conn = get_connection()?;
    conn.execute("DELETE FROM users WHERE id = ?1", (id,))?;
    Ok(())
}
