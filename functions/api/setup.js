export async function onRequest(context) {
    try {
        // יצירת הטבלה
        await context.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password_hash TEXT,
                business_name TEXT
            )
        `).run();

        // הזרקת המשתמש
        await context.env.DB.prepare(`
            INSERT OR IGNORE INTO users (email, password_hash, business_name) 
            VALUES ('test@tpg.com', '123456', 'עסק לדוגמה')
        `).run();

        return new Response("המסד מוכן! אפשר לחזור לאתר ולהתחבר.", {
            headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
    } catch (e) {
        return new Response("שגיאה: " + e.message, {
            headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
    }
}
