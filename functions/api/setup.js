export async function onRequest(context) {
    const { env } = context;
    const db = env.DB;

    try {
        // פקודה ליצירת טבלת הלקוחות החדשה לתזכורות
        await db.prepare(`
            CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id INTEGER,
                name TEXT NOT NULL,
                payment_day INTEGER,
                reminder_method TEXT,
                phone TEXT,
                email TEXT,
                status TEXT DEFAULT 'active'
            );
        `).run();

        return new Response("<h1 style='color:green; text-align:center; font-family:sans-serif;'>הטבלה נוצרה בהצלחה! אפשר לחזור למערכת ולהוסיף לקוחות.</h1>", { 
            headers: { "Content-Type": "text/html; charset=utf-8" } 
        });
    } catch (e) {
        return new Response("שגיאה ביצירת הטבלה: " + e.message, { 
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" }
        });
    }
}
