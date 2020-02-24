# MOL Job Search Notification

I wanted to automate my job searching, so that I get new job listings delivered to my email inbox. The mol.fi site calls search results independently of the main page content, so regular scrapers don't do the job. A nice Node app called Puppeteer manages to work its way around this by utilizing a headless chrome build and pulling data from that. On top of this, I used Netlify's lambda functions to create a server-less API for my PHP hosting to query. 
