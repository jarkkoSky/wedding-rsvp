## Wedding RSVP

RSVP site I made for my wedding. If you wish to use this for your own wedding just fork this repo and edit all the texts.
I also recommend adding some kind of background image to make it a bit more "classy". We purchased some clipart from etsy (https://www.etsy.com/fi-en/listing/763129741/watercolor-eucalyptus-clipart-baby-blue)

This site has 2 parts:

- Default area for your guests where they enter if they are coming or not + dietary restrictions
- Admin area which can be reached by going /admin and entering the admin password. There you can see a list of all your guests that have responded.

### Tech

- HTMX + pug on views
- Express backend
- Postgres DB

### Setup

Check .env.default for all the info you need to setup and add your own .env file with correct configs

### Running

- In my use I ran this with PM2 on a cheap VPS, just install Postgres, nginx, PM2 and you are pretty much ready to go.
- If you want to run locally you can run `npm run dev`
