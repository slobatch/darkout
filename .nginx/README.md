##.nginx

This directory contains the nginx configuration files that should be placed in the nginx directory (default directory `/etc/nginx/`) in the `sites-available` folder.

Once the files are placed, create a sym-link to the `projects.conf` file in the `sites-enabled` directory. E.g.:

`sudo ln -sfn /etc/nginx/sites-available/projects.conf /etc/nginx/sites-enabled/default`


**Note:** projects.conf assumes your project files are going to be located in `/home/slobatch/www/darkout`.
Update line 36 if you would like to change the directory from which nginx serves your files.
