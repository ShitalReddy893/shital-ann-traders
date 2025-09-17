server {
  listen 80;

  root /usr/share/nginx/html;
  index index.html;

  # Redirect everything to index.html for Angular SPA
  location / {
    try_files $uri /index.html;
  }

  # Optional: serve Angular app under /ecommerce path
  location /ecommerce {
    try_files $uri /index.html;
  }

  # Optional: catch-all for any nested routes
  location / {
    try_files $uri $uri/ /index.html;
  }
}
