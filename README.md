#Understanding the .git repo

$ tree .git

.git
├── config
├── HEAD
├── hooks
│   └── prepare-commit-msg.msample
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags

1. config is a text file that contains your git configuration for the current repo. If you look into it, you would see some basic settings for you repo like the author, filemode etc.
   
2. HEAD contains the current head of the repo. Depending on what you have set your "default" branch to be, it will be refs/heads/master or refs/heads/main or whatever else you had set to. As you might have guessed, this is pointing to refs/heads folder that you can see below, and into a file called master which does not exist as of now. This file master will only show up after you make your first commit.

3. hooks contain any scripts that can be run before/after git does anything. I have written another blog here which goes a bit more into how git hooks work.

4. objects contains the git objects, ie the data about the files, commits etc in your repo. We will go in depth into this in this blog.

5. refs as we previously mentioned, stores references(pointers). refs/heads contains pointers to branches and refs/tags contains pointers to tags

#cat-file
Overview:
1. navigate to .git/objects/commitSHA[0..2]
2. read the file inside the directory git/objects/commitSHA[0..2]/commitSHA[2..end]
3. de-compress
4. output
   

