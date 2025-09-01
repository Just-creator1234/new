// scripts/publish-scheduled.js
require('dotenv').config({ path: '.env.local' });
const { publishScheduledPosts } = require('../app/actions/publishScheduledPosts');

async function main() {
  try {
    console.log('🚀 Starting scheduled posts check...');
    const result = await publishScheduledPosts();
    console.log('✅ Completed:', result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();