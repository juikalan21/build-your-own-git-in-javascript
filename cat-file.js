const path = require('path');
const fs = require('fs'); //to check if our folder exists or not
const zlib = require('zlib');

class CatFileCommand{
    constructor(flag, commitSHA) { //making constructor and giving parameter
        this.flag = flag
        this.commitSHA = commitSHA
    }
    execute(){ //why we are making execute function? -> because our client calls execute function and logic to handle the cat file command

        //steps
        //1. navigate to .git/objects/commitSHA[0..2]
        //2. read the file inside the directory git/objects/commitSHA[0..2]/commitSHA[2..end]
        //3. de-compress
        //4. output

        const flag = this.flag
        const commitSHA = this.commitSHA;

        switch(flag) {
            case '-p': {
                const folder = commitSHA.slice(0,2);
                const file = commitSHA.slice(2); //from 2 till end

                const completePath = path.join(process.cwd(), ".git", "objects", folder, file); //go inside from current working directory -> git -> objects -> the folder we made -> the file inside folder

                if(!fs.existsSync(completePath)) //checking if the complete path do not exist
                throw new Error(`Not a valid object name ${commitSHA}`);

                //now when the file exists
                const fileContents = fs.readFileSync(completePath) //read the complete path

                //decompress we will get it as a buffer
                const outputBuffer = zlib.inflateSync(fileContents) //inflate decompress a chunk of data

                //convert output in string
                const output = outputBuffer.toString().split("\x00")[1]; //removing the new line

                process.stdout.write(output) //because we want to give result in standard output

            }
            break;
        }
    }
}

module.exports = CatFileCommand;