use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub age: i32,
}

fn db_path(app: &AppHandle) -> PathBuf {
    let base_dir = app
        .path()
        .app_data_dir()
        .expect("Failed to get app data dir");

    std::fs::create_dir_all(&base_dir).expect("Failed to create data directory");

    base_dir.join("users.db")
}

fn get_connection(app: &AppHandle) -> Result<Connection> {
    let path = db_path(app);
    let conn = Connection::open(&path)?;
    conn.execute_batch(include_str!("schema.sql"))?;
    Ok(conn)
}

pub fn create_user(app: &AppHandle, name: &str, age: i32) -> Result<()> {
    let conn = get_connection(app)?;
    conn.execute("INSERT INTO users (name, age) VALUES (?1, ?2)", (name, age))?;
    Ok(())
}

pub fn get_all_users(app: &AppHandle) -> Result<Vec<User>> {
    let conn = get_connection(app)?;
    let mut stmt = conn.prepare("SELECT id, name, age FROM users")?;
    let users = stmt
        .query_map([], |row| {
            Ok(User {
                id: row.get(0)?,
                name: row.get(1)?,
                age: row.get(2)?,
            })
        })?
        .filter_map(Result::ok)
        .collect();
    Ok(users)
}

pub fn update_user(app: &AppHandle, id: i32, name: &str, age: i32) -> Result<()> {
    let conn = get_connection(app)?;
    conn.execute(
        "UPDATE users SET name = ?1, age = ?2 WHERE id = ?3",
        (name, age, id),
    )?;
    Ok(())
}

pub fn delete_user(app: &AppHandle, id: i32) -> Result<()> {
    let conn = get_connection(app)?;
    conn.execute("DELETE FROM users WHERE id = ?1", [id])?;
    Ok(())
}
