// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{AppHandle, Manager};
use tauri_plugin_opener;

mod db;
use db::*;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// fn create_user_cmd(name: String, age: i32) -> Result<(), String> {
//     create_user(&name, age).map_err(|e| e.to_string())
// }

// #[tauri::command]
// fn get_users_cmd() -> Result<Vec<User>, String> {
//     get_all_users().map_err(|e| e.to_string())
// }

// #[tauri::command]
// fn update_user_cmd(id: i32, name: String, age: i32) -> Result<(), String> {
//     update_user(id, &name, age).map_err(|e| e.to_string())
// }

// #[tauri::command]
// fn delete_user_cmd(id: i32) -> Result<(), String> {
//     delete_user(id).map_err(|e| e.to_string())
// }

#[tauri::command]
fn create_user_cmd(app: AppHandle, name: String, age: i32) -> Result<(), String> {
    create_user(&app, &name, age).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_users_cmd(app: AppHandle) -> Result<Vec<User>, String> {
    get_all_users(&app).map_err(|e| e.to_string())
}

#[tauri::command]
fn update_user_cmd(app: AppHandle, id: i32, name: String, age: i32) -> Result<(), String> {
    update_user(&app, id, &name, age).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_user_cmd(app: AppHandle, id: i32) -> Result<(), String> {
    delete_user(&app, id).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            create_user_cmd,
            get_users_cmd,
            update_user_cmd,
            delete_user_cmd
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
