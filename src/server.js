import app from './app' ;

// const server = app.listen( process.env.PORT || 5050 , () => {
//     console.log('Server is listening on ', process.env.PORT || 5050) ;
// });


const server = app.listen( 3000 , () => {
    console.log('Server is listening on ', 3000) ;
});