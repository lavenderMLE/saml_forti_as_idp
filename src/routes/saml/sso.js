// This is /routes/sso.js
import axios from 'axios';
import bodyParser from 'body-parser';
import { response } from 'express';
const bodyParser = require('body-parser') ;
const fs = require('fs') ;
const saml = require('samlify');
const express = require('express');
const ServiceProvider = saml.ServiceProvider;
const IdentityProvider = saml.IdentityProvider;
const router = express.Router();

// Configure your endpoint for IdP-initiated / SP-initiated SSO
// const sp = ServiceProvider({    
//     metadata: fs.readFileSync('src/routes/saml/metadata_sp.xml'),    
// });

// const idp = IdentityProvider({
//   metadata: fs.readFileSync('src/routes/saml/onelogin_metadata_487043.xml')
// });

// // Release the metadata publicly
// router.get('/metadata', (req, res) => res.header('Content-Type','text/xml').send(sp.getMetadata()));

// // Access URL for implementing SP-init SSO
// router.get('/spinitsso-redirect', (req, res) => {
//     const { id, context } = sp.createLoginRequest(idp, 'redirect');        
//     return res.redirect(context);
// });

// If your application only supports IdP-initiated SSO, just make this route is enough
// This is the assertion service url where SAML Response is sent to

const uri_forti_metadata = 'http://fac.eavsrl.it/saml-idp/v7e5xv5te453dv0x/metadata/' ;
axios.get( uri_forti_metadata )
  .then( response => {
    const idp = saml.IdentityProvider({
      metadata: response.data,
      isAssertionEncrypted: true,
      messageSigningOrder: 'encrypt-then-sign',
      wantLogoutRequestSigned: true
    }) ;
    // console.log( idp ) ;
    // const sp = saml.ServiceProvider({
    //   entityID: 'http://localhost:3000/sso/metadata',
    // })
  }) ;




  
router.post('/acs', (req, res) => {
    console.log( res ) ;
    
    sp.parseLoginResponse(idp, 'post', req)
    .then(parseResult => {        
        console.log( parseResult ,'parseresult') ;
    })
  .catch(e => {
    console.error('[FATAL] when parsing login response sent from okta: ', e) ;
    
  })
});

export default router ;