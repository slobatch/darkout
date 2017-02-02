##.nginx

* This directory contains the nginx configuration files that should be placed in the nginx directory (default directory `/etc/nginx/`) in the `sites-available` folder.

* Once the files are placed, create a sym-link to the `projects.conf` file in the `sites-enabled` directory. E.g.:

  * `sudo ln -sfn /etc/nginx/sites-available/projects.conf /etc/nginx/sites-enabled/default`

* Use `projects.conf.mac` to get things running locally.
