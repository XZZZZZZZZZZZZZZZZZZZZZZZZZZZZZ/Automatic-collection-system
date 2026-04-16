export async function onRequestPost(context) {
    const { request, env } = context;
    const { email, password } = await request.json();

    // בדיקה מול מסד הנתונים
    const user = await env.DB.prepare(
        "SELECT id, business_name FROM users WHERE email = ? AND password_hash = ?"
    ).bind(email, password).first();

    if (user) {
        return new Response(JSON.stringify({ success: true, user }), {
            headers: { "Content-Type": "application/json" }
        });
    } else {
        return new Response(JSON.stringify({ success: false, message: "פרטי התחברות שגויים" }), {
            status: 401, headers: { "Content-Type": "application/json" }
        });
    }
}
