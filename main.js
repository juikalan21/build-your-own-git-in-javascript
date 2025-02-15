const fs = require("fs");
const path = require("path");

const GitClient = require('./git/commands/client');

//commands
const CatFileCommand = require('./git/commands/cat-file');
const HashObjectCommand = require('./git/commands/hash-object')

// You can use print statements as follows for debugging, they'll be visible when running tests.


const gitClient = new GitClient();

// Uncomment this block to pass the first stage
 const command = process.argv[2];
//
switch (command) {
  case "init":
    createGitDirectory();
    break;
    case 'cat-file':
        handleCatFileCommand()
        break;
        case 'hash-object':
          handleHashObjectCommand()
          break;
  default:
    throw new Error(`Unknown command ${command}`);
}
//
function createGitDirectory() {
  fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

  fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
  console.log("Initialized git directory");
} 

function handleCatFileCommand(){
    const flag = process.argv[3]; //creating flag (-p) input
    const commitSHA = process.argv[4]; // hash input

    const command = new CatFileCommand(flag, commitSHA); //we will pass parameters
    gitClient.run(command); //we will run command on gitClient and it will run our command by itself

    //console.log({flag, commitSHA});
}

function handleHashObjectCommand(){
  let flag = process.argv[3]; //-w
  let filepath = process.argv[4];

  if (!filepath){
    filepath = flag;
    flag = null;
  }
  //console.log({flag, filepath});

  const command = new HashObjectCommand(flag,filepath);
  gitClient.run(command);
}
