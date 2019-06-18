//Toni fiz uma analise no código usando comparadores e testes, coloquei para que função já receba o e-mail via url segue: 

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer'); // chamado do nodemailer
const cors = require('cors')({origin: true});
admin.initializeApp(); // coloquei para iniciar o app como administrador

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muralnewsapp@gmail.com',
        pass: '__SUA_SENHA__'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // obtendo email de destino(dest) ex: https://SeuUrl.firebase.com/sendMail?dest=tonipascoals@gmail.com
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Your Account Name <muralnewsapp@gmail.com>',
            to: dest, // ira enviar para email de destino(dest) ex: https://SeuUrl.firebase.com/sendMail?dest=tonipascoals@gmail.com
            subject: 'Permissão para Avisos Privados no MuralNews',
            html: '<p style="font-size: 16px;">Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter!!</p>' // Toni a mensagem é em HTML agora para melhor personalizar!
        };
  
        // Retornando o resultado, caso erro ou envio.
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send('Ocorreu um erro ao enviar o email: ', erro.toString());
            }
            return res.send('Email enviado com sucesso');
        });
    });    
});