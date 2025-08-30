// app/actions/renderEmailTemplate.js
export async function renderEmailTemplate(posts) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; }
        .post { margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .post-title { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .post-excerpt { color: #666; margin-bottom: 0.5rem; }
        .read-more { color: #007bff; text-decoration: none; }
      </style>
    </head>
    <body>
      <div style="max-width: 600px; margin: 0 auto;">
        <h1>📰 Your Daily SpeedyNews Digest</h1>
        <p>Here's what you missed yesterday:</p>
        
        ${posts.map(post => `
          <div class="post">
            <h2 class="post-title">${post.title}</h2>
            ${post.subtitle ? `<h3>${post.subtitle}</h3>` : ''}
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="${process.env.NEXTAUTH_URL}/posts/${post.slug}" class="read-more">
              Read full article →
            </a>
          </div>
        `).join('')}

        <footer style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; color: #999;">
          <p>You're receiving this because you subscribed to SpeedyNews updates.</p>
          <p><a href="${process.env.NEXTAUTH_URL}/unsubscribe">Unsubscribe</a></p>
        </footer>
      </div>
    </body>
    </html>
  `;
}