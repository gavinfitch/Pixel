# Pixel

## Pixel at a glance

Pixel is a photo-sharing application built on PostgreSQL, Express.js, React, and Redux. Logged in users can upload, view, edit, and delete photos. They can also create, view, edit, and delete albums. Users can add and remove photos from their albums by clicking the plus(+) and minus(-) symbols on the top right corner of their photos, as well as view the photos of other users via the "Your feed" tab. The photostream tab allows users to view only their own photos, and the albums tab allows users to view their own albums. By clicking on the thumbnail of album a user can views the contents of that album, and by clicking on the thumbnail of a photo a user can view a full screen version of the photo, as well as who it was posted by. Pixel was heavily inspired by Flickr and is meant to be seen as a loose clone.
<br>
<br>   

Splash page -

![Splash page](https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Pixel_meta_photo.png)

Sign-up form -

![Sign-up form](https://pixelphotoapp.s3.us-west-2.amazonaws.com/Pixel+README+photos/Signup.jpg)

Home view -

![Home view](https://pixelphotoapp.s3.us-west-2.amazonaws.com/Pixel+README+photos/Home_car.jpg)

Fullscreen photo view -

![Fullscreen photo view](https://pixelphotoapp.s3.us-west-2.amazonaws.com/Pixel+README+photos/Full-screen_photo.jpg)

Photo upload form -

![Photo upload form](https://pixelphotoapp.s3.us-west-2.amazonaws.com/Pixel+README+photos/Upload_form.jpg)

Empty photostream -

![Empty photostream](https://pixelphotoapp.s3.us-west-2.amazonaws.com/Pixel+README+photos/Photostream_empty.jpg)

Album view -

![Album view](https://pixelphotoapp.s3.us-west-2.amazonaws.com/Pixel+README+photos/Album.jpg)

## Application Architecture

Pixel is built with an Express backend, a JavaScript/React frontend, and a PostgreSQL database. Sequelize was used to interface Exoress with the database. AWS is used for all storage of user uploaded files, and the React-AWS-S3 module is used for communication between React and the S3 bucket.
<br>
<br>

## Backend Overview

Pixel uses Sequelize to interface Express with the PostgreSQL database. All user files are uploaded to an S3 bucket, AWS then sends back the location of the files to the backend, where they are stored, along with any other relevant information, in the database. Bcrypt is used for user authentication.
<br>
<br>
Backend technologies include Express.js, Sequelize, PostgreSQL, AWS S3, and Bcrypt.
<br>
<br>

<!-- ## Backend Technologies 
<br>

### Express -
Express was Pixel's choice of server. Its ability to handle complex queries made it perfect for integrating AWS S3, as well as setting up an efficient Redux store.
<br>
<br>

### PostgreSQL -
PostgreSQL was used because it's simple to implement and interact with, yet very powerful.
<br>
<br>

### Sequelize -
SQLAlchemy was the ORM of choice because of its ability to integrate with PostgreSQL.
<br>
<br>

### AWS S3 -
AWS S3 was used for all data storage because it's fast, efficient, relatively easy to use, and well documented. 
<br>
<br> -->

## Frontend Overview

Pixel has a very simple frontend built around React and Redux. The majority of its logic lies in the backend and a well organized and thoughtout Redux store allows for minimal fetch requests to display needed data.
<br>
<br>
Frontend technologies include React, Redux, and React-AWS-S3.
<br>
<br>

<!-- ## Frontend Technologies
<br>

### React -
Pixel is a React app, all display logic is built upon it. It was chosen because of its ease of us, reusable components, and great developer tools.
<br>
<br>

### Redux -
Pixel relies heavily on Redux, utilizing its store for nearly all functionality. 
<br>
<br>

### React-AWS-S3 -
The React-AWS-S3 module was an obvious choice for communication between React and AWS because it allows for immediate upload and retrieval of data to and from an S3 bucket, and it's well documented! 
<br>
<br> -->

## Conclusion and next steps
Moving forward I'd like to build out the application with user profiles and the ability for users to leave comments, like each other's photos, and follow each other.