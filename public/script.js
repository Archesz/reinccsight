const { exec } = require('child_process')

function teste(){  
    const command = exec("node -v")

    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    console.log('okkkk')
}

function callTool(path){
    if(process.platform == "linux"){
        console.log("LINUX detected")
        // console.log("python app.py -f /home/jovi/Data/subject_01")
        command = exec(`cd .. && cd inCCsight && python app.py -f ${path} --port 5858`)
        console.log(path)
    }
}