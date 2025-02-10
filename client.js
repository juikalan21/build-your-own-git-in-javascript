class GitClient { //superclass
    run(command){ //run function - it will take one command as a input and execute it
        command.execute(); //will call execute function on command

    } 
}

module.exports = GitClient;