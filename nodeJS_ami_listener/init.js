const AsteriskAmi = require('asterisk-ami')
const config = require('./config')

// Initiate a connection with Asterisk
const ami = new AsteriskAmi({
    host: config.asterisk_host,
    username: config.asterisk_user,
    password: config.asterisk_pass,
    reconnect: true,
    reconnect_after: 1000
})

ami.on('ami_data', (data) => {

    const event = data.event

    if(event === 'Cdr') {

        // Check call disposition, so we can extract missed calls
        if(['NO ANSWER', 'NOANSWER', 'CANCEL', 'BUSY', 'CONGESTION', 'FAILED'].includes(data.disposition)) {

            const missedCall = {
                callernumber: data.source,
                raw_data: data
            }

            try {

                // Send missed call to the target, while making sure
                // its an inbound call sent to a user extension
                if(data.destinationcontext === 'ext-local') {
                    //console.log("Missed Call Found")
                    //console.log(missedCall)
                }

            } catch(e) {
                console.log('There was an error sending the missed call to its target', e)
            }
        } else if(data.disposition === 'ANSWERED' && ['ext-queues', 'ext-local', 'from-trunk', 'from-pstn', 'from-internal'].includes(data.destinationcontext)) {
            try {
                // Do nothing if its ext-local being called from the queue
                // So we do not get double logs for same calls being different legs
                if (data.destinationcontext === 'ext-local' && data.channel.includes('from-queue')) {
                    return
                }

                let direction = 'outbound'
                let user_ext = ''
                let other_phone = ''
                let destination = ''

                switch (data.destinationcontext) {
                    case 'ext-local':
                        direction = 'inbound'
                        user_ext = destination = data.destination
                        other_phone = data.source
                        break
                    case 'ext-queues':
                        direction = 'inbound'
                        user_ext = destination = data.destinationchannel.match(new RegExp('/(.*)@'))[1] || ''
                        other_phone = data.source
                        break
                    case 'from-internal':
                        direction = 'outbound'
                        destination = data.destination
                        other_phone = data.destination
                        user_ext = data.channel.match(new RegExp('/(.*)-'))[1] || ''
                        console.log(JSON.stringify(data.channel))
                        break
                }


                //This logging has been disabled for test purposes
                console.log("dumping Data object: ")
                console.log(data)

              //todo: DO STUFF HERE FOR A CALL COMPLETION
            } catch(err){
                error => console.log(`Error in executing ${error}`)}
            }
        } else if (event === 'queueCallerJoin'){
            console.log("Do stuff for new queue caller")
        }
    })


ami.connect(() => {
    console.log(' Got connected with Asterisk Manager')
}, (raw_data) => {})


// Handle process exit
process.once('SIGINT', (code) => {
    ami.disconnect()
    process.exit()
})

// Handle process exit
process.once('SIGTERM', (code) => {
    ami.disconnect()
    process.exit()
})
