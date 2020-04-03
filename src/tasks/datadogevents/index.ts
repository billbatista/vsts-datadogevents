import tl = require('azure-pipelines-task-lib/task');
const axios = require('axios').default;

const DDURL = "https://api.datadoghq.com/api/v1/events?api_key="
const APIKEY: string = tl.getInput('ddApiKey'); 
const EVENTTITLE: string = tl.getInput('ddEventTitle');
const EVENTTEXT: string = tl.getInput('ddEventText');
const EVENTPRIORITY: string = tl.getInput('ddEventPriority');
const EVENTTAGS: string = tl.getInput('ddEventTags');
const EVENTALERTTYPE: string = tl.getInput('ddEventAlertType');

async function run() {
    axios({
        method: 'post',
        url: DDURL?.concat(APIKEY.toString()),
        data: {
            title: EVENTTITLE,
            text: EVENTTEXT,
            priority: EVENTPRIORITY,
            tags: EVENTTAGS,
            alert_type: EVENTALERTTYPE
        }
    })
    .then(function(response: any) {

        console.log(response.data);
        tl.setResult(tl.TaskResult.Succeeded,"", true);
    
    })
    .catch(function(error: any) {

        console.log(error.response.data);
        tl.setResult(tl.TaskResult.Failed,"",true);

    });
}

run();