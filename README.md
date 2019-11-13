# Zesty.io Meetup Demo

Slides for presentation are [here](https://drive.google.com/file/d/1W2GLPUQV8vcIzTJcQVNarJfnbMhJvBxE/view?usp=sharing) 

This is a repository for a node.js application to run a background task to write to a Zesty instance.

To run this sample you will need to
1. Create a new Zesty Instance
2. Create a headless data model
3. Get a dev token

You will also need to populate the following variables in your `.env` file:

```
DEV_TOKEN=INSERT_DEV_TOKEN_HERE
INSTANCE_ZUID=INSERT_INSTANCE_ZUID_HERE
MODEL_ZUID=INSERT_CONTENT_MODEL_ZUID_HERE
```

Before running the project, run this command `npm install`

To run the project, run this command `npm start`

This project can also be run using `pm2`
