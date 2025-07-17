// use rusqlite::{Connection, Result};
// use serde::{Serialize, Deserialize};

// #[derive(Debug, Serialize, Deserialize)]
// pub struct User {
//     pub id: i32,
//     pub name: String,
//     pub age: i32,
// }

// fn get_connection() -> Result<Connection> {
//     let conn = Connection::open("users.db")?;
//     conn.execute(
//         "CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT NOT NULL,
//             age INTEGER NOT NULL
//         )",
//         [],
//     )?;
//     Ok(conn)
// }

// pub fn create_user(name: &str, age: i32) -> Result<()> {
//     let conn = get_connection()?;
//     conn.execute("INSERT INTO users (name, age) VALUES (?1, ?2)", (name, age))?;
//     Ok(())
// }

// pub fn get_all_users() -> Result<Vec<User>> {
//     let conn = get_connection()?;
//     let mut stmt = conn.prepare("SELECT id, name, age FROM users")?;
//     let user_iter = stmt.query_map([], |row| {
//         Ok(User {
//             id: row.get(0)?,
//             name: row.get(1)?,
//             age: row.get(2)?,
//         })
//     })?;

//     Ok(user_iter.filter_map(Result::ok).collect())
// }

// pub fn update_user(id: i32, name: &str, age: i32) -> Result<()> {
//     let conn = get_connection()?;
//     conn.execute("UPDATE users SET name = ?1, age = ?2 WHERE id = ?3", (name, age, id))?;
//     Ok(())
// }

// pub fn delete_user(id: i32) -> Result<()> {
//     let conn = get_connection()?;
//     conn.execute("DELETE FROM users WHERE id = ?1", (id,))?;
//     Ok(())
// }


use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use std::path::PathBuf;

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
    conn.execute("UPDATE users SET name = ?1, age = ?2 WHERE id = ?3", (name, age, id))?;
    Ok(())
}

pub fn delete_user(app: &AppHandle, id: i32) -> Result<()> {
    let conn = get_connection(app)?;
    conn.execute("DELETE FROM users WHERE id = ?1", [id])?;
    Ok(())
}
