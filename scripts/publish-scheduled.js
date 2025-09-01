// scripts/publish-scheduled.js
import { publishScheduledPosts } from './app/actions/publishScheduledPosts.js';

async function main() {
  try {
    console.log('🚀 Starting scheduled posts check...');
    console.log('Current time:', new Date().toISOString());
    
    const result = await publishScheduledPosts();
    
    console.log('✅ Completed scheduled posts check');
    console.log('Results:', JSON.stringify(result, null, 2));
    
    if (result.published.length > 0) {
      console.log(`📢 Published ${result.published.length} posts:`, result.published);
    } else {
      console.log('⏭️  No posts to publish');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in scheduled posts check:', error);
    process.exit(1);
  }
}

// Handle ES modules
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}