export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB;

    // כשהאתר מבקש לראות לקוחות (GET)
    if (request.method === "GET") {
        try {
            const { results } = await db.prepare("SELECT * FROM users").all();
            return Response.json(results);
        } catch (e) {
            return Response.json({ error: e.message }, { status: 500 });
        }
    }

    // כשהאתר שולח לקוח חדש להוספה (POST)
    if (request.method === "POST") {
        try {
            const data = await request.json();
            
            // מכניס את הלקוח החדש למסד הנתונים עם סיסמת ברירת מחדל
            await db.prepare(`
                INSERT INTO users (email, business_name, password_hash) 
                VALUES (?, ?, ?)
            `).bind(data.email, data.business_name, '123456').run();

            return Response.json({ success: true });
        } catch (e) {
            return Response.json({ error: "שגיאה בשמירת הלקוח" }, { status: 500 });
        }
    }

    return new Response("Method not allowed", { status: 405 });
}
