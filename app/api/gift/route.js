export async function POST(request) {
  try {
    const { bankName, accountNumber, accountName } = await request.json();

    // basic validation
    if (!bankName || !accountNumber) {
      return Response.json(
        { error: "Bank name and account number are required." },
        { status: 400 }
      );
    }

    const trimmedBank = String(bankName).trim().slice(0, 100);
    const trimmedNumber = String(accountNumber).trim().slice(0, 20);
    const trimmedName = accountName
      ? String(accountName).trim().slice(0, 100)
      : "—";

    // account number must be digits only, 10 chars (Nigerian standard)
    if (!/^\d{10}$/.test(trimmedNumber)) {
      return Response.json(
        { error: "Account number must be exactly 10 digits." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return Response.json(
        { error: "Server misconfigured." },
        { status: 500 }
      );
    }

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "🎂 **Birthday gift details received!**",
        embeds: [
          {
            title: "Bank Details",
            color: 0xfbbf24,
            fields: [
              { name: "Account Name", value: trimmedName, inline: false },
              { name: "Bank", value: trimmedBank, inline: true },
              { name: "Account Number", value: trimmedNumber, inline: true },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordRes.ok) {
      return Response.json(
        { error: "Failed to forward to Discord." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}