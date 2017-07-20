/* eslint-disable no-console */

import smtp from 'smtp-server';

export default function () {
    const SMTPServer = smtp.SMTPServer;
    const server = new SMTPServer({
        disabledCommands: ['STARTTLS'],
        onConnect: (session, callback) => {
            if (!session.remoteAddress.includes('127.0.0.1')) {
                console.log(`Connection from address${session.remoteAddress} was denied`);
                return callback(new Error('Only connections from localhost allowed'));
            }
            return callback(); // Accept the connection
        },
        // Allow everything
        onAuth: (auth, session, callback) => callback(null, { user: 1 }),
        // Handle message stream
        onData: (stream, session, callback) => {
            console.log('Server received email:');
            console.log('=============================================================');
            stream.pipe(process.stdout);
            stream.on('end', () => {
                console.log('\n=============================================================');
                if (stream.sizeExceeded) {
                    const err =
                        new Error('Error: message exceeds fixed maximum message size 10 MB');
                    err.responseCode = 552;
                    return callback(err);
                }
                // accept the message once the stream is ended
                return callback(null, 'Message queued');
            });
        },
    });
    server.on('error', err => {
        console.log('Error!');
        console.log(err);
    });
    return server.listen(8025);
}
