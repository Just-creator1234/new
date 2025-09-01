// app/api/cron/publish-scheduled/route.js

import { publishScheduledPosts } from '@/app/actions/publishScheduledPosts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await publishScheduledPosts();
    
    return NextResponse.json({
      success: true,
      message: `Processed ${result.processed} posts`,
      details: result
    });
    
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}