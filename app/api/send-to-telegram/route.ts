import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));

    const { templateData, userData } = body;

    if (!userData || !userData.name || !userData.email || !userData.phone) {
      console.error('Missing user data');
      return NextResponse.json(
        { error: 'User data is required' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('Bot Token exists:', !!botToken);
    console.log('Chat ID exists:', !!chatId);

    if (!botToken || !chatId) {
      console.error('Missing Telegram configuration');
      return NextResponse.json(
        { error: 'Telegram configuration missing' },
        { status: 500 }
      );
    }

    // Format template data in a readable way
    const formatTemplateData = (data: any) => {
      if (!data) return 'No template data provided';

      const parts = [];

      if (data.templateId) parts.push(`Template ID: ${data.templateId}`);
      if (data.templateName) parts.push(`Template: ${data.templateName}`);
      if (data.language) parts.push(`Language: ${data.language}`);
      if (data.timestamp) parts.push(`Created: ${new Date(data.timestamp).toLocaleString()}`);

      // Count nodes if available
      if (data.nodes) {
        const nodeCount = Object.keys(data.nodes).length;
        parts.push(`Components: ${nodeCount}`);
      }

      return parts.join('\n');
    };

    // Format message with user details and template summary (not full JSON)
    const message = `
🎨 New Template Submission

👤 User Details:
━━━━━━━━━━━━━━━
Name: ${userData.name}
Email: ${userData.email}
Phone: ${userData.phone}

📋 Template Info:
━━━━━━━━━━━━━━━
${formatTemplateData(templateData)}
    `.trim();

    console.log('Sending message to Telegram:', message);

    // Send message to Telegram (without parse_mode to avoid HTML issues)
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const telegramResult = await telegramResponse.json();
    console.log('Telegram response:', telegramResult);

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramResult);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram', details: telegramResult },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
